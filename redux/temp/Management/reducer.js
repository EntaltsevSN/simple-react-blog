import { dataBase } from "../../config/firebase";
import { getId } from "../../config/functions";
import { getNewProjectRequest, getNewRequest } from "../../config/getters";
import { addPopup, removePopup } from "../Popup/actions";
import { CallPopup } from "../Popup/reducer";
import { UpdateProjectStatus, UpdateRewardStatus } from "../Projects/reducer";
import { addRequest, getRequests, removeRequest, updateRequest } from "./actions";
import { ADD_REQUEST, GET_REQUESTS, REMOVE_REQUEST, UPDATE_REQUEST } from "./types";

export const management = (state = [], { type, payload }) => {
  switch(type) {
    case ADD_REQUEST:
      return [...state, payload]
    case UPDATE_REQUEST:
      return [...state.map(item => item.id === payload.id ? payload : item)]
    case REMOVE_REQUEST:
      return [...state.filter(item => item.id !== payload)]
    case GET_REQUESTS:
      return payload
    default: 
      return state
  }
}

export const AddRequest = (payload, type, dataId) => async dispatch => {
  const { id } = dataBase.collection('projects_management').doc()
  const request = getNewRequest(payload, type, dataId, id)
  dataBase.collection('projects_management').doc(id).set(request).then(ref => {
    dispatch(addRequest(request))
    dispatch(CallPopup(`add ${type} request`))
  })  
}

export const CancelRequest = (payload, type, id) => async dispatch => {
  const request = payload.filter(item => 
    (item.type === type) && (type === 'project' ? item['data_id'] === id : (
      item['data_id'].project === id.project && item['data_id'].reward === id.reward
    ))
  )[0]
  const currentRequest = dataBase.collection('projects_management').doc(request.docId)
  currentRequest.update({...request, status: 'canceled'}).then(() => {
    dispatch(updateRequest({...request, status: 'canceled'}))
    dispatch(CallPopup(`cancel ${type} request`))
  })
}

export const UpdateRequest = (payload, type, id, status, comment, project) => async dispatch => {
  const request = payload.filter(item => 
    (item.type === type) && (type === 'project' ? item['data_id'] === id : (
      item['data_id'].project === id.project && item['data_id'].reward === id.reward
    ))
  )[0]
  const currentRequest = dataBase.collection('projects_management').doc(request.docId)
  currentRequest.update({...request, status, comment, date_updated: +new Date()}).then(() => {
    dispatch(updateRequest({...request, status, comment, date_updated: +new Date()}))
    type === 'project'
      ? dispatch(UpdateProjectStatus(project, status === 'approved' ? 'APD' : 'RJD'))
      : dispatch(UpdateRewardStatus(project, id.reward, status === 'approved' ? 'APD' : 'RJD'))
    dispatch(CallPopup(`${status} ${type} request`))
  })
}

export const UpdateProjectRequest = (request, project, status) => async dispatch => {
  const currentRequest = dataBase.collection('projects_management').doc(request.docId)
  const newRequest = {
    ...request, 
    approved: status === 'approved' ? true : false, 
    status
  }
  currentRequest.update(newRequest).then(() => {
    dispatch(updateRequest(newRequest))
    dispatch(UpdateProjectStatus(project, status === 'approved' ? 'APD' : 'RJD'))
    dispatch(CallPopup(`${status} project request`))
  })
}

export const RemoveRequest = (id, doc) => (dispatch) => {
  const currentrequest = dataBase.collection('projects_management').doc(doc)
  currentRequest.delete().then(() => dispatch(removeRequest(id)))
}

export const GetRequests = () => async(dispatch) => {
  await dataBase.collection("projects_management").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getRequests(list))
  })
}