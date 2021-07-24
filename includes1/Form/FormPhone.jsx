import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function FormPhone(props) {
  return (
    <div className="form__group">
      <PhoneInput className="form__input" country={'ru'} />
    </div>
  )
}

export default FormPhone