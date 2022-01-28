import { combineReducers } from '@reduxjs/toolkit'

import { user } from './user'
import { ui } from './ui'
import { project } from './projectReducer'
import { projectList } from './projects'
import { map } from './map'

export const rootReducer = combineReducers({
  user: user.reducer,
  ui: ui.reducer,
  project: project.reducer,
  map: map.reducer,
  projectList: projectList.reducer,
})
