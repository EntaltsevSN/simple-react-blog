import { ADD_USER, GET_USERS, UPDATE_USER } from "./types"

export const addUser = user => ({
  type: ADD_USER, payload: user
})

export const updateUser = user => ({
  type: UPDATE_USER, payload: user
})

export const getUsers = users => ({ 
  type: GET_USERS, payload: users 
})