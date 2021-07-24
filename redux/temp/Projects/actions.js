import { ADD_NEWS_COMMENT, ADD_PROJECT, ADD_PROJECT_COMMENT, GET_PROJECTS, UPDATE_PROJECT } from "./types"

export const addProject = project => ({
  type: ADD_PROJECT, payload: project
})

export const addProjectComment = project => ({
  type: ADD_PROJECT_COMMENT, payload: project
})

export const addNewsComment = project => ({
  type: ADD_NEWS_COMMENT, payload: project
})

export const updateProject = project => ({
  type: UPDATE_PROJECT, payload: project
})

export const getProjects = projects => ({ 
  type: GET_PROJECTS, payload: projects 
})