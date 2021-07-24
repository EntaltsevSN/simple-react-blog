import { ADD_THREAD, GET_THREADS } from "./types"

export const addThread = threads => ({
  type: ADD_THREAD, payload: threads
})

export const getThreads = threads => ({ 
  type: GET_THREADS, payload: threads 
})