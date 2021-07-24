import { dataBase, storage } from "../../config/firebase"
import { getNewUser } from "../../config/getters";
import { CallPopup } from "../Popup/reducer";
import { login, setUserData } from "../Profile/actions";
import { addUser, getUsers, updateUser } from "./actions";
import { ADD_USER, GET_USERS, UPDATE_USER } from "./types";

export const users = (state = [], { type, payload }) => {
  switch(type) {
    case ADD_USER:
      return [...state, payload ]
    case UPDATE_USER:
      return [...state.map(item => item.id === payload.id ? payload : item)]
    case GET_USERS:
      return payload
    default: 
      return state
  }
}

export const AddUser = (payload, users) => async dispatch => {
  const { id } = dataBase.collection('users').doc()
  const user = getNewUser(payload, users, id)
  dataBase.collection('users').doc(id).set(user).then(ref => {
    dispatch(addUser(user))
    dispatch(setUserData(user))
    dispatch(login())
  })  
}

export const UpdateUser = (user, files = null, callBack) => async dispatch => {
  const currentUser = dataBase.collection('users').doc(user.docId)
  const storageRef = storage.ref()
  let newUser = user
  if(files !== null) { await Promise.all(Object.keys(files).map(async item => {
    if(files[item] !== null && files[item] !== false) {
      const fileRef = storageRef.child(files[item].name)
      await fileRef.put(files[item])
      const url = await fileRef.getDownloadURL()
      newUser[item] = url
    }
  })) }
  await currentUser.update(newUser).then(() => { 
    dispatch(updateUser(newUser))
    dispatch(setUserData(newUser))
    callBack(false)
    dispatch(CallPopup('edit user'))
  })
}

export const UpdateUserCart = (user, projectCart, callBack = undefined) => async dispatch => {
  const currentUser = dataBase.collection('users').doc(user.docId)
  const storageRef = storage.ref()
  let newUser = {...user, cart: 
    user.cart.filter(item => Number(item.id) === Number(projectCart.id)).length > 0 
      ? [...user.cart.map(item => Number(item.id) === Number(projectCart.id) ? projectCart : item)]
      : [...user.cart, projectCart]
  }
  await currentUser.update(newUser).then(() => { 
    dispatch(updateUser(newUser))
    dispatch(setUserData(newUser))
    if (callBack !== undefined) { callBack(false) }
    //dispatch(CallPopup('edit cart'))
  })
}

export const GetUsers = toggleLoader => async(dispatch) => {
  await dataBase.collection("users").get().then(query => {
    const list = []
    query.forEach(doc => list.push(doc.data()))
    dispatch(getUsers(list))
  })
}

export const UpdateUserRole = data => async dispatch => {
  const currentProject = dataBase.collection('users').doc(data.docId)
  await currentProject.update(data).then(() => { 
    dispatch(updateUser(data))
    dispatch(CallPopup('update user role', {login: data.login, role: data.role}))
  })
}