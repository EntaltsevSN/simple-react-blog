import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddMessage } from '../redux/Messages/reducer'
import { closeModal } from '../redux/Modal/actions'
import { AddThread } from '../redux/Threads/reducer'
import Button from './Button'

export default props => {
  const dispatch = useDispatch()
  const threads = useSelector(state => state.threads)
  const messages = useSelector(state => state.messages)

  const nextThreadId = Math.max(...threads.map(({ id }) => id)) + 1
  const nextMessageId = Math.max(...messages.map(({ id }) => id)) + 1

  const [thread, setThread] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [isThreadAdded, setIsThreadAdded] = useState(false)
  const [isMessageAdded, setIsMessageAdded] = useState(false)
  const [isDisabled , setIsDisabled] = useState(true)

  useEffect(() => {
    if(isThreadAdded && isMessageAdded) {
      dispatch(closeModal())
    }
  }, [isThreadAdded, isMessageAdded])

  useEffect(() => {
    if(thread !== '' && name !== '' && email !== '' && text !== '') {
      setIsDisabled(false)
    }
  }, [thread, name, email, text])

  const handleSubmit = e => {
    dispatch(AddThread(Number(nextThreadId), thread, setIsThreadAdded))
    dispatch(AddMessage(Number(nextMessageId), name, email, text, Number(nextThreadId), setIsMessageAdded))
    setIsDisabled(true)
  }

  return (
    <>
      <section className="modal">
        <h2 className="modal__title">Добавить тему</h2>
        <form className="form">
          <section className="form__section">
            <input className="form__input" placeholder="Название темы" type="text" value={thread} onChange={e => setThread(e.target.value)}/>
          </section>
          <section className="form__section">
            <input className="form__input" placeholder="Имя" type="text" value={name} onChange={e => setName(e.target.value)}/>
          </section>
          <section className="form__section">
            <input className="form__input" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          </section>
          <section className="form__section">
            <textarea className="form__input" placeholder="Текст первого сообщения" value={text} onChange={e => setText(e.target.value)}/>
          </section>
        </form>
        <Button disabled={isDisabled} onClick={() => handleSubmit()}>Добавить</Button>
      </section>
      <section className="overlay" onClick={() => dispatch(closeModal())} />
    </>
  )
}