import React, { useEffect, useState } from 'react'
import Button from '../../../includes/Button'
import { Redirect, useLocation } from 'react-router'
import FormImage from '../../../includes/Form/FormImage'
import FormVideo from '../../../includes/Form/FormVideo'
import { settings } from '../../../config/settings'

function WizardBasic({ project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges, imageFile, setImageFile }) {
  let path = useLocation().pathname.split('/')
  path.pop()  
  
  const url = path.join('/')
  
  const [image, setImage] = useState(data.image)
  const [video, setVideo] = useState(data.video)

  useEffect(() => {
    setData({
      ...data,
      image, video
    })
  }, [image, video])

  const comeBack = () => {
    setData(project)
    setIsSavedChanges(true)
  }

  return (
    <section className="wizard__form">
      <h3 className="wizard__title">{ getCards(data).filter(({ slug }) => slug === 'media')[0].title }</h3>
      <img src={ imageFile !== null ? URL.createObjectURL(imageFile) : image !== null ? image : settings.project.defaultImage } alt="" className="wizard__image" />
      <FormImage value={image} setValue={setImage} file={imageFile} setFile={setImageFile} isCircle={false} groupClass="margin-top" id="image" />
      <FormVideo value={video} setValue={setVideo} placeholder='Ссылка на видео' id="video" />
      <div className="wizard__controls">
        <Button onClick={() => handleSaveChanges('media')}>Сохранить</Button>
        <Button onClick={() => comeBack()} className="button--bordered button--margin-left">Вернуться</Button>
      </div>
      {isSavedChanges && <Redirect to={url} />}
    </section>
  )
}

export default WizardBasic