import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../redux/Modal/actions'
import { AuthorizeUser, RegisterUser } from '../redux/Profile/reducer'
import Button from './Button'
import FormEmail from './Form/FormEmail'
import FormInput from './Form/FormInput'
import FormPassword from './Form/FormPassword'

function LoginForm({ allowOverlay }) {
  const dispatch = useDispatch()
  const [isRegistration, setIsRegistration] = useState(false)
  const users = useSelector(state => state.users)

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistrationForm, setIsRegistrationForm] = useState(isRegistration)
  const [formSettings, setFormSettings] = useState({ login: null, email: null, password: null })
  const [formError, setFormError] = useState('')
  const [authorizeUser, setAuthorizeUser] = useState({})

  useEffect(() => setAuthorizeUser(!isRegistrationForm ? users.filter(item => item.email === email)[0] : {}), [email])

  useEffect(() => {
    setFormSettings(prevState => isRegistrationForm 
      ? { login: null, email: null, password: null }
      : { login: true, email: null, password: null } 
    )
  }, [isRegistrationForm])

  const handleChangeLogin = e => {
    setLogin(e)
    validateLogin(users, e, setFormSettings)
    setFormError('')
  }

  const handleChangeEmail = e => {
    setEmail(e)
    validateEmail(isRegistrationForm, users, e, setFormSettings)
    setFormError('')
  }

  const handleChangePassword = e => {
    setPassword(e)
    validatePassword(e, setFormSettings)
    setFormError('')
  }

  const handleSubmit = e => {
    e.preventDefault()

    const wrongSettings = Object.values(formSettings).filter(item => item !== true).length
    /*if (wrongSettings === 0) {*/
      if (isRegistrationForm) {
        dispatch(RegisterUser(login, email, password, users))
        dispatch(closeModal())
      } else {
        dispatch(AuthorizeUser(email, password, authorizeUser === undefined ? undefined : authorizeUser, closeModal, setFormError))
      }
    /* } else {
      getFormError(formSettings, setFormError)
    }*/
  }

  const clearSettings = () => setFormSettings( 
    isRegistrationForm 
      ? { login: null, email: null, password: null }
      : { login: true, email: null, password: null }
  )

  const clearForm = () => {
    [setLogin, setEmail, setPassword].map(item => item(''))
    clearSettings()
  }

  const toggleForm = () => {
    setIsRegistrationForm(prevState => !prevState)
    clearForm()
    setFormError('')
  }

  const setRegistrationForm = () => isRegistrationForm ? false : setIsRegistrationForm(true)
  const setLoginForm = () => isRegistrationForm ? setIsRegistrationForm(false) : false

  return (
    <>
      <section className="modal">
        <div className="modal__body">
          <div className="row moda l__row">
            <div className="column column--sm-6 modal__column">
              <Button onClick={() => setLoginForm()} className={ 
                ['button--full-width', isRegistrationForm ? false : 'button--active'].join(' ')
              }>Вход на сайт</Button>
            </div>
            <div className="column column--sm-6 modal__column">
              <Button onClick={() => setRegistrationForm()} className={ 
                ['button--full-width', isRegistrationForm ? 'button--active' : false].join(' ')
              }>Регистрация</Button>
            </div>
          </div>
          <form action="" className="form" onSubmit={e => handleSubmit(e)}>
            { isRegistrationForm && 
              <FormInput value={login} setValue={setLogin} placeholder="Логин" />
            }
            <FormEmail value={email} setValue={setEmail}/>
            <FormPassword value={password} setValue={setPassword} />
            <Button type="submit">
              { isRegistrationForm ? <>Зарегистрироваться</> : <>Войти на сайт</> }
            </Button>
            { formError !== '' && <p className="form__error"></p> }
          </form>
        </div>
      </section>
      <div className="overlay" onClick={ allowOverlay ? () => dispatch(closeModal()) : () => false }></div>
    </>
  )
}

export default LoginForm