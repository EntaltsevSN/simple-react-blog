import { openModal } from "./actions";
import { CLOSE_MODAL, OPEN_MODAL } from "./types";

const modal = (state = { isOpened: false, type: null }, { type, payload }) => {
  switch(type) {
    case OPEN_MODAL:
      return { isOpened: true, type: payload }
    case CLOSE_MODAL:
      return { isOpened: false, type: null }
    default:
      return state
  }
}

export const OpenModal = modal => async dispatch => {
  console.log(modal)
  await dispatch(openModal(modal))
}

export default modal