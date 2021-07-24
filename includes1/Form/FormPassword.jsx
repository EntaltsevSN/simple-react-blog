import React, { useState } from 'react'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import Button from '../Button'

function FormPassword({ value, setValue }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  
  const options = {
    value, 
    onChange: e => setValue(e.target.value), 
    placeholder: 'Пароль',
    type: isPasswordVisible ? 'text' : 'password'
  }

  return (
    <div className="form__group">
      <div className="form__switcher">
        <input className="form__input" {...options} noValidate={true} />
        <Button className="form__toggle" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          { isPasswordVisible ? <BiHide /> : <BiShowAlt /> }
        </Button>
      </div>
    </div>
  )
}

export default FormPassword