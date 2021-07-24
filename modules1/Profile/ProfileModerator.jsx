import React, { useEffect, useState } from 'react'
import { CgNpm } from 'react-icons/cg'
import { VscEdit, VscTrash, VscEye } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { setClasses, setURL } from '../../config/functions'
import { settings } from '../../config/settings'
import Button from '../../includes/Button'
import FormCheckbox from '../../includes/Form/FormCheckbox'
import FormEditor from '../../includes/Form/FormEditor'
import FormImage from '../../includes/Form/FormImage'
import FormInput from '../../includes/Form/FormInput'
import FormText from '../../includes/Form/FormText'
import { addBlog } from '../../redux/Blog/actions'
import { AddBlog, DeleteBlog, UpdateBlog } from '../../redux/Blog/reducer'
import ProfileModeratorBlog from './ProfileModeratorBlog'
import ProfileModeratorComments from './ProfileModeratorComments'
/*/
function ProfileModerator(props) {
  var path = setURL('profile', 'moderator')
  path = path.slice(1, path.length) 
  const url = useLocation().pathname

  return (
    <div className="profile__moderator">
      <div className="profile__nav">
        <Link className={["button", 'button--margin-right-big', url.includes('blog') ? 'button--active' : ''].join(' ')} to={setURL(path, 'blog')}>Блог</Link>
        <Link className={["button", 'button--margin-right-big', url.includes('comments') ? 'button--active' : ''].join(' ')} to={setURL(path, 'comments')}>Комментарии</Link>
      </div>
      <Switch>
        <Route exact path={setURL(path)}>
          <Redirect to={setURL(path, 'blog')} />
        </Route>
        <Route path={setURL(path, 'blog')}>
          <ProfileModeratorBlog />
        </Route>
        <Route path={setURL(path, 'comments')}>
          <ProfileModeratorComments />
        </Route>
      </Switch>
    </div>
  )
}

export default ProfileModerator
  */

function ProfileModerator({ project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges }) {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blog.filter(item => Number(item.id) !== 0))
  const threads = useSelector(state => state.commentsThreads)

  console.log('threads', threads)

  let path = useLocation().pathname.split('/')
  path.pop()  

  console.log(path)
  
  const URL = path.join('/')

  console.log(URL)
  
  const [starterList, setStarterList] = useState(blog)
  const [blogList, setBlogList] = useState(blog)
  const [showInnerForm, setShowInnerForm] = useState(false)
  const [isConfirmComeBack, setIsConfirmComeBack] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isConfirmRemove, setIsConfirmRemove] = useState(false)
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [hotBlog, setHotBlog] = useState(false)
  const [published, setPublished] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  const comeBack = () => {
    setData(project)
    setIsSavedChanges(true)
  }

  const handleAddElement = () => {
    dispatch(AddBlog(threads, blog, {
      title, image, description, content, hotBlog, published
    }, clearForm))
    
  }

  const confirmComeBack = () => {
    setIsConfirmComeBack(true)
  }

  const editElement = id => {
    setIsEditable(true)
    setTitle(blog.filter(item => item.id === id)[0].title)
    setImage(blog.filter(item => item.id === id)[0].image)
    setDescription(blog.filter(item => item.id === id)[0].description)
    setContent(blog.filter(item => item.id === id)[0].content)
    setHotBlog(blog.filter(item => item.id === id)[0].hotBlog)
    
    setPublished(blog.filter(item => item.id === id)[0].published)
    setId(id)
    setShowInnerForm(true)
  }

  const updateElement = id => {
    dispatch(UpdateBlog({...blog.filter(item => Number(item.id) === Number(id))[0], title, image, description, content, hotBlog, published}, null, clearForm))
    setId(null)
    setTitle('')
    setImage(null)
    setDescription('')
    setContent('')
    setHotBlog(false)
    
    setPublished(false)
    setShowInnerForm(false)
  }

  const removeElement = id => {
    setIsConfirmRemove(true)
    setId(id)
  }

  const confirmRemoveElement = id => {
    dispatch(DeleteBlog(blog.filter(item => Number(item.id) === Number(id))[0], setIsConfirmRemove))
  }

  const clearForm = () => {
    setShowInnerForm(false)
    setTitle('')
    setImage(null)
    setDescription('')
    setContent('')
    setHotBlog(false)
    setPublished(false)
  }

  console.log(blog)

  return (
    <section className="wizard__form">
      <header className="wizard__header">
        <h3 className="wizard__title">Блог</h3>
        { !showInnerForm && <Button onClick={() => setShowInnerForm(true)}>Добавить</Button> }  
      </header>
      { showInnerForm 
        ? <section className="wizard__inner">
          <form action="" className="form">
            <img src={ imageFile !== null ? URL.createObjectURL(imageFile) : image !== null ? image : settings.project.defaultImage } alt="" className="wizard__image" />
            <FormImage value={image} setValue={setImage} file={imageFile} setFile={setImageFile} isCircle={false} directUpload={true} groupClass="margin-top" id="blog.image" />          
            <FormInput value={title} setValue={setTitle} placeholder='Название' id="blog.title" />
            <FormText value={description} setValue={setDescription} placeholder='Краткое описание' id="blog.description" />
            <FormEditor value={content} setValue={setContent} placeholder='Подробное описание' id="blog.content" hideCollapse />
            <FormCheckbox value={hotBlog} setValue={setHotBlog} placeholder="Показать на главной странице" id="blog.hot_blog" />
            <FormCheckbox value={published} setValue={setPublished} placeholder="Опубликовать запись" id="blog.published" />
            <Button onClick={() => 
              { isEditable ? updateElement(id) : handleAddElement() }
            }>
              { isEditable ? 'Изменить' : 'Добавить' }
            </Button>
          </form>
        </section> 
        : <>
          { blog.length 
            ? blog.map(item => <article className="wizard__article">
              <header className="wizard__header">
                <h4 className="wizard__title">{ item.title }</h4>
                <div className="wizard__buttons">
                  <Link to={setURL('blog', item.id)}>
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
              <div className="wizard__flex">
                <img src={item.image !== null ? item.image : settings.project.defaultImage} alt="" className={setClasses("wizard__image", 'part')} />
                <div className="wizard__parts">
                  <div className="wizard__html" dangerouslySetInnerHTML={{__html:item.description.substring(0, 180).replace(/<img[^>]*>/g,"") + '...' }} />                  
                  <p className={setClasses("wizard__quote", 'inline')}>Полное описание доступно при редактировании сверхцели</p>
                </div>
              </div>
            </article>) 
            : <p className="wizard__text">Постов в блоге пока нет</p>
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

export default ProfileModerator