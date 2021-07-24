import React from 'react'
import { advices } from '../../config/advices'
import { setClasses } from '../../config/functions'
import Select from 'react-select'
import FormAdvice from './FormAdvice'

function FormSelect({ options, placeholder, type, value, setValue, isDisabled, id = undefined, disabled = false}) {

  const noOptions = [
    { value: 'none', label: 'Опции не объявлены' }
  ]
  const advice = advices.map(({ option }) => option).includes(id)
    ? advices.filter(({ option }) => option === id)[0]
    : null

  const selectOptions = options === undefined ? noOptions : options.length === 0 ? noOptions : options

  return (
    <section className="form__group">
      <Select
        placeholder={placeholder} 
        className={setClasses('form__select', type)}
        defaultValue={selectOptions.filter(item => item.value === value)[0]}
        value={value === null ? null : selectOptions.filter(item => item.value === value)[0]}
        onChange={e => setValue(e.value)}
        options={selectOptions}
        isDisabled={disabled}
      /> 
      { advice !== null && <FormAdvice advice={advice} /> }
    </section>
  )
}

export default FormSelect