import { GET_REQUESTS, ADD_REQUEST, UPDATE_REQUEST, REMOVE_REQUEST } from "./types"

export const addRequest = request => ({
  type: ADD_REQUEST, payload: request
})

export const updateRequest = request => ({
  type: UPDATE_REQUEST, payload: request
})

export const removeRequest = id => ({
  type: REMOVE_REQUEST, payload: id
})

export const getRequests = requests => ({ 
  type: GET_REQUESTS, payload: requests 
})