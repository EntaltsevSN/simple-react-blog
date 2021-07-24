import React from 'react'
import { setClasses } from '../../config/functions'
import { AiOutlineSearch } from 'react-icons/ai'
import Button from '../Button'
import { useSelector } from 'react-redux'

function FormInput({ value, setValue, placeholder, groupClass, onEnter }) {
  const search = useSelector(state => state.search)
  
  const options = {
    value, 
    onChange: e => setValue(e.target.value),
    onKeyDown: e => onEnter(e),
    placeholder
  }
  return (
    <div className={ groupClass !== undefined ? setClasses('form__group', 'no-margin') : "form__group"}>
      <div className="form__switcher">
        <input className="form__input" type="search" {...options} noValidate={true} />
        { search.length > 0 ? <></> : <Button className="form__toggle" onClick={() => false}>
          <AiOutlineSearch/>
        </Button> }
      </div>
    </div>
  )
}

export default FormInput