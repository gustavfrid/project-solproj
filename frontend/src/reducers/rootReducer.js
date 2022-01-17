import { combineReducers } from '@reduxjs/toolkit'

import { user } from './user'
import { ui } from './ui'

export const rootReducer = combineReducers({ user: user.reducer, ui: ui.reducer })
