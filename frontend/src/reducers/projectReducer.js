import { createSlice } from '@reduxjs/toolkit'
import { batch } from 'react-redux'

import { API_URL } from '../utils/constants'
import { ui } from './ui'

const initialState = {
  projectId: 'new',
  projectName: '',
  location: {
    type: 'Point',
    coordinates: [18.070742255316343, 59.32496507200476],
  },
  systemSize: '',
  systemAzimuth: '',
  systemInclination: '',
  pvgis: '',
}

export const project = createSlice({
  name: 'project',
  initialState: initialState,
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
    reset: (state) => (state = initialState),
    // setProjectFromDb: (state, action) => {
    //   console.log('[setProjectFromDb]: ', action.payload)
    //   state = { ...action.payload }
    // },
  },
})

export const calculateEnergy = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true))
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
        dispatch(ui.actions.setLoading(false))
      })
  }
}

export const createProject = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
      body: JSON.stringify({
        project: { owner: getState().user.userId, ...getState().project },
      }),
    }

    fetch(API_URL('project/new'), options)
      .then((res) => res.json())
      .then((res) => {
        dispatch(project.actions.setProjectId(res.response._id))
        dispatch(ui.actions.setLoading(false))
      })
  }
}

export const updateProject = (projectId) => {
  return (dispatch, getState) => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
      body: JSON.stringify({
        project: { owner: getState().user.userId, ...getState().project },
      }),
    }
    console.log('reducer updateProject, options', options)
    fetch(API_URL(`project/${getState().user.userId}/${projectId}`), options)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
}

export const getProject = (projectId) => {
  return (dispatch, getState) => {
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
    }
    console.log(options)

    fetch(API_URL(`project/${getState().user.userId}/${projectId}`), options)
      .then((res) => res.json())
      .then((res) => {
        console.log('[getProject]: ', res.response)
        batch(() => {
          dispatch(project.actions.setProjectId(res.response._id))
          dispatch(project.actions.setLocation(res.response.location.coordinates))
          dispatch(project.actions.setProjectName(res.response.projectName))
          dispatch(project.actions.setSystemSize(res.response.systemSize))
          dispatch(project.actions.setSystemAzimuth(res.response.systemAzimuth))
          dispatch(project.actions.setSystemInclination(res.response.systemInclination))
          dispatch(project.actions.setPvgis(res.response.pvgis))
        })
      })
  }
}
