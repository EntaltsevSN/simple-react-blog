import React from 'react'
import { advices } from '../../config/advices'
import { setClasses } from '../../config/functions'
import FormAdvice from './FormAdvice'

function FormInput({ value, setValue, placeholder, groupClass, id, disabled = false }) {
  const options = {
    value, 
    onChange: e => setValue(e.target.value),
    placeholder,
    disabled
  }
  const advice = advices.map(({ option }) => option).includes(id)
    ? advices.filter(({ option }) => option === id)[0]
    : null

  return (
    <div className={ 
      groupClass !== undefined 
        ? setClasses('form__group', groupClass) 
        : advice !== null 
        ? setClasses('form__group', 'flex')
        : "form__group"}>
      <input className="form__input" type="text" {...options} noValidate={true} />
      { advice !== null && <FormAdvice advice={advice} /> }
    </div>
  )
}

export default FormInput