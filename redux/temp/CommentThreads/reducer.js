import { dataBase, storage } from "../../config/firebase"
import { getNewBlogPost, getNewComment, getNewCommentsThread } from "../../config/getters"
import { CallPopup } from "../Popup/reducer"
import { addBlog, updateBlog, getBlogs, deleteBlog, addBlogComment, getThreads, addThread } from "./actions"
import { ADD_THREAD, GET_THREADS } from "./types"

export const commentsThreads = (state = [], { type, payload }) => {
  switch(type) {
    case ADD_THREAD:
      return [...state, payload]
    case GET_THREADS:
      return payload
    default: 
      return state
  }
}

export const AddThread = (payload, type) => async dispatch => {
  const { id } = dataBase.collection('blog').doc()
  const thread = getNewCommentsThread(payload, type, id)
  dataBase.collection('comments_threads').doc(id).set(thread).then(ref => {
    dispatch(addThread(thread))
  })  
}

export const GetCommentsThreads = () => async(dispatch) => {
  await dataBase.collection("comments_threads").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getThreads(list))
  })
}