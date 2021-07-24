import { dataBase, storage } from "../../config/firebase"
import { getNewPage } from "../../config/getters"
import { CallPopup } from "../Popup/reducer"
import { addPage, deletePage, getPages, updatePage } from "./actions"
import { ADD_PAGE, DELETE_PAGE, GET_PAGES, UPDATE_PAGE } from "./types"

export const pages = (state = [], { type, payload }) => {
  switch(type) {
    case ADD_PAGE:
      return [...state, payload]
    case UPDATE_PAGE:
      return [...state.map(item => Number(item.id) === Number(payload.id) ? payload : item)]
    case DELETE_PAGE:
      return [...state.filter(item => Number(item.id) !== Number(payload))]
    case GET_PAGES:
      return payload
    default: 
      return state
  }
}

export const AddPage = (payload, data, callBack) => async dispatch => {
  const { id } = dataBase.collection('pages').doc()
  const page = getNewPage(payload, data.title, data.tag, data.content, id)
  dataBase.collection('pages').doc(id).set(page).then(ref => {
    dispatch(addPage(page))
    dispatch(CallPopup('add page', page.title))
    callBack()
  })  
}

export const UpdatePage = (page, callBack) => async dispatch => {
  const currentPage = dataBase.collection('pages').doc(page.docId)
  const storageRef = storage.ref()
  currentPage.update(page).then(() => { 
    dispatch(updatePage(page))
    dispatch(CallPopup('edit page', page.title))
    callBack()
  })
}

export const DeletePage = (page, callBack) => async dispatch => {
  const currentPage = dataBase.collection('pages').doc(page.docId)
  currentPage.delete().then(() => {
    dispatch(deletePage(page.id))
    dispatch(CallPopup('delete page', page.title))
    callBack(false)
  })
}

export const GetPages = () => async(dispatch) => {
  await dataBase.collection("pages").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getPages(list))
  })
}