import { createSlice } from '@reduxjs/toolkit'
import { batch } from 'react-redux'

import { API_URL } from '../utils/constants'
import { ui } from './ui'
import { hoursToDays, hoursToMonths, hoursToYear } from '../utils/dataHandlers'

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
  yearlyLoad: '',
  pvgis: '',
  load: '',
  price: '',
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
    setYearlyLoad: (state, action) => {
      state.yearlyLoad = action.payload
    },
    setPvgis: (state, action) => {
      state.pvgis = action.payload
    },
    setLoad: (state, action) => {
      state.load = action.payload
    },
    setPrice: (state, action) => {
      state.price = action.payload
    },
    reset: (state) => (state = initialState),
  },
})

export const calculateEnergy = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true))

    const pvgisOptions = {
      api: 'seriescalc', // seriescalc (for hourly data), PVcalc (for monthly data)
      duration: { startyear: 2015, endyear: 2015 },
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
    }

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
      body: JSON.stringify(pvgisOptions),
    }

    fetch(API_URL('pvgis'), options)
      .then((res) => res.json())
      .then((res) => {
        const hourlyData = res.data.hourly
        const dailyData = hoursToDays(hourlyData)
        const monthlyData = hoursToMonths(hourlyData)
        dispatch(project.actions.setPvgis({ hourly: hourlyData, daily: dailyData, monthly: monthlyData }))
        dispatch(ui.actions.setLoading(false))
      })
  }
}

export const getHourlyData = (name, type) => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true))

    const yearlyLoad = getState().project.yearlyLoad

    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
    }

    fetch(API_URL(`data/${name}`), options)
      .then((res) => res.json())
      .then((res) => {
        let hourlyData = res.data
        // load must be scaled with yearly electricity consumption, the response data is normalized to 1kWh/year
        if (type === 'loadProfile') {
          hourlyData = res.data.map((item) => item * yearlyLoad)
        }

        const dailyData = hoursToDays(hourlyData)
        const monthlyData = hoursToMonths(hourlyData)
        const yearlyData = hoursToYear(hourlyData)

        if (type === 'loadProfile') {
          dispatch(
            project.actions.setLoad({
              hourly: hourlyData,
              daily: dailyData,
              monthly: monthlyData,
              yearly: yearlyData,
            })
          )
        }
        if (type === 'spotPrice') {
          dispatch(project.actions.setPrice(hourlyData))
          console.log({ hourly: hourlyData })
        }

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
        project: { owner: getState().user.userId, ...getState().project, load: '' },
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
        project: { owner: getState().user.userId, ...getState().project, load: '' },
      }),
    }

    console.log('updateProject', options)
    fetch(API_URL(`project/${getState().user.userId}/${projectId}`), options)
      .then((res) => res.json())
      .then((res) => console.log('project saved', res))
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

    fetch(API_URL(`project/${getState().user.userId}/${projectId}`), options)
      .then((res) => res.json())
      .then((res) => {
        batch(() => {
          dispatch(project.actions.setProjectId(res.response._id))
          dispatch(project.actions.setLocation(res.response.location.coordinates))
          dispatch(project.actions.setProjectName(res.response.projectName))
          dispatch(project.actions.setSystemSize(res.response.systemSize))
          dispatch(project.actions.setSystemAzimuth(res.response.systemAzimuth))
          dispatch(project.actions.setSystemInclination(res.response.systemInclination))
          dispatch(project.actions.setYearlyLoad(res.response.yearlyLoad))
          dispatch(project.actions.setPvgis(res.response.pvgis))
        })
        dispatch(getHourlyData('townhouse', 'loadProfile'))
      })
  }
}

export const deleteProject = (projectId) => {
  return (dispatch, getState) => {
    const options = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
    }

    console.log('deleteProject', options)
    fetch(API_URL(`project/${getState().user.userId}/${projectId}`), options)
      .then((res) => res.json())
      .then((res) => console.log('project saved', res))
      .catch((err) => console.log(err))
  }
}
