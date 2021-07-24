import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { advices } from '../../config/advices'
import { setClasses } from '../../config/functions'
import FormAdvice from './FormAdvice'

function FormPrice({ value, setValue, placeholder, groupClass, id, disabled = false }) {
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
      <CurrencyFormat className="form__input" thousandSeparator=' ' prefix={'₽ '} value={value} onValueChange={e => setValue(e.value)} placeholder={placeholder} disabled={disabled} />
      { advice !== null && <FormAdvice advice={advice} /> }
    </div>
  )
}

export default FormPrice