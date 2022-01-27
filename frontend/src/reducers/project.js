import { createSlice } from '@reduxjs/toolkit'

import { API_URL } from '../utils/constants'

export const project = createSlice({
  name: 'project',
  initialState: {
    projectId: '',
    projectName: '',
    location: {
      type: 'Point',
      coordinates: [18.070742255316343, 59.32496507200476],
    },
    systemSize: '',
    systemAzimuth: '',
    systemInclination: '',
    pvgis: '',
  },
  reducers: {
    setProjectId: (state, action) => {
      state.projectId = action.payload
    },
    setLocation: (state, action) => {
      state.location.coordinates = action.payload
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
      state.pvgis = action.payload
    },
  },
})

export const calculateEnergy = () => {
  return (dispatch, getState) => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
      body: JSON.stringify({
        api: 'seriescalc', // seriescalc (for hourly data), PVcalc (for monthly data)
        duration: { startyear: 2016, endyear: 2016 },
        query: {
          lat: getState().project.location.coordinates[1],
          lon: getState().project.location.coordinates[0],
          raddatabase: 'PVGIS-ERA5',
          peakpower: getState().project.systemSize,
          pvtechchoice: 'crystSi',
          mountingplace: 'building',
          loss: 8,
          angle: getState().project.systemInclination,
          aspect: getState().project.systemAzimuth,
          pvcalculation: 1,
          outputformat: 'json',
        },
      }),
    }

    fetch(API_URL('pvgis'), options)
      .then((res) => res.json())
      .then((res) => {
        const production = res.outputs.hourly.map((hour) => hour.P)
        dispatch(project.actions.setPvgis(production))
        console.log(production)
      })
  }
}

export const saveProject = () => {
  return (dispatch, getState) => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
      body: JSON.stringify({
        project: { owner: getState().userId, ...getState().project },
      }),
    }
    console.log('seding create project', options)
    fetch(API_URL('project'), options)
      .then((res) => res.json())
      .then((res) => dispatch(project.actions.setProjectId(res.response._id)))
  }
}

export const getProject = () => {
  return (dispatch, getState) => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
      body: JSON.stringify({
        project: {},
      }),
    }

    fetch(API_URL('project'), options)
      .then((res) => res.json())
      .then((res) => dispatch(project.actions.setProjectId(res.response._id)))
  }
}
