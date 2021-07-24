import { SET_MODAL_AS_CLOSED, SET_MODAL_AS_OPENED } from "./types"


export const openModal = () => ({
  type: SET_MODAL_AS_OPENED, payload: true
})

export const closeModal = () => ({ 
  type: SET_MODAL_AS_CLOSED, payload: false
})