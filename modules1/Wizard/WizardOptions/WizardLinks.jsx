import React, { useEffect, useState } from 'react'
import FormInput from '../../../includes/Form/FormInput'
import FormSelect from '../../../includes/Form/FormSelect'
import FormText from '../../../includes/Form/FormText'
import FormEditor from '../../../includes/Form/FormEditor'
import FormPrice from '../../../includes/Form/FormPrice'
import FormDate from '../../../includes/Form/FormDate'
import Button from '../../../includes/Button'
import { Redirect, useLocation } from 'react-router'
import { getNewLink } from '../../../config/getters'
import { VscEdit, VscTrash } from 'react-icons/vsc'
import { setClasses } from '../../../config/functions'

function WizardLinks({ project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges }) {
  let path = useLocation().pathname.split('/')
  path.pop()  
  
  const URL = path.join('/')
  
  const [starterList, setStarterList] = useState(data.links)
  const [links, setLinks] = useState(data.links)
  const [showInnerForm, setShowInnerForm] = useState(false)
  const [isConfirmComeBack, setIsConfirmComeBack] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isConfirmRemove, setIsConfirmRemove] = useState(false)
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setData({
      ...data,
      links
    })
  }, [links])

  const comeBack = () => {
    setData(project)
    setIsSavedChanges(true)
  }

  const handleAddElement = () => {
    setLinks(prev => [...prev, getNewLink(links, title, url)])
    setShowInnerForm(false)
    setTitle('')
    setUrl('')
  }

  const confirmComeBack = () => {
    setIsConfirmComeBack(true)
  }

  const editElement = id => {
    setIsEditable(true)
    setTitle(links.filter(item => item.id === id)[0].title)
    setUrl(links.filter(item => item.id === id)[0].url)
    setId(id)
    setShowInnerForm(true)
  }

  const updateElement = id => {
    setLinks(prev => [...prev.map(item => item.id === id ? {...item, title, url} : item)])
    setId(null)
    setTitle('')
    setUrl('')
    setShowInnerForm(false)
  }

  const removeElement = id => {
    setIsConfirmRemove(true)
    setId(id)
  }

  const confirmRemoveElement = id => {
    setLinks(prev => [...prev.filter(item => item.id !== id)])
    setIsConfirmRemove(false)
  }

  return (
    <section className="wizard__form">
      <header className="wizard__header">
        <h3 className="wizard__title">{ getCards(data).filter(({ slug }) => slug === 'links')[0].title }</h3>
        { !showInnerForm && <Button onClick={() => setShowInnerForm(true)}>Добавить</Button> }  
      </header>
      { showInnerForm 
        ? <section className="wizard__inner">
          <FormInput value={title} setValue={setTitle} placeholder='Текст ссылки' id="link.title" />
          <FormInput value={url} setValue={setUrl} placeholder='Адрес ссылки' id="link.link" />
          <Button onClick={() => 
            { isEditable ? updateElement(id) : handleAddElement() }
          }>
            { isEditable ? 'Изменить' : 'Добавить' }
          </Button>
        </section> 
        : <>
          { links.length 
            ? links.map(item => <article key={item.id} className="wizard__article">
              <header className="wizard__header">
                <h4 className="wizard__title">{ item.title }</h4>
                <div className="wizard__buttons">
                  <Button className="button--link" onClick={() => editElement(item.id)}>
                    <VscEdit className={setClasses("wizard__icon", 'small')} />
                  </Button>
                  <Button className="button--link" onClick={() => removeElement(item.id)}>
                    <VscTrash className={setClasses("wizard__icon", 'small')} />
                  </Button>
                </div>
              </header>
              <p className="wizard__text">
                <a href={ item.url } className="wizard__link" target="_blank">{ item.url }</a>
              </p>
            </article>) 
            : <p className="wizard__text">Ссылок пока нет</p>
          }
          { starterList !== links && 
            <p className="wizard__quote">Сохраните внесенные изменения</p>
          }
          <div className="wizard__controls">
            <Button onClick={() => handleSaveChanges('links')}>Сохранить</Button>
            <Button onClick={() => 
              starterList !== links ? confirmComeBack() : comeBack()
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

export default WizardLinks