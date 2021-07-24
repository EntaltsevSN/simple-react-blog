import React, { useEffect, useState } from 'react'
import FormInput from '../../../includes/Form/FormInput'
import FormSelect from '../../../includes/Form/FormSelect'
import FormText from '../../../includes/Form/FormText'
import FormEditor from '../../../includes/Form/FormEditor'
import FormPrice from '../../../includes/Form/FormPrice'
import FormImage from '../../../includes/Form/FormImage'
import Button from '../../../includes/Button'
import { Redirect, useLocation } from 'react-router'
import { getNewReward, getNewLink } from '../../../config/getters'
import { VscEdit, VscTrash } from 'react-icons/vsc'
import { formatSum, setClasses } from '../../../config/functions'
import { settings } from '../../../config/settings'
import FormCheckbox from '../../../includes/Form/FormCheckbox'
import FormNumber from '../../../includes/Form/FormNumber'
import WizardRewardStage from '../WizardRewardStage'

function WizardRewards({ project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges }) {
  let path = useLocation().pathname.split('/')
  path.pop()  
  
  const URL = path.join('/')

  const [starterList, setStarterList] = useState(data.rewards)
  const [rewards, setRewards] = useState(data.rewards)
  const [showInnerForm, setShowInnerForm] = useState(false)
  const [isConfirmComeBack, setIsConfirmComeBack] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isConfirmRemove, setIsConfirmRemove] = useState(false)
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [addon, setAddon] = useState(false)
  const [backerLimit, setBackerLimit] = useState(0)
  const [secondChance, setSecondChance] = useState(false)
  const [limit, setLimit] = useState(0)
  const [digital, setDigital] = useState(false)
  const [order, setOrder] = useState(0)
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    setData({
      ...data,
      rewards
    })
  }, [rewards])

  const comeBack = () => {
    setData(project)
    setIsSavedChanges(true)
  }

  const handleAddElement = () => {
    setRewards(prev => [...prev, getNewReward(rewards, title, image, price, description, content, addon, backerLimit, secondChance, limit, digital, order)])
    setShowInnerForm(false)
    setTitle('')
    setPrice(0)
    setImage(null)
    setDescription('')
    setContent('')
    setAddon(false)
    setBackerLimit(0)
    setSecondChance(false)
    setLimit(0)
    setDigital(false)
    setOrder(0)
  }

  const confirmComeBack = () => {
    setIsConfirmComeBack(true)
  }

  const editElement = id => {
    setIsEditable(true)
    setTitle(rewards.filter(item => item.id === id)[0].title)
    setPrice(rewards.filter(item => item.id === id)[0].price)
    setImage(rewards.filter(item => item.id === id)[0].image)
    setDescription(rewards.filter(item => item.id === id)[0].description)
    setContent(rewards.filter(item => item.id === id)[0].content)
    setAddon(rewards.filter(item => item.id === id)[0].addon)
    setBackerLimit(rewards.filter(item => item.id === id)[0].backer_limit)
    setSecondChance(rewards.filter(item => item.id === id)[0].second_chance)
    setLimit(rewards.filter(item => item.id === id)[0].limit)
    setDigital(rewards.filter(item => item.id === id)[0].digital)
    setOrder(rewards.filter(item => item.id === id)[0].order)
    setId(id)
    setShowInnerForm(true)
  }

  const updateElement = id => {
    setRewards(prev => [...prev.map(item => item.id === id ? {...item, title, image, price, description, content, addon, backerLimit, secondChance, limit, digital, order} : item)])
    setId(null)
    setTitle('')
    setPrice(0)
    setImage(null)
    setDescription('')
    setAddon(false)
    setBackerLimit(0)
    setSecondChance(false)
    setLimit(0)
    setDigital(false)
    setOrder(0)
    setShowInnerForm(false)
  }

  const removeElement = id => {
    setIsConfirmRemove(true)
    setId(id)
  }

  const confirmRemoveElement = id => {
    setRewards(prev => [...prev.filter(item => item.id !== id)])
    setIsConfirmRemove(false)
  }

  const types = [
    { value: false, label: 'Основная' },
    { value: true, label: 'Дополнительная' }
  ]

  const statuses = [
    { value: false, label: 'Физическая' },
    { value: true, label: 'Электронная' }
  ]

  return (
    <section className="wizard__form">
      <header className="wizard__header">
        <h3 className="wizard__title">{ getCards(data).filter(({ slug }) => slug === 'rewards')[0].title }</h3>
        { !showInnerForm && <Button onClick={() => setShowInnerForm(true)}>Добавить</Button> }  
      </header>
      { showInnerForm 
        ? <section className="wizard__inner">
          <img src={ imageFile !== null ? URL.createObjectURL(imageFile) : image !== null ? image : settings.project.defaultImage } alt="" className="wizard__image" />
          <FormImage value={image} setValue={setImage} file={imageFile} setFile={setImageFile} isCircle={false} directUpload={true} groupClass="margin-top" id="reward.image" />          
          <FormInput value={title} setValue={setTitle} placeholder='Название' id="reward.title" />
          { (!['FND', 'CHN'].includes(project.status)) && <>
            <FormPrice value={price} setValue={setPrice} placeholder='Цена' id="reward.price" />
          </>}
          <FormText value={description} setValue={setDescription} placeholder='Краткое описание' id="reward.description" />
          <FormEditor value={content} setValue={setContent} placeholder='Подробное описание' id="reward.content" />
          <FormSelect options={types} value={addon} setValue={setAddon} id="reward.addon" />
          <FormSelect options={statuses} value={digital} setValue={setDigital} id="reward.status" />
          <FormCheckbox value={secondChance} setValue={setSecondChance} placeholder="Второе дыхание" id="reward.second_chance" />
          <FormNumber value={limit} setValue={setLimit} placeholder="Всего доступно" showPlaceholder={true} id="reward.total" />
          <FormNumber value={backerLimit} setValue={setBackerLimit} placeholder="Кол-во в одни руки" showPlaceholder={true} id="reward.backer_limit" />
          <FormNumber value={order} setValue={setOrder} placeholder='Порядковый номер' showPlaceholder={true} id="reward.order" />
          <Button onClick={() => 
            { isEditable ? updateElement(id) : handleAddElement() }
          }>
            { isEditable ? 'Изменить' : 'Добавить' }
          </Button>
        </section> 
        : <>
          { rewards.length 
            ? rewards.map(item => <article key={item.id} className="wizard__article">
              <header className="wizard__header">
                <h4 className="wizard__title">{ item.title }</h4>
                <div className="wizard__buttons">
                  <Button className="button--link" onClick={() => editElement(item.id)}>
                    <VscEdit className={setClasses("wizard__icon", 'small')} />
                  </Button>
                  { (!['FND', 'CHN'].includes(project.status) && item.backed === 0) && <>
                    <Button className="button--link" onClick={() => removeElement(item.id)}>
                      <VscTrash className={setClasses("wizard__icon", 'small')} />
                    </Button>
                  </>}
                </div>
              </header>
              <div className="wizard__flex">
                <img src={item.image !== null ? item.image : settings.project.defaultImage} alt="" className={setClasses("wizard__image", 'part')} />
                <div className="wizard__parts">
                  <p className="wizard__text"><strong>Цена:</strong> { formatSum(item.price) }</p>
                  <p className="wizard__text"><strong>Кол-во в одни руки:</strong> { item.backer_limit }</p>
                  <p className="wizard__text"><strong>Кол-во на продажу:</strong> { item.limit }</p>
                  { <p className="wizard__text">
                    { types.filter(({ value }) => value === item.addon)[0].label } { statuses.filter(({ value }) => value === item.digital)[0].label.toLowerCase() } награда
                  </p> }
                  <p className="wizard__text">Награда доступна с момента запуска {
                    item.second_chance ? 'второго дыхания' : 'проекта'
                  }</p>
                </div>
              </div>
              <p className="wizard__quote">Краткое и подробное описания доступны для просмотра в режиме редактирования награды</p>
              {/*<WizardRewardStage projectId={project.id} rewardId={item.id} />*/}
              <WizardRewardStage project={data} reward={item} />
            </article>) 
            : <p className="wizard__text">Наград пока нет</p>
          }
          { starterList !== rewards && 
            <p className="wizard__quote">Сохраните внесенные изменения</p>
          }
          <div className="wizard__controls">
            <Button onClick={() => handleSaveChanges('rewards')}>Сохранить</Button>
            <Button onClick={() => 
              starterList !== rewards ? confirmComeBack() : comeBack()
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

export default WizardRewards