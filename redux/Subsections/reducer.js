import { dataBase } from "../../config/firebase";
import { addSubsection, getSubsections } from "./actions";
import { ADD_SUBSECTION, GET_SUBSECTIONS } from "./types";

const subsections = (state = null, { type, payload }) => {
  switch(type) {
    case GET_SUBSECTIONS:
      return payload
    case ADD_SUBSECTION:
      return [...state, payload]
    default:
      return state
  }
}

export const GetSubsections = () => async dispatch => {
  await dataBase.collection("subsections").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getSubsections(list))
  })
}

export const AddSubsection = (nextId, sectionId, title, callBack) => async dispatch => {
  const { id } = dataBase.collection('subsections').doc()
  const post = { id: nextId, section_id: sectionId, title }
  await dataBase.collection('subsections').doc(id).set(post).then(ref => {
    dispatch(addSubsection(post))
    callBack(true)
  })  
}

export default subsections