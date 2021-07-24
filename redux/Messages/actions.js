import { ADD_MESSAGE, GET_MESSAGES } from "./types";

export const getMessages = messages => ({ type: GET_MESSAGES, payload: messages })
export const addMessage = message => ({ type: ADD_MESSAGE, payload: message })