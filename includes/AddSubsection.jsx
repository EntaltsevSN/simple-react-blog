import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../redux/Modal/actions'
import { AddSubsection } from '../redux/Subsections/reducer'
import Button from './Button'

export default ({ subsections, sectionId }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)  
  const [isSubsectionAdded, setIsSubsectionAdded] = useState(false)

  const nextId = Math.max(...subsections.map(({ id }) => id)) + 1

  console.log(nextId)

  useEffect(() => {
    setIsDisabled(title !== '' ? false : true)
  }, [title])

  useEffect(() => {
    if(isSubsectionAdded) {
      dispatch(closeModal())
    }
  }, [isSubsectionAdded])

  const handleSubmit = () => {
    dispatch(AddSubsection(Number(nextId), sectionId, title, setIsSubsectionAdded))
    setIsDisabled(true)
  }

  return (
    <>
      <section className="modal">
        <h2 className="modal__title">Добавить подкатегорию</h2>
        <form className="form">
          <section className="form__section">
            <input className="form__input" placeholder="Заголовок подкатегории" type="text" value={title} onChange={e => setTitle(e.target.value)}/>
          </section>
        </form>
        <Button disabled={isDisabled} onClick={() => handleSubmit()}>Добавить</Button>
      </section>
      <section className="overlay" onClick={() => dispatch(closeModal())} />
    </>
  )
}