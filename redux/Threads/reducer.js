import { dataBase } from "../../config/firebase";
import { addThread } from "../temp/CommentThreads/actions";
import { ADD_THREAD } from "../temp/CommentThreads/types";
import { getThreads } from "./actions";
import { GET_THREADS } from "./types";

const threads = (state = null, { type, payload }) => {
  switch(type) {
    case GET_THREADS:
      return payload
    case ADD_THREAD:
      return [...state, payload]
    default:
      return state
  }
}

export const GetThreads = () => async dispatch => {
  await dataBase.collection("threads").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getThreads(list))
  })
}

export const AddThread = (nextId, title, callBack) => async dispatch => {
  const { id } = dataBase.collection('threads').doc()
  const post = { id: nextId, title }
  await dataBase.collection('threads').doc(id).set(post).then(ref => {
    dispatch(addThread(post))
    callBack(true)
  })  
}

export default threads