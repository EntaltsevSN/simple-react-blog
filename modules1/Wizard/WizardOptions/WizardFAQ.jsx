import React, { useEffect, useState } from 'react'
import FormInput from '../../../includes/Form/FormInput'
import FormText from '../../../includes/Form/FormText'
import Button from '../../../includes/Button'
import { Redirect, useLocation } from 'react-router'
import { getNewFAQ } from '../../../config/getters'
import { VscEdit, VscTrash } from 'react-icons/vsc'
import { setClasses } from '../../../config/functions'

function WizardFAQ({ project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges }) {
  let path = useLocation().pathname.split('/')
  path.pop()
  const url = path.join('/')
  
  const [starterList, setStarterList] = useState(data.faq)
  const [faq, setFaq] = useState(data.faq)
  const [showInnerForm, setShowInnerForm] = useState(false)
  const [isConfirmComeBack, setIsConfirmComeBack] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isConfirmRemove, setIsConfirmRemove] = useState(false)
  const [id, setId] = useState(null)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    setData({
      ...data,
      faq
    })
  }, [faq])

  const comeBack = () => {
    setData(project)
    setIsSavedChanges(true)
  }

  const handleAddElement = () => {
    setFaq(prev => [...prev, getNewFAQ(faq, question, answer)])
    setShowInnerForm(false)
    setQuestion('')
    setAnswer('')
  }

  const confirmComeBack = () => {
    setIsConfirmComeBack(true)
  }

  const editElement = id => {
    setIsEditable(true)
    setQuestion(faq.filter(item => item.id === id)[0].question)
    setAnswer(faq.filter(item => item.id === id)[0].answer)
    setId(id)
    setShowInnerForm(true)
  }

  const updateElement = id => {
    setFaq(prev => [...prev.map(item => item.id === id ? {...item, question, answer} : item)])
    setId(null)
    setQuestion('')
    setAnswer('')
    setShowInnerForm(false)
  }

  const removeElement = id => {
    setIsConfirmRemove(true)
    setId(id)
  }

  const confirmRemoveElement = id => {
    setFaq(prev => [...prev.filter(item => item.id !== id)])
    setIsConfirmRemove(false)
  }

  return (
    <section className="wizard__form">
      <header className="wizard__header">
        <h3 className="wizard__title">{ getCards(data).filter(({ slug }) => slug === 'faq')[0].title }</h3>
        { !showInnerForm && <Button onClick={() => setShowInnerForm(true)}>Добавить</Button> }  
      </header>
      { showInnerForm 
        ? <section className="wizard__inner">
          <FormInput value={question} setValue={setQuestion} placeholder='Текст вопроса' id="faq.question" />
          <FormText value={answer} setValue={setAnswer} placeholder='Ответ на вопрос' id="faq.answer" />
          <Button onClick={() => 
            { isEditable ? updateElement(id) : handleAddElement() }
          }>
            { isEditable ? 'Изменить' : 'Добавить' }
          </Button>
        </section> 
        : <>
          { faq.length 
            ? faq.map(item => <article className="wizard__article">
              <header className="wizard__header">
                <h4 className="wizard__title">{ item.question }</h4>
                <div className="wizard__buttons">
                  <Button className="button--link" onClick={() => editElement(item.id)}>
                    <VscEdit className={setClasses("wizard__icon", 'small')} />
                  </Button>
                  <Button className="button--link" onClick={() => removeElement(item.id)}>
                    <VscTrash className={setClasses("wizard__icon", 'small')} />
                  </Button>
                </div>
              </header>
              <p className="wizard__text">{ item.answer }</p>
            </article>) 
            : <p className="wizard__text">Вопросов и ответов пока нет</p>
          }
          { starterList !== faq && 
            <p className="wizard__quote">Сохраните внесенные изменения</p>
          }
          <div className="wizard__controls">
            <Button onClick={() => handleSaveChanges('faq')}>Сохранить</Button>
            <Button onClick={() => 
              starterList !== faq ? confirmComeBack() : comeBack()
            } className="button--bordered button--margin-left">Вернуться</Button>
          </div>
        </> 
      }
      {isSavedChanges && <Redirect to={url} />}
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

export default WizardFAQ