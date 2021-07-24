import { ADD_COMMENT, DELETE_COMMENT, GET_COMMENTS, UPDATE_COMMENT } from "./types"

export const addComment = comment => ({
  type: ADD_COMMENT, payload: comment
})

export const updateComment = comment => ({
  type: UPDATE_COMMENT, payload: comment
})

export const deleteComment = id => ({
  type: DELETE_COMMENT, payload: id
})

export const getComments = comments => ({ 
  type: GET_COMMENTS, payload: comments
})