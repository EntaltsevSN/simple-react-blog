import { ADD_POPUP, REMOVE_POPUP } from "./types"

export const addPopup = (id, type, title) => ({
  type: ADD_POPUP, payload: { id, type, title }
})

export const removePopup = id => ({ 
  type: REMOVE_POPUP, payload: id 
})