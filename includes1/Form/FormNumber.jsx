import React from 'react'
import { advices } from '../../config/advices'
import { setClasses } from '../../config/functions'
import FormAdvice from './FormAdvice'

function FormNumber({ value, setValue, placeholder, groupClass, inputClass, min, max = 999, allowZero = false, id }) {
  const options = {
    value: Number(value) === 0 
      ? !allowZero ? '' : 0
      : String(value).length > 1 
        ? String(value).charAt(0) === String(0) 
          ? Number(String(value).substring(1, String(value).length))
          : Number(value)
        : Number(value), 
    onChange: e => setValue(e.target.value),
    placeholder,
    min, max
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
      <input className={setClasses("form__input", inputClass)} type="number" {...options} noValidate={true} />
      { advice !== null && <FormAdvice advice={advice} /> }
    </div>
  )
}

export default FormNumber