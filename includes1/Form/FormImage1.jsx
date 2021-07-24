import React, { useState } from 'react'
import { BsTrash, BsUpload } from 'react-icons/bs'
import { settings } from '../../config/settings'
import Button from '../Button'
import FormImageCropper from './FormImageCropper'

function FormImage({ id, image, setImage, cropImage = true, directUpload = false, groupClass = undefined }) {
  const url = document.location.href
  const [showCropper, setShowCropper] = useState(false)
  const [newImage, setNewImage] = useState(null)

  const handleUpload = e => {
    const file = e.target.files[0]
    const types = ['image/gif', 'image/jpeg', 'image/png', 'image.svg']
    
    file ? types.includes(file['type']) ? setNewImage(file) : setNewImage(null) : console.log('Файл не загружен')

    if(cropImage) {
      setShowCropper(true)
    }
  }

  const handleRemoveImage = () => {
    setIsApprove(false)
    setFile(null)
    setValue(null)
  }

  return (
    <section className={groupClass ? setClasses('form__group', groupClass) : 'form__group'}>
      <img src={ 
        image !== null 
          ? image 
            : url.includes('profile') 
          ? settings.profile.defaultAvatar 
            : settings.project.defaultImage
      } className="form__image" alt=""/>
      <input type="file" className="form__file" id={'image' + id} onChange={e => handleUpload(e)}/>
      <div className="form__flex">
        <label htmlFor={'image' + id} className="button">
          <BsUpload className="form__icon" /> 
        </label>
        <Button className="button--danger button--margin-left" onClick={() => handleApprove()}>
          <BsTrash className="form__icon" /> 
        </Button>
        {/*/ placeholder !== undefined && <div className="form__text">
          { placeholder }
        </div>*/ }
        {/* advice !== null && <FormAdvice advice={advice} /> */}
      </div>
      { showCropper && <FormImageCropper 
        image={ newImage } 
        setImage={ setImage }
        cropImage={ cropImage }  
        directUpload={ directUpload }
        setShowCropper={ setShowCropper }
      /> }
    </section>
  )
}

export default FormImage

/*import React, { useCallback, useEffect, useState } from 'react'
import { BsUpload, BsTrash } from 'react-icons/bs'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../CropImage'
import Button from '../Button'
import { advices } from '../../config/advices'
import FormAdvice from './FormAdvice'
import { getId, setClasses } from '../../config/functions'
import { storage } from '../../config/firebase'

function FormImage({ value, setValue, file, setFile, groupClass, isCircle = false, directUpload = false, cropImage = true, placeholder = undefined, id = '' }) {
  const [image, setImage] = useState(null)
  const [showCropper, setShowCropper] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedImage, setCroppedImage] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [isApprove, setIsApprove] = useState(false)

  useEffect(() => {
    console.log('image 2', image)
    const callback = async () => {
      const storageRef = storage.ref()
      const fileRef = storageRef.child(`${getId(20)}.${image.name.split('.')[1]}`)
      await fileRef.put(image)
      setValue(await fileRef.getDownloadURL())
    }

    if(!cropImage && image !== null) {
      callback()
    }
  }, [image])

  const advice = advices.map(({ option }) => option).includes(id)
    ? advices.filter(({ option }) => option === id)[0]
    : null
  
  const handleUpload = e => {
    const file = e.target.files[0]
    const types = ['image/gif', 'image/jpeg', 'image/png', 'image.svg']

    console.log('file', file)

    file ? types.includes(file['type']) ? setImage(file) : setImage(false) : console.log('Файл не загружен')

    if(cropImage) {
      setShowCropper(true)
    }
  }

  function urltoFile(url, filename, mimeType){
    return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
  }

  const saveNewImage = useCallback(async () => {
    try {    
      const croppedImage = !cropImage ? await getCroppedImg(
        URL.createObjectURL(image)
      ) : await getCroppedImg(
        URL.createObjectURL(image),
        croppedAreaPixels
      )
      console.log('image inside', image)
      urltoFile(croppedImage, image.name, ['image/gif', 'image/jpeg', 'image/png', 'image.svg'])
        .then(async file => {
          if(directUpload) {
            const storageRef = storage.ref()
            const fileRef = storageRef.child(`${getId(20)}.${file.name.split('.')[1]}`)
            await fileRef.put(file)
            setValue(await fileRef.getDownloadURL())
            await setShowCropper(false)
          } else {
            setShowCropper(false)
            setCroppedImage(croppedImage)
            setFile(file)  
          }
        });      
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])
  
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleApprove = () => setIsApprove(true)

  const handleRemoveImage = () => {
    setIsApprove(false)
    setFile(null)
    setValue(null)
  }

  return (
    <>
      <section className={groupClass ? setClasses('form__group', groupClass) : 'form__group'}>
        <input type="file" className="form__file" id={'image' + id} onChange={e => handleUpload(e)}/>
        <div className="form__flex">
          <label htmlFor={'image' + id} className="button">
            <BsUpload className="form__icon" /> 
          </label>
          <Button className="button--danger button--margin-left" onClick={() => handleApprove()}>
            <BsTrash className="form__icon" /> 
          </Button>
          { placeholder !== undefined && <div className="form__text">
            { placeholder }
          </div> }
          { advice !== null && <FormAdvice advice={advice} /> }
        </div>
      </section>
      { showCropper && <>
        <section className="modal">
          <div className="modal__body">
            <Cropper
              className="form__cropper"
              image={URL.createObjectURL(image)}
              crop={crop}
              zoom={zoom}
              aspect={isCircle ? 1 : (16 / 9)}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <footer className="modal__footer">
            <Button onClick={() => saveNewImage()}>Сохранить</Button> 
          </footer>
        </section>
        <div className="overlay"></div>
      </> }
      { isApprove && <>
        <section className="modal">
          <div className="modal__body">
            <p className="modal__question">
              Вы уверены, что хотите удалить изображение
            </p>
            <Button onClick={() => handleRemoveImage()}>Да</Button>
            <Button className="button--bordered button--margin-left" onClick={() => setIsApprove(false)}>Нет</Button>
          </div>
        </section>
        <div className="overlay"></div>
      </> }
    </>
  )
}

export default FormImage*/