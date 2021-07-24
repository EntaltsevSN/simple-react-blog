import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import Button from '../Button'
import getCroppedImg from '../CropImage'

function FormImageCropper({ image, setImage, cropImage, directUpload, setShowCropper }) {
  const url = document.location.href

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isCircle, setIsCircle] = useState(url.includes('profile') ? true : false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

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
            setImage(croppedImage)
            // setFile(file)  
          }
        });      
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  return (
    <>
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
    </>
  )
}

export default FormImageCropper