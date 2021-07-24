import { ADD_PAGE, DELETE_PAGE, GET_PAGES, UPDATE_PAGE } from "./types"

export const addPage = page => ({
  type: ADD_PAGE, payload: page
})

export const updatePage = page => ({
  type: UPDATE_PAGE, payload: page
})

export const deletePage = id => ({
  type: DELETE_PAGE, payload: id
})

export const getPages = pages => ({ 
  type: GET_PAGES, payload: pages 
})