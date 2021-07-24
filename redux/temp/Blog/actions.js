import { ADD_BLOG, DELETE_BLOG, GET_BLOGS, UPDATE_BLOG } from "./types"

export const addBlog = blog => ({
  type: ADD_BLOG, payload: blog
})

export const updateBlog = blog => ({
  type: UPDATE_BLOG, payload: blog
})

export const deleteBlog = id => ({
  type: DELETE_BLOG, payload: id
})

export const getBlogs = blogs => ({ 
  type: GET_BLOGS, payload: blogs 
})