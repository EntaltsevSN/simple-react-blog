import React, { useEffect, useState } from 'react'
import FormInput from '../../../includes/Form/FormInput'
import FormSelect from '../../../includes/Form/FormSelect'
import FormText from '../../../includes/Form/FormText'
import FormEditor from '../../../includes/Form/FormEditor'
import FormPrice from '../../../includes/Form/FormPrice'
import FormImage from '../../../includes/Form/FormImage'
import Button from '../../../includes/Button'
import { Redirect, useLocation } from 'react-router'
import { getNewGoal, getNewLink } from '../../../config/getters'
import { VscEdit, VscTrash } from 'react-icons/vsc'
import { formatSum, setClasses } from '../../../config/functions'
import { settings } from '../../../config/settings'

function WizardGoals({ project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges }) {
  let path = useLocation().pathname.split('/')
  path.pop()
  
  const URL = path.join('/')
  
  const [starterList, setStarterList] = useState(data.goals)
  const [goals, setGoals] = useState(data.goals)
  const [showInnerForm, setShowInnerForm] = useState(false)
  const [isConfirmComeBack, setIsConfirmComeBack] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isConfirmRemove, setIsConfirmRemove] = useState(false)
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [goal, setGoal] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    setData({
      ...data,
      goals
    })
  }, [goals])

  const comeBack = () => {
    setData(project)
    setIsSavedChanges(true)
  }

  const handleAddElement = () => {
    setGoals(prev => [...prev, getNewGoal(goals, title, image, goal, description)])
    setShowInnerForm(false)
    setTitle('')
    setGoal('')
    setImage(null)
    setDescription('')
  }

  const confirmComeBack = () => {
    setIsConfirmComeBack(true)
  }

  const editElement = id => {
    setIsEditable(true)
    setTitle(goals.filter(item => item.id === id)[0].title)
    setGoal(goals.filter(item => item.id === id)[0].funding_goal)
    setImage(goals.filter(item => item.id === id)[0].image)
    setDescription(goals.filter(item => item.id === id)[0].description)
    setId(id)
    setShowInnerForm(true)
  }

  const updateElement = id => {
    setGoals(prev => [...prev.map(item => item.id === id ? {...item, title, image, goal, description} : item)])
    setId(null)
    setTitle('')
    setGoal('')
    setImage(null)
    setDescription('')
    setShowInnerForm(false)
  }

  const removeElement = id => {
    setIsConfirmRemove(true)
    setId(id)
  }

  const confirmRemoveElement = id => {
    setGoals(prev => [...prev.filter(item => item.id !== id)])
    setIsConfirmRemove(false)
  }

  return (
    <section className="wizard__form">
      <header className="wizard__header">
        <h3 className="wizard__title">{ getCards(data).filter(({ slug }) => slug === 'goals')[0].title }</h3>
        { !showInnerForm && <Button onClick={() => setShowInnerForm(true)}>Добавить</Button> }  
      </header>
      { showInnerForm 
        ? <section className="wizard__inner">
          <img src={ imageFile !== null ? URL.createObjectURL(imageFile) : image !== null ? image : settings.project.defaultImage } alt="" className="wizard__image" />
          <FormImage value={image} setValue={setImage} file={imageFile} setFile={setImageFile} isCircle={false} directUpload={true} groupClass="margin-top" id="goal.image" />          
          <FormInput value={title} setValue={setTitle} placeholder='Название' id="goal.title" />
          { !['FND', 'CHN'].includes(project.status) && <>
            <FormPrice value={goal} setValue={setGoal} placeholder='Цель' id="goal.goal" />
            { (Number(project['funding_goal']) > Number(goal) || Number(project['funding_goal']) === Number(goal)) && 
              <p className="wizard__alert">Сверхцель не может быть меньше или равной цели проекта</p>
            }
          </>}
          <FormEditor value={description} setValue={setDescription} placeholder='Подробное описание' id="goal.content" />
          <Button onClick={() => 
            { isEditable ? updateElement(id) : handleAddElement() }
          }>
            { isEditable ? 'Изменить' : 'Добавить' }
          </Button>
        </section> 
        : <>
          { goals.length 
            ? goals.map(item => <article className="wizard__article">
              <header className="wizard__header">
                <h4 className="wizard__title">{ item.title }</h4>
                <div className="wizard__buttons">
                  <Button className="button--link" onClick={() => editElement(item.id)}>
                    <VscEdit className={setClasses("wizard__icon", 'small')} />
                  </Button>
                  { !['FND', 'CHN'].includes(project.status) && <>
                    <Button className="button--link" onClick={() => removeElement(item.id)}>
                      <VscTrash className={setClasses("wizard__icon", 'small')} />
                    </Button>
                  </>}
                </div>
              </header>
              <div className="wizard__flex">
                <img src={item.image !== null ? item.image : settings.project.defaultImage} alt="" className={setClasses("wizard__image", 'part')} />
                <div className="wizard__parts">
                  <p className="wizard__text"><strong>Цель:</strong> { formatSum(item.funding_goal) }</p>
                  <div className="wizard__html" dangerouslySetInnerHTML={{__html:item.description.substring(0, 180).replace(/<img[^>]*>/g,"") + '...' }} />                  
                  <p className={setClasses("wizard__quote", 'inline')}>Полное описание доступно при редактировании сверхцели</p>
                </div>
              </div>
            </article>) 
            : <p className="wizard__text">Сверхцелей пока нет</p>
          }
          { starterList !== goals && 
            <p className="wizard__quote">Сохраните внесенные изменения</p>
          }
          <div className="wizard__controls">
            <Button onClick={() => handleSaveChanges('goals')}>Сохранить</Button>
            <Button onClick={() => 
              starterList !== goals ? confirmComeBack() : comeBack()
            } className="button--bordered button--margin-left">Вернуться</Button>
          </div>
        </> 
      }
      {isSavedChanges && <Redirect to={URL} />}
      { isConfirmComeBack && <>
        <section className="modal">
          <div className="modal__body">
            <p className="modal__question">
              Вы не сохранили изменения. Действительно хотите вернуться?
            </p>
            <Button onClick={() => comeBack()}>Да</Button>
            <Button className="button--bordered button--margin-left" onClick={() => setIsConfirmComeBack(false)}>Нет</Button>
          </div>
        </section>
        <div className="overlay"></div>
      </> }
      { isConfirmRemove && <>
        <section className="modal">
          <div className="modal__body">
            <p className="modal__question">
              Вы действительно хотите удалить этот элемент?
            </p>
            <Button onClick={() => confirmRemoveElement(id)}>Да</Button>
            <Button className="button--bordered button--margin-left" onClick={() => setIsConfirmRemove(false)}>Нет</Button>
          </div>
        </section>
        <div className="overlay"></div>
      </> }
    </section>
  )
}

export default WizardGoals