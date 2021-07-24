import { dataBase } from "../../config/firebase"
import { addLog, getLogs } from "./actions"
import { ADD_LOG, GET_LOGS } from "./types"

const initialState = {
  logs: [],
  version: '0.0.1'
}

export const log = (state = initialState, { type, payload }) => {
  switch(type) {
    case ADD_LOG:
      return {...state, logs: [...state.logs, payload], version: payload.version}
    case GET_LOGS:
      return {...state, logs: payload, version: payload.version}
    default: 
      return state
  }
}

export const AddLog = log => async(dispatch) => {
  dataBase.collection("logs").add(log)
  .then(ref => { 
    dispatch(addLog(log))
  })
  .catch(error => console.log(error))
}

export const GetLogs = () => async(dispatch) => {
  await dataBase.collection("logs").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getLogs(list))
  })
}