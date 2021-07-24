import { dataBase, storage } from "../../config/firebase"
import { getNextId } from "../../config/functions"
import { getNewBlogPost, getNewComment } from "../../config/getters"
import { AddThread } from "../CommentThreads/reducer"
import { CallPopup } from "../Popup/reducer"
import { deleteBlog, deleteComment, getComments, updateComment } from "./actions"
import { ADD_COMMENT, DELETE_COMMENT, GET_COMMENTS, UPDATE_COMMENT } from "./types"

export const comments = (state = [], { type, payload }) => {
  switch(type) {
    case ADD_COMMENT:
      return [...state, payload]
    case UPDATE_COMMENT:
      return [...state.map(item => Number(item.id) === Number(payload.id) ? payload : item)]
    case DELETE_COMMENT:
      return [...state.filter(item => Number(item.id) !== Number(payload))]
    case GET_COMMENTS:
      return payload
    default: 
      return state
  }
}

export const AddComment = (payload, data, callBack) => async dispatch => {
  const { id } = dataBase.collection('comments').doc()
  const comment = getNewComment(payload, data.thread, data.user, data.text, data.parent, id)
  dataBase.collection('comments').doc(id).set(post).then(ref => {
    dispatch(addComment(comment))
    dispatch(CallPopup('add comment', data.text))
    callBack()
  })  
}

export const UpdateComment = (post, files, callBack) => async dispatch => {
  const currentPost = dataBase.collection('comments').doc(post.docId)
  const storageRef = storage.ref()
  let newPost = post
  if(files !== null) {await Promise.all(Object.keys(files).map(async item => {
    if(files[item] !== null && files[item] !== false) {
      const fileRef = storageRef.child(files[item].name)
      await fileRef.put(files[item])
      const url = await fileRef.getDownloadURL()
      newPost[item] = url
    }
  }))}
  await currentPost.update(newPost).then(() => { 
    console.log('new post', newPost)
    dispatch(updateComment(newPost))
    dispatch(CallPopup('edit blog', newPost.title))
    callBack !== undefined ? callBack() : console.log('')
  })
}

export const DeleteComment = (post, callBack) => async dispatch => {
  const currentPost = dataBase.collection('comments').doc(post.docId)
  currentPost.delete().then(() => {
    dispatch(deleteComment(post.id))
    dispatch(CallPopup('delete blog', post.title))
    callBack(false)
  })
}

export const GetComments = () => async(dispatch) => {
  await dataBase.collection("comments").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getComments(list))
  })
}