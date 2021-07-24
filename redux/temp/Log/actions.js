import { ADD_LOG, GET_LOGS } from "./types"

export const addLog = log => ({
  type: ADD_LOG, payload: log
})

export const getLogs = logs => ({ 
  type: GET_LOGS, payload: logs 
})