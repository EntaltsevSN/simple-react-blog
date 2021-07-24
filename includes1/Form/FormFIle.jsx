import React, { useCallback, useState } from 'react'
import { BsUpload, BsTrash } from 'react-icons/bs'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../CropImage'
import Button from '../Button'
import { getId, setClasses } from '../../config/functions'
import { advices } from '../../config/advices'
import FormAdvice from './FormAdvice'
import { base, firebase, storage } from '../../config/firebase'

function FormImage({ value, setValue, meta, setMeta, groupClass, isLoading, setIsLoading, id}) {
  const [isApprove, setIsApprove] = useState(false)

  const advice = advices.map(({ option }) => option).includes(id)
    ? advices.filter(({ option }) => option === id)[0]
    : null

  const handleUpload = e => {
    const file = e.target.files[0]
    
    async function uploadTaskPromise() {
      return new Promise(function(resolve, reject) {
        const storageRef = storage.ref()
        const fileRef = storageRef
          .child(`${getId(20)}.${file.name.split('.')[file.name.split('.').length - 1]}`)
        const uploadTask = fileRef.put(file)
        uploadTask.on('state_changed',
          function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setIsLoading(progress)
          },
          function error(err) {          
            reject()
          },
          function complete() {
            uploadTask.snapshot.ref.getMetadata().then(function(metaData) {
              Object.keys(metaData).forEach(key => metaData[key] === undefined && delete metaData[key])
              setMeta(prev => ({...prev, ...metaData}))
            })
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              //resolve(downloadURL)
              setValue(downloadURL)
              setIsLoading(false)
            })
          }
        )
      })
    }
    
    const progress = uploadTaskPromise()
  }

  const handleApprove = () => setIsApprove(true)

  const handleRemoveImage = () => {
    setIsApprove(false)
    setValue(null)
  }

  return (
    <>
      <section className={groupClass ? setClasses('form__group', groupClass) : 'form__group'}>
        <input type="file" className="form__file" id="image" onChange={e => handleUpload(e)}/>
        <div className="form__flex">
          <label htmlFor="image" className="button">
            <BsUpload className="form__icon" /> 
          </label>
          <Button className="button--danger button--margin-left" onClick={() => handleApprove()}>
            <BsTrash className="form__icon" /> 
          </Button>
          { advice !== null && <FormAdvice advice={advice} /> }
        </div>
      </section>
      { isApprove && <>
        <section className="modal">
          <div className="modal__body">
            <p className="modal__question">
              Вы уверены, что хотите удалить файл
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

export default FormImage