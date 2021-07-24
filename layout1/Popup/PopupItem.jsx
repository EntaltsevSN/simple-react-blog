import React from 'react'
import { BsCheck } from 'react-icons/bs'

function PopupItem({ value }) {  
  return (
    <article className="popup__item box">
      <BsCheck className="popup__icon" />
      <div className="popup__body">
        <p className="popup__text">{ value }</p>
      </div>
    </article>
  )
}

export default PopupItem