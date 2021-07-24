import React, { useState } from 'react'
import { advices } from '../../config/advices'
import { setClasses } from '../../config/functions'
import FormAdvice from './FormAdvice'
import Checkbox from 'rc-checkbox'
import { VscCheck } from 'react-icons/vsc'

function FormCheckbox({ value = false, setValue, groupClass = undefined, placeholder, id, disabled = false }) {
  const advice = advices.map(({ option }) => option).includes(id)
    ? advices.filter(({ option }) => option === id)[0]
    : null
    
  return (
    <div className={ groupClass !== undefined ? setClasses('form__group', groupClass) : "form__group"}>
      <label>
        <Checkbox checked={value} onChange={e => setValue(!value)} className="form__input" disabled={disabled} />
        <VscCheck className="form__checked-icon" />
        <span className="form__span">{ placeholder !== '' ? placeholder : '' }</span>
      </label>
      { advice !== null && <FormAdvice advice={advice} /> }
    </div>
  )
}

export default FormCheckbox