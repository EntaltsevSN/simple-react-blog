import React, { useEffect, useState } from 'react'
import Button from './Button'

export default ({ action, check }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsDisabled(login !== '' && password !== '' ? false : true)
  }, [login, password])

  const handleSubmit = () => {
    setIsDisabled(true)
    if(login === check.login && password === check.password) {
      action(true)
    } else {
      setIsError(true)
      setIsDisabled(false)
    }
  }

  return (
    <>
      <section className="modal">
        <h2 className="modal__title">Войти в панель администратора</h2>
        <form className="form">
          <section className="form__section">
            <input className="form__input" placeholder="Логин" type="text" value={login} onChange={e => setLogin(e.target.value)}/>
          </section>
          <section className="form__section">
            <input className="form__input" placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
          </section>
        </form>
        <Button disabled={isDisabled} onClick={() => handleSubmit()}>Войти</Button>
        { isError && <p className="error">Неправильный логин или пароль</p> }
      </section>
      <section className="overlay" />
    </>
  )
}