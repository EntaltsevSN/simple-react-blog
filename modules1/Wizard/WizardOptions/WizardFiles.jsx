import React, { useEffect, useState } from 'react'
import FormInput from '../../../includes/Form/FormInput'
import FormFile from '../../../includes/Form/FormFile'
import Button from '../../../includes/Button'
import { Redirect, useLocation } from 'react-router'
import { getNewFile, getNewGoal, getNewLink } from '../../../config/getters'
import { VscEdit, VscTrash } from 'react-icons/vsc'
import { formatSum, setClasses } from '../../../config/functions'
import { settings } from '../../../config/settings'

function WizardFiles({ project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges }) {
  let path = useLocation().pathname.split('/')
  path.pop()  

  const URL = path.join('/')

  const [starterList, setStarterList] = useState(data.files)
  const [files, setFiles] = useState(data.files)
  const [showInnerForm, setShowInnerForm] = useState(false)
  const [isConfirmComeBack, setIsConfirmComeBack] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isConfirmRemove, setIsConfirmRemove] = useState(false)
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [meta, setMeta] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setData({
      ...data,
      files
    })
  }, [files])

  const comeBack = () => {
    setData(project)
    setIsSavedChanges(true)
  }

  const handleAddElement = () => {
    setFiles(prev => [...prev, getNewFile(files, title, file, meta)])
    setShowInnerForm(false)
    setTitle('')
    setMeta({})
    setFile(null)
  }

  const confirmComeBack = () => {
    setIsConfirmComeBack(true)
  }

  const editElement = id => {
    setIsEditable(true)
    setTitle(files.filter(item => item.id === id)[0].title)
    setFile(files.filter(item => item.id === id)[0].file)
    setFile(files.filter(item => item.id === id)[0].meta)
    setId(id)
    setShowInnerForm(true)
  }

  const updateElement = id => {
    setFiles(prev => [...prev.map(item => item.id === id ? {...item, title, file, meta} : item)])
    setId(null)
    setTitle('')
    setFile(null)
    setMeta({})
    setShowInnerForm(false)
  }

  const removeElement = id => {
    setIsConfirmRemove(true)
    setId(id)
  }

  const confirmRemoveElement = id => {
    setFiles(prev => [...prev.filter(item => item.id !== id)])
    setIsConfirmRemove(false)
  }

  return (
    <section className="wizard__form">
      <header className="wizard__header">
        <h3 className="wizard__title">{ getCards(data).filter(({ slug }) => slug === 'files')[0].title }</h3>
        { !showInnerForm && <Button onClick={() => setShowInnerForm(true)}>Добавить</Button> }  
      </header>
      { showInnerForm 
        ? <section className="wizard__inner">
          <FormFile value={file} setValue={setFile} meta={meta} setMeta={setMeta} isLoading={isLoading} setIsLoading={setIsLoading} id="file.file" />       
          {
            isLoading !== false
              ? <section className={setClasses("project__path", 'fixed')}>
                <div 
                  className="project__current-path" 
                  style={{ width: isLoading > 100 ? '100' : isLoading + '%' }}
                ></div>
              </section>
              : file !== null 
                ? <p><a href={file} target="_blank">Скачать файл</a></p>
                : <></>
          }
          <FormInput value={title} setValue={setTitle} placeholder='Название' id="file.title" />
          <Button onClick={() => 
            { isEditable ? updateElement(id) : handleAddElement() }
          }>
            { isEditable ? 'Изменить' : 'Добавить' }
          </Button>
        </section> 
        : <>
          { files.length 
            ? files.map(item => <article key={item.id} className="wizard__article">
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
              { item.file !== null 
                  ? <p><a key={item.id} href={item.file} target="_blank">Скачать файл</a></p> 
                  : isLoading ? <p>Идёт загрузка файла...</p> : <></> }
            </article>) 
            : <p className="wizard__text">Файлов пока нет</p>
          }
          { starterList !== files && 
            <p className="wizard__quote">Сохраните внесенные изменения</p>
          }
          <div className="wizard__controls">
            <Button onClick={() => handleSaveChanges('files')}>Сохранить</Button>
            <Button onClick={() => 
              starterList !== files ? confirmComeBack() : comeBack()
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

export default WizardFiles