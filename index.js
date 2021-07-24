import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './redux/store'

import 'normalize.css'
import './styles/style.scss'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.getElementById('app')
)