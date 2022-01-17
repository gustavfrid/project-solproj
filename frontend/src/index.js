import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import { setupStore } from './store/setupStore'

// Retrieve localstorage as initial state
const persistedStateJSON = localStorage.getItem('solprojReduxState')
let persistedState = {}

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON)
}

const store = setupStore(persistedState)

// Store the state in localstorage when Redux state change
store.subscribe(() => {
  localStorage.setItem('solprojReduxState', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
