import { dataBase } from "../../config/firebase";
import { getSections } from "./actions";
import { GET_SECTIONS } from "./types";

const sections = (state = null, { type, payload }) => {
  switch(type) {
    case GET_SECTIONS:
      return payload
    default:
      return state
  }
}

export const GetSections = () => async dispatch => {
  await dataBase.collection("sections").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getSections(list))
  })
}

export default sections