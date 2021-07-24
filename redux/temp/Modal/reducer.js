import { dataBase } from "../../config/firebase"
import { addLog, getLogs } from "./actions"
import { SET_MODAL_AS_CLOSED, SET_MODAL_AS_OPENED } from "./types"

export const isModalOpened = (state = false, { type, payload }) => {
  switch(type) {
    case SET_MODAL_AS_OPENED:
      return payload
    case SET_MODAL_AS_CLOSED:
      return payload
    default: 
      return state
  }
}