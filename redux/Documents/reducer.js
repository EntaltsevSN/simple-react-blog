import { dataBase } from "../../config/firebase";
import { addDocument, getDocuments } from "./actions";
import { ADD_DOCUMENT, GET_DOCUMENTS } from "./types";

const documents = (state = null, { type, payload }) => {
  switch(type) {
    case GET_DOCUMENTS:
      return payload
    case ADD_DOCUMENT:
      return [...state, payload]
    default:
      return state
  }
}

export const GetDocuments = () => async dispatch => {
  await dataBase.collection("documents").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getDocuments(list))
  })
}

export const AddDocument = (nextId, subsectionId, title, text, callBack) => async dispatch => {
  const { id } = dataBase.collection('documents').doc()
  const post = { id: nextId, subsection_id: subsectionId, title, text }
  await dataBase.collection('documents').doc(id).set(post).then(ref => {
    dispatch(addDocument(post))
    callBack(false)
  })  
}

export default documents