import React from 'react'
import { advices } from '../../config/advices'
import { setClasses } from '../../config/functions'
import FormAdvice from './FormAdvice'

function FormText({ value, setValue, placeholder, groupClass, id }) {
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
      <textarea className="form__input" value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder}  />
      { advice !== null && <FormAdvice advice={advice} /> }
    </div>
  )
}

export default FormText