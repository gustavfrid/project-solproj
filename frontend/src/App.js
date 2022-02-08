import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './Theme'
import { setupSimpleStore } from './store/setupStore'
import { RequireAuth } from './components/Auth/RequireAuth'
import { Start } from './components/Start'
import { Auth } from './components/Auth/Auth'
import { NotFound } from './components/NotFound'
import { Layout } from './components/Layout/Layout'
import { ProjectEditor } from './components/ProjectEditor/ProjectEditor'
import { ProjectList } from './components/ProjectList'
import { LoadingProject } from './components/ProjectEditor/LoadingProject'

// Retrieve localstorage as initial state
// const persistedStateJSON = localStorage.getItem('solprojReduxState')
// let persistedState = {}

// if (persistedStateJSON) {
//   persistedState = JSON.parse(persistedStateJSON)
// }

const store = setupSimpleStore //setupStore(persistedState)

// Store the state in localstorage when Redux state change
// store.subscribe(() => {
//   localStorage.setItem('solprojReduxState', JSON.stringify(store.getState()))
// })

export const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Start />} />
            <Route path='/login' element={<Auth />} />
            <Route element={<RequireAuth />}>
              <Route path='main' element={<Layout />}>
                <Route path='projects' element={<ProjectList />} />
                <Route path='projects/:id' element={<ProjectEditor />} />
                <Route path='projects/loading' element={<LoadingProject />} />
              </Route>
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  )
}
