import firebase from 'firebase'
import 'firebase/storage'

firebase.initializeApp({
  apiKey: 'AIzaSyAq3NuJ8G9CsibUKQWWixPrKzn9KDYGgCE',
  authDomain: 'school-100-brave-4.firebaseapp.com',
  databaseURL: 'https://school-100-brave-4.firebaseio.com',
  projectId: 'school-100-brave-4',
  storageBucket: 'school-100-brave-4.appspot.com',
  messagingSenderID: '88604205731',
  appId: '1:88604205731:web:4bf03a4a2a5abe730f9516'
})

export const base = firebase
export const auth = firebase.auth()
export const dataBase = firebase.firestore()
export const storage = firebase.storage()

export default firebase