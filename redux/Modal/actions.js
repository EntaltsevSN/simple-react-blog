import { CLOSE_MODAL, GET_MESSAGES, OPEN_MODAL } from "./types";

export const openModal = modal => ({ type: OPEN_MODAL, payload: modal })
export const closeModal = () => ({ type: CLOSE_MODAL })