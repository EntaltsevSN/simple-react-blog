import React from 'react'
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc'
import { advices } from '../../config/advices'
import { setClasses } from '../../config/functions'
import Button from '../Button'
import Editor from '../Editor'
import FormAdvice from './FormAdvice'
import FormCheckbox from './FormCheckbox'

function FormEditor({ placeholder, value, setValue, isCollapsed = true, setIsCollapsed, id, hideCollapse = false }) {
  const advice = advices.map(({ option }) => option).includes(id)
    ? advices.filter(({ option }) => option === id)[0]
    : null

  return (
    <section className={setClasses("form__group", 'editor')}>
      { !hideCollapse && <FormCheckbox value={isCollapsed} setValue={setIsCollapsed} placeholder="Отображать редактор контента" /> }
      { advice !== null && <FormAdvice advice={advice} margin='8' /> }
      { <section className={isCollapsed ? '' : 'is-hidden'}>
        <Editor 
          placeholder={placeholder} 
          data={value} 
          onChange={setValue}
        />
      </section> }
    </section>
  )
}

export default FormEditor