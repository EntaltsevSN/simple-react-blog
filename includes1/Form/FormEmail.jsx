import React from 'react'

function FormEmail({ value, setValue }) {
  const options = {
    value, 
    onChange: e => setValue(e.target.value),
    placeholder: 'Email'
  }
  
  return (
    <div className="form__group">
      <input className="form__input" type="email" {...options} noValidate={true} />
    </div>
  )
}

export default FormEmail