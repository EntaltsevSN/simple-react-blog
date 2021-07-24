import { auth, dataBase } from "../../config/firebase"
import { CallPopup } from "../Popup/reducer"
import { AddUser } from "../Users/reducer"
import { login, logout, setUserData } from "./actions"
import { SET_AS_LOGGED_IN, SET_AS_LOGGED_OUT, SET_IF_SHOULD_BE_LOGGED_IN, SET_USER_DATA } from "./types"

const initialState = {
  isLoggedIn: false,
  isShouldBeLoggedIn: false,
  data: null
}

export const profile = (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_AS_LOGGED_IN:
      return {...state, isLoggedIn: payload}
    case SET_AS_LOGGED_OUT:
      return {...state, isLoggedIn: payload}
    case SET_IF_SHOULD_BE_LOGGED_IN:
      return {...state, isShouldBeLoggedIn: payload}
    case SET_USER_DATA:
      return {...state, data: payload}
    default: 
      return state
  }
}

export const IsLoggedIn = toggleLoader => async(dispatch) => {
  await auth.onAuthStateChanged(user => {
    user !== null ? dispatch(login()) : dispatch(logout())
    dataBase.collection('users').get().then(query =>
      query.forEach(doc => {
        if(user !== null) {
          if(user.email === doc.data().email) {
            dispatch(setUserData(doc.data()))
            toggleLoader(prevState => prevState === true ? false : false)
          }
        } else {
          toggleLoader(prevState => prevState === true ? false : false)
        }
      }
      )
    )
  })
}

export const RegisterUser = (login, email, password, users) => async dispatch => 
  await auth.createUserWithEmailAndPassword(email, password)
    .then(({ userData }) => {
      dispatch(AddUser({ login, email }, users))
      dispatch(CallPopup('register user', login))
    })

export const AuthorizeUser = (email, password, user, closeModal, setFormError) => async dispatch => {
  await auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(login())
      dispatch(closeModal())
      dispatch(CallPopup('authorize user', user.login))
    }).catch(() => {
      setFormError(prevState => 'E-mail и пароль не совпадают')
    })
}

export const Logout = () => async dispatch => {
  await auth.signOut().then(() => {
    dispatch(logout())
    dispatch(CallPopup('logout user'))
  })
}