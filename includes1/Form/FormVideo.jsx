import React, { useState } from 'react'
import { advices } from '../../config/advices'
import { setClasses } from '../../config/functions'
import FormAdvice from './FormAdvice'

function FormVideo({ value, setValue, placeholder, groupClass, id }) {
  const [videoImage, setVideoImage] = useState('')

  const advice = advices.map(({ option }) => option).includes(id)
    ? advices.filter(({ option }) => option === id)[0]
    : null

  const options = {
    value, 
    onChange: e => handleValidateVideo(e.target.value),
    placeholder
  }

  const getVideoId = url => url.includes('youtube') ? url.includes('v=') ? url.split('v=')[1].split('&')[0] : null : null

  const handleValidateVideo = value => {
    setValue(value)
    
    const image = new Image()
    image.src = `http://img.youtube.com/vi/${getVideoId(value)}/mqdefault.jpg`
    image.onload = () => setVideoImage({ src: image.src, width: image.width, height: image.height })
  }

  return (
    <div className={ groupClass !== undefined ? setClasses('form__group', groupClass) : "form__group"}>
      <div className="form__flex">
        <input className="form__input form__input--with-margin" type="text" {...options} noValidate={true} />
        { advice !== null && <FormAdvice advice={advice} /> }
      </div>
      { (value !== '' && value !== null) ? (videoImage.width === 120 && videoImage.height === 90) ? <p>Видео по указанной ссылке не найдено</p> : <iframe width="560" height="315" src={`https://www.youtube.com/embed/${getVideoId(value)}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="form__iframe" allowfullscreen></iframe> : <></> }
    </div>
  )
}

export default FormVideo