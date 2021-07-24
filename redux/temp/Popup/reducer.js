import { getId } from "../../config/functions"
import { addPopup, removePopup } from "./actions"
import { ADD_POPUP, REMOVE_POPUP } from "./types"


export const popup = (state = [], { type, payload }) => {
  switch(type) {
    case ADD_POPUP:
      return [...state, payload]
    case REMOVE_POPUP:
      return [...state.filter(item => item.id !== payload)]
    default: 
      return state
  }
}

export const CallPopup = (action, title) => async dispatch => {
  const popupID = getId()
  dispatch(addPopup(popupID, action, title))
  setTimeout(() => dispatch(removePopup(popupID)), 3000)
}