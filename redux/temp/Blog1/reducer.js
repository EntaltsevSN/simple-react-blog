import { dataBase, storage } from "../../config/firebase"
import { getNewBlogPost, getNewComment } from "../../config/getters"
import { CallPopup } from "../Popup/reducer"
import { addBlog, updateBlog, getBlogs, deleteBlog, addBlogComment } from "./actions"
import { ADD_BLOG, ADD_BLOG_COMMENT, DELETE_BLOG, GET_BLOGS, UPDATE_BLOG } from "./types"

export const blog = (state = [], { type, payload }) => {
  switch(type) {
    case ADD_BLOG:
      return [...state, payload]
    case ADD_BLOG_COMMENT:
      return [...state.map(item => Number(item.id) === Number(payload.id) ? payload : item)]
    case UPDATE_BLOG:
      return [...state.map(item => Number(item.id) === Number(payload.id) ? payload : item)]
    case DELETE_BLOG:
      return [...state.filter(item => Number(item.id) !== Number(payload))]
    case GET_BLOGS:
      return payload
    default: 
      return state
  }
}

export const AddBlog = (payload, data, callBack) => async dispatch => {
  const { id } = dataBase.collection('blog').doc()
  const post = getNewBlogPost(payload, data.title, data.image, data.description, data.content, data.hotBlog, data.published, id)
  dataBase.collection('blog').doc(id).set(post).then(ref => {
    dispatch(addBlog(post))
    dispatch(CallPopup('add blog', post.title))
    callBack()
  })  
}

export const AddBlogComment = (post, text, authorId, replyId, treeId, callBack = undefined) => async dispatch => {
  const currentPost = dataBase.collection('blog').doc(post.docId)
  const storageRef = storage.ref()
  const updatedPost = {...post, comments: [...post.comments, getNewComment(post.comments, text, authorId, replyId, treeId)]} 
  currentPost.update(updatedPost)
    .then(() => {
      dispatch(addBlogComment(updatedPost))
      dispatch(CallPopup('add comment'))
      callBack()
    })
}

export const UpdateBlog = (post, files, callBack) => async dispatch => {
  const currentPost = dataBase.collection('blog').doc(post.docId)
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
    dispatch(updateBlog(newPost))
    dispatch(CallPopup('edit blog', newPost.title))
    callBack !== undefined ? callBack() : console.log('')
  })
}

export const DeleteBlog = (post, callBack) => async dispatch => {
  const currentPost = dataBase.collection('blog').doc(post.docId)
  currentPost.delete().then(() => {
    dispatch(deleteBlog(post.id))
    dispatch(CallPopup('delete blog', post.title))
    callBack(false)
  })
}

export const GetBlogs = () => async(dispatch) => {
  await dataBase.collection("blog").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getBlogs(list))
  })
}