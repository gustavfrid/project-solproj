import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { setupStore } from './store/setupStore'
import { RequireAuth } from './utils/RequireAuth'
import { Start } from './components/Start'
import { Auth } from './components/Auth'
import { NotFound } from './components/NotFound'
// import { Project } from './components/Project'
import { MapLeafletGeoman } from './components/Maps/MapLeafletGeoman'
import { MapLeafletDraw } from './components/Maps/MapLeafletDraw'
import { MapReactLeaflet } from './components/Maps/MapReactLeaflet'
import { MapMapbox } from './components/Maps/MapMapbox'

import { Layout } from './components/Layout'

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

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/login' element={<Auth />} />
          <Route element={<RequireAuth />}>
            <Route path='maps' element={<Layout />}>
              <Route path='MapLeafletDraw' element={<MapLeafletDraw />} />
              <Route path='MapLeafletGeoman' element={<MapLeafletGeoman />} />
              <Route path='MapReactLeaflet' element={<MapReactLeaflet />} />
              <Route path='MapMapbox' element={<MapMapbox />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
