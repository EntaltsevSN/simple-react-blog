import React, { useEffect, useState } from 'react'
import { VscEdit, VscEye, VscTrash } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { setClasses, setURL } from '../../config/functions'
import { settings } from '../../config/settings'
import Button from '../../includes/Button'
import FormCheckbox from '../../includes/Form/FormCheckbox'
import FormEditor from '../../includes/Form/FormEditor'
import FormImage from '../../includes/Form/FormImage'
import FormInput from '../../includes/Form/FormInput'
import FormText from '../../includes/Form/FormText'
import { AddPage, DeletePage, UpdatePage } from '../../redux/Pages/reducer'

function ProfilePager({ project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges }) {
  const dispatch = useDispatch()
  console.log(useSelector(state => state))
  const pages = useSelector(state => state.pages.filter(item => Number(item.id) !== 0))

  let path = useLocation().pathname.split('/')
  path.pop()  
  
  const URL = path.join('/')
  
  const [showInnerForm, setShowInnerForm] = useState(false)
  const [isConfirmComeBack, setIsConfirmComeBack] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isConfirmRemove, setIsConfirmRemove] = useState(false)
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')

  const comeBack = () => {
    setData(project)
    setIsSavedChanges(true)
  }

  const handleAddElement = () => {
    dispatch(AddPage(pages, { title, slug, content }, clearForm))
  }

  const confirmComeBack = () => {
    setIsConfirmComeBack(true)
  }

  const editElement = id => {
    setIsEditable(true)
    setTitle(pages.filter(item => item.id === id)[0].title)
    setSlug(pages.filter(item => item.id === id)[0].slug)
    setContent(pages.filter(item => item.id === id)[0].content)
    setId(id)
    setShowInnerForm(true)
  }

  const updateElement = id => {
    dispatch(UpdatePage({...pages.filter(item => Number(item.id) === Number(id))[0], title, slug, content }, null, clearForm))
    setId(null)
    setTitle('')
    setSlug('')
    setContent('')
    setShowInnerForm(false)
  }

  const removeElement = id => {
    setIsConfirmRemove(true)
    setId(id)
  }

  const confirmRemoveElement = id => {
    dispatch(DeletePage(pages.filter(item => Number(item.id) === Number(id))[0], setIsConfirmRemove))
  }

  const clearForm = () => {
    setShowInnerForm(false)
    setTitle('')
    setSlug('')
    setContent('')
  }

  return (
    <section className="wizard__form">
      <header className="wizard__header">
        <h3 className="wizard__title">Страницы</h3>
        { !showInnerForm && <Button onClick={() => setShowInnerForm(true)}>Добавить</Button> }  
      </header>
      { showInnerForm 
        ? <section className="wizard__inner">
          <form action="" className="form">
          <FormInput value={title} setValue={setTitle} placeholder='Название' id="blog.title" />
          <FormInput value={slug} setValue={setSlug} placeholder='Ярлык (по-английски)' id="blog.title" />
            <FormEditor value={content} setValue={setContent} placeholder='Подробное описание' id="blog.content" hideCollapse />
            <Button onClick={() => 
              { isEditable ? updateElement(id) : handleAddElement() }
            }>
              { isEditable ? 'Изменить' : 'Добавить' }
            </Button>
          </form>
        </section> 
        : <>
          { pages.length 
            ? pages.map(item => <article className="wizard__article">
              <header className="wizard__header">
                <h4 className="wizard__title">{ item.title }</h4>
                <div className="wizard__buttons">
                  <Link to={setURL(item.slug)}>
                    <VscEye className={setClasses("wizard__icon", 'small')} />
                  </Link>
                  <Button className="button--link" onClick={() => editElement(item.id)}>
                    <VscEdit className={setClasses("wizard__icon", 'small')} />
                  </Button>
                  <Button className="button--link" onClick={() => removeElement(item.id)}>
                    <VscTrash className={setClasses("wizard__icon", 'small')} />
                  </Button>
                </div>
              </header>
            </article>) 
            : <p className="wizard__text">Страниц пока нет</p>
          }
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

export default ProfilePager