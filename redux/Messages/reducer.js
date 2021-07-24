import { dataBase } from "../../config/firebase";
import { addMessage, getMessages } from "./actions";
import { ADD_MESSAGE, GET_MESSAGES } from "./types";

const messages = (state = null, { type, payload }) => {
  switch(type) {
    case GET_MESSAGES:
      return payload
    case ADD_MESSAGE:
      return [...state, payload]
    default:
      return state
  }
}

export const GetMessages = () => async dispatch => {
  await dataBase.collection("messages").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getMessages(list))
  })
}

export const AddMessage = (nextId, author, authorEmail, text, threadId, callBack) => async dispatch => {
  const { id } = dataBase.collection('messages').doc()
  const post = { id: nextId, author, author_email: authorEmail, thread_id: threadId, text, dateTime: Date.now() }
  await dataBase.collection('messages').doc(id).set(post).then(ref => {
    dispatch(addMessage(post))
    callBack(true)
  })  
}

export default messages