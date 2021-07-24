import React, { useEffect, useState } from 'react'
import FormInput from '../../../includes/Form/FormInput'
import FormSelect from '../../../includes/Form/FormSelect'
import FormText from '../../../includes/Form/FormText'
import FormEditor from '../../../includes/Form/FormEditor'
import FormPrice from '../../../includes/Form/FormPrice'
import FormImage from '../../../includes/Form/FormImage'
import Button from '../../../includes/Button'
import { Redirect, useLocation } from 'react-router'
import { getNewNewsPost } from '../../../config/getters'
import { VscEdit, VscTrash } from 'react-icons/vsc'
import { formatSum, setClasses } from '../../../config/functions'
import { settings } from '../../../config/settings'
import FormCheckbox from '../../../includes/Form/FormCheckbox'

function WizardNews({ project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges }) {
  let path = useLocation().pathname.split('/')
  path.pop()  
  
  const URL = path.join('/')
  
  const [starterList, setStarterList] = useState(data.news)
  const [news, setNews] = useState(data.news)
  const [showInnerForm, setShowInnerForm] = useState(false)
  const [isConfirmComeBack, setIsConfirmComeBack] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isConfirmRemove, setIsConfirmRemove] = useState(false)
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [membersOnly, setMembersOnly] = useState(false)
  const [hotNews, setHotNews] = useState(false)
  const [published, setPublished] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    setData({
      ...data,
      news
    })
  }, [news])

  const comeBack = () => {
    setData(project)
    setIsSavedChanges(true)
  }

  const handleAddElement = () => {
    setNews(prev => [...prev, getNewNewsPost(news, title, image, description, content, membersOnly, hotNews, published)])
    setShowInnerForm(false)
    setTitle('')
    setImage(null)
    setDescription('')
    setContent('')
    setHotNews(false)
    setMembersOnly(false)
    setPublished(false)
  }

  const confirmComeBack = () => {
    setIsConfirmComeBack(true)
  }

  const editElement = id => {
    setIsEditable(true)
    setTitle(news.filter(item => item.id === id)[0].title)
    setImage(news.filter(item => item.id === id)[0].image)
    setDescription(news.filter(item => item.id === id)[0].description)
    setContent(news.filter(item => item.id === id)[0].content)
    setHotNews(news.filter(item => item.id === id)[0].hotNews)
    setMembersOnly(news.filter(item => item.id === id)[0].membersOnly)
    setPublished(news.filter(item => item.id === id)[0].published)
    setId(id)
    setShowInnerForm(true)
  }

  const updateElement = id => {
    setNews(prev => [...prev.map(item => item.id === id ? {...item, title, image, description, content, membersOnly, hotNews, published,} : item)])
    setId(null)
    setTitle('')
    setImage(null)
    setDescription('')
    setContent('')
    setHotNews(false)
    setMembersOnly(false)
    setPublished(false)
    setShowInnerForm(false)
  }

  const removeElement = id => {
    setIsConfirmRemove(true)
    setId(id)
  }

  const confirmRemoveElement = id => {
    setNews(prev => [...prev.filter(item => item.id !== id)])
    setIsConfirmRemove(false)
  }

  return (
    <section className="wizard__form">
      <header className="wizard__header">
        <h3 className="wizard__title">{ getCards(data).filter(({ slug }) => slug === 'news')[0].title }</h3>
        { !showInnerForm && <Button onClick={() => setShowInnerForm(true)}>Добавить</Button> }  
      </header>
      { showInnerForm 
        ? <section className="wizard__inner">
          <img src={ imageFile !== null ? URL.createObjectURL(imageFile) : image !== null ? image : settings.project.defaultImage } alt="" className="wizard__image" />
          <FormImage value={image} setValue={setImage} file={imageFile} setFile={setImageFile} isCircle={false} directUpload={true} groupClass="margin-top" id="news.image" />          
          <FormInput value={title} setValue={setTitle} placeholder='Название' id="news.title" />
          <FormText value={description} setValue={setDescription} placeholder='Краткое описание' id="news.description" />
          <FormEditor value={content} setValue={setContent} placeholder='Подробное описание' id="news.content" />
          <FormCheckbox value={membersOnly} setValue={setMembersOnly} placeholder="Показывать только участникам проекта" id="news.members_only" />
          <FormCheckbox value={hotNews} setValue={setHotNews} placeholder="Показать на главной странице" id="news.hot_news" />
          <FormCheckbox value={published} setValue={setPublished} placeholder="Опубликовать новость" id="news.published" />
          <Button onClick={() => 
            { isEditable ? updateElement(id) : handleAddElement() }
          }>
            { isEditable ? 'Изменить' : 'Добавить' }
          </Button>
        </section> 
        : <>
          { news.length 
            ? news.map(item => <article className="wizard__article">
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
              <div className="wizard__flex">
                <img src={item.image !== null ? item.image : settings.project.defaultImage} alt="" className={setClasses("wizard__image", 'part')} />
                <div className="wizard__parts">
                  <div className="wizard__html" dangerouslySetInnerHTML={{__html:item.description.substring(0, 180).replace(/<img[^>]*>/g,"") + '...' }} />                  
                  <p className={setClasses("wizard__quote", 'inline')}>Полное описание доступно при редактировании сверхцели</p>
                </div>
              </div>
            </article>) 
            : <p className="wizard__text">Новостей пока нет</p>
          }
          { starterList !== news && 
            <p className="wizard__quote">Сохраните внесенные изменения</p>
          }
          <div className="wizard__controls">
            <Button onClick={() => handleSaveChanges('news')}>Сохранить</Button>
            <Button onClick={() => 
              starterList !== news ? confirmComeBack() : comeBack()
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

export default WizardNews