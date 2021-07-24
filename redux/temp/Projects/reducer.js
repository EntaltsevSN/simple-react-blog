import { dataBase, storage } from "../../config/firebase"
import { addNewsComment, addProject, addProjectComment, getProjects, updateProject } from "./actions"
import { ADD_NEWS_COMMENT, ADD_PROJECT, ADD_PROJECT_COMMENT, GET_PROJECTS, UPDATE_PROJECT } from "./types"
import { getNewComment, getNewProject } from '../../config/getters'
import { CallPopup } from "../Popup/reducer"


export const projects = (state = [], { type, payload }) => {
  switch(type) {
    case ADD_PROJECT:
      return [...state, payload]
    case UPDATE_PROJECT:
      return [...state.map(item => Number(item.id) === Number(payload.id) ? payload : item)]
    case ADD_PROJECT_COMMENT:
      return [...state.map(item => Number(item.id) === Number(payload.id) ? payload : item)]
    case ADD_NEWS_COMMENT:
      return [...state.map(item => Number(item.id) === Number(payload.id) ? payload : item)]
    case GET_PROJECTS:
      return payload
    default: 
      return state
  }
}

export const AddProject = (payload, projects, setProject) => async dispatch => {
  const { id } = dataBase.collection('projects').doc()
  const project = getNewProject(payload, projects, id)
  dataBase.collection('projects').doc(id).set(project).then(ref => {
    dispatch(addProject(project))
    dispatch(CallPopup('add project', project.title))
    setProject(prevState => prevState === null ? project.id : prevState)
  })  
}

export const UpdateProject = (project, files, section, setValue) => async dispatch => {
  const currentProject = dataBase.collection('projects').doc(project.docId)
  const storageRef = storage.ref()
  let newProject = project
  await Promise.all(Object.keys(files).map(async item => {
    if(files[item] !== null && files[item] !== false) {
      const fileRef = storageRef.child(files[item].name)
      await fileRef.put(files[item])
      const url = await fileRef.getDownloadURL()
      newProject[item] = url
    }
  }))
  await currentProject.update(newProject).then(() => { 
    dispatch(updateProject(newProject))
    dispatch(CallPopup('edit project', section))
    setValue(prevState => prevState === false ? true : false) 
  })
}

export const AddProjectComment = (post, text, authorId, replyId, treeId, callBack = undefined) => async dispatch => {
  const currentPost = dataBase.collection('projects').doc(post.docId)
  const storageRef = storage.ref()
  const updatedPost = {...post, comments: [...post.comments, getNewComment(post.comments, text, authorId, replyId, treeId)]} 
  currentPost.update(updatedPost)
    .then(() => {
      dispatch(addProjectComment(updatedPost))
      dispatch(CallPopup('add comment'))
      callBack()
    })
}

export const AddNewsComment = (post, text, authorId, replyId, treeId, callBack = undefined, project = undefined) => async dispatch => {
  const currentPost = dataBase.collection('projects').doc(project.docId)
  const storageRef = storage.ref()
  const updatedProject = {...project, news: [...project.news.map(item => 
    Number(item.id) === Number(post.id) 
      ? {...post, comments: [...post.comments, getNewComment(post.comments, text, authorId, replyId, treeId)]}
      : item
  )]}
  currentPost.update(updatedProject)
    .then(() => {
      dispatch(addNewsComment(updatedProject))
      dispatch(CallPopup('add comment'))
      callBack()
    })
}

export const UpdateProjectStatus = (project, status, callBack = undefined) => async dispatch => {
  const currentProject = dataBase.collection('projects').doc(project.docId)
  await currentProject.update({...project, status}).then(() => { 
    dispatch(updateProject({...project, status}))
    if(callBack !== undefined) { callBack(false) }
  })
}

export const UpdateRewardStatus = (project, rewardId, status, callBack = undefined) => async dispatch => {
  const currentProject = dataBase.collection('projects').doc(project.docId)
  await currentProject.update(
    {...project, rewards: [...project.rewards.map(item => item.id === rewardId ? {...item, status} : item)]}
  ).then(() => { 
    dispatch(updateProject(
      {...project, rewards: [...project.rewards.map(item => item.id === rewardId ? {...item, status} : item)]}
    ))
    if(callBack !== undefined) { callBack(false) }
  })
}

export const UpdateProjectComments = (project, post, comment, authorID) => async dispatch => {
  const currentProject = dataBase.collection('projects').doc(project.docId)
  const newComment = getNewComment(project.comments, comment, authorID)
  const newProject = {
    ...project,
    comments: [...project.comments, newComment]
  }
  await currentProject.update(newProject).then(() => { 
    dispatch(updateProject(newProject))
    dispatch(CallPopup('add comment'))
  })
}

export const UpdateProjectNews = (project, post, comment, authorID) => async dispatch => {
  const currentProject = dataBase.collection('projects').doc(project.docId)
  const newComment = getNewComment(post.comments, comment, authorID)
  const newProject = {
    ...project,
    news: [...project.news.map(item => Number(item.id) === Number(post.id) 
      ? {...post, comments: [...post.comments, newComment]}
      : item
    )]
  }
  await currentProject.update(newProject).then(() => { 
    dispatch(updateProject(newProject))
    dispatch(CallPopup('add comment'))
  })
}

export const GetProjects = () => async(dispatch) => {
  await dataBase.collection("projects").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getProjects(list))
  })
}