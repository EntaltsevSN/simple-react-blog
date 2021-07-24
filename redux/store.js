import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import sections from './Sections/reducer'
import subsections from './Subsections/reducer'
import documents from './Documents/reducer'
import threads from './Threads/reducer'
import messages from './Messages/reducer'
import modal from './Modal/reducer'

export const store = createStore(
  combineReducers({ sections, subsections, documents, threads, messages, modal }),
  applyMiddleware(thunk)
)