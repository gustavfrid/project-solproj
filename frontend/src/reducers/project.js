import { createSlice } from '@reduxjs/toolkit'

import { API_URL } from '../utils/constants'

export const project = createSlice({
  name: 'project',
  initialState: {
    position: { lat: 59.32496507200476, lng: 18.070742255316343 },
    projectName: '',
    systemSize: '',
    systemAzimuth: '',
    systemInclination: '',
    pvgis: '',
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
    setPvgis: (state, action) => {
      state.pvgis = { ...action.payload }
    },
  },
})

export const calculateEnergy = query => {
  return dispatch => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
      }),
    }

    fetch(API_URL('pvgis'), options)
      .then(res => res.json())
      .then(res => {
        dispatch(project.actions.setPvgis({ energy: '100' }))
        console.log(res)
      })
  }
}
