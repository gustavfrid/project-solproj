import { applyMiddleware, compose, createStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { rootReducer } from '../reducers/rootReducer'

export const setupStore = preloadedState => {
  const composedEnhancers =
    (process.env.NODE_ENV !== 'production' &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose
  const store = createStore(
    rootReducer,
    // preloadedState, //if persisted state, not so stable...
    composedEnhancers(applyMiddleware(thunkMiddleware))
  )

  return store
}
