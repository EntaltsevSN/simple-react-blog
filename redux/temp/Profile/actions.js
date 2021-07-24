import { SET_AS_LOGGED_IN, SET_AS_LOGGED_OUT, SET_IF_SHOULD_BE_LOGGED_IN, SET_USER_DATA } from "./types"

export const login = () => ({
  type: SET_AS_LOGGED_IN, payload: true
})

export const logout = () => ({ 
  type: SET_AS_LOGGED_OUT, payload: false
})

export const setAsShouldBeLoggedIn = status => ({
  type: SET_IF_SHOULD_BE_LOGGED_IN, payload: status
})

export const setUserData = user => ({
  type: SET_USER_DATA, payload: user
})