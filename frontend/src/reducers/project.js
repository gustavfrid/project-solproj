import { createSlice } from '@reduxjs/toolkit'

export const project = createSlice({
  name: 'project',
  initialState: {
    position: { lat: 59.32496507200476, lng: 18.070742255316343 },
    projectName: '',
    systemSize: '',
    systemAzimuth: '',
    systemInclination: '',
  },
  reducers: {
    setPosition: (state, action) => {
      state.position = { ...action.payload }
    },
    setProjectName: (state, action) => {
      state.projectName = action.payload
    },
    setSystemSize: (state, action) => {
      state.systemSize = action.payload
    },
    setSystemAzimuth: (state, action) => {
      state.systemAzimuth = action.payload
    },
    setSystemInclination: (state, action) => {
      state.systemInclination = action.payload
    },
  },
})
