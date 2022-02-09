import { createSlice } from '@reduxjs/toolkit'
import { batch } from 'react-redux'

import { API_URL } from '../utils/constants'
import { ui } from './ui'
import { hoursToDays, hoursToMonths, hoursToYear } from '../utils/dataHandlers'

const initialState = {
  projectId: 'new',
  projectName: '',
  location: [18.070742255316343, 59.32496507200476],
  mapStyle: 'mapbox://styles/mapbox/satellite-v9',
  viewState: {
    longitude: 18.070742255316343,
    latitude: 59.32496507200476,
    zoom: 17,
  },
  systemSize: '',
  systemAzimuth: '',
  systemInclination: '',
  yearlyLoad: '',
  loadProfile: 'townhouse',
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
      state.location = action.payload
    },
    setViewState: (state, action) => {
      state.viewState = action.payload
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
    setLoadProfile: (state, action) => {
      state.loadProfile = action.payload
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

export const calculateEnergy = (projectData) => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true))

    const pvgisOptions = {
      api: 'seriescalc', // seriescalc (for hourly data), PVcalc (for monthly data)
      duration: { startyear: 2015, endyear: 2015 },
      query: {
        lon: projectData.location[0],
        lat: projectData.location[1],
        raddatabase: 'PVGIS-ERA5',
        peakpower: projectData.systemSize,
        pvtechchoice: 'crystSi',
        mountingplace: 'building',
        loss: 8,
        angle: projectData.systemInclination,
        aspect: projectData.systemAzimuth,
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
        const hourly = res.data.hourly.map((v) => v / 1000) // convert from wh to kWh
        const daily = hoursToDays(hourly)
        const monthly = hoursToMonths(hourly)
        const yearly = hoursToYear(hourly)
        dispatch(project.actions.setPvgis({ hourly, daily, monthly, yearly }))
        if (projectData.action === 'new') dispatch(createProject())
        if (projectData.action === 'update') dispatch(updateProject(projectData.id))
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
    // TODO: kolla ignenom och se varför förbrukingen ligger 1000
    fetch(API_URL(`data/${name}`), options)
      .then((res) => res.json())
      .then((res) => {
        let hourly = res.data
        // load must be scaled with yearly electricity consumption, the response data is normalized to 1kWh/year
        if (type === 'loadProfile') hourly = res.data.map((item) => item * yearlyLoad)
        if (type === 'loadProfile' && name === 'domestic') hourly = res.data.map((item) => (item * yearlyLoad) / 1000)

        const daily = hoursToDays(hourly)
        const monthly = hoursToMonths(hourly)
        const yearly = hoursToYear(hourly)

        if (type === 'loadProfile') {
          dispatch(
            project.actions.setLoad({
              hourly,
              daily,
              monthly,
              yearly,
            })
          )
        }
        if (type === 'spotPrice') {
          dispatch(project.actions.setPrice(hourly.map((v) => (v * 10) / 1000))) // converting from eur/MWh to kr/kWh
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
        project: { owner: getState().user.userId, ...getState().project, load: '', price: '' },
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
        project: { owner: getState().user.userId, ...getState().project, load: '', price: '' },
      }),
    }

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
          dispatch(project.actions.setLocation(res.response.location))
          dispatch(project.actions.setProjectName(res.response.projectName))
          dispatch(project.actions.setSystemSize(res.response.systemSize))
          dispatch(project.actions.setSystemAzimuth(res.response.systemAzimuth))
          dispatch(project.actions.setSystemInclination(res.response.systemInclination))
          dispatch(project.actions.setYearlyLoad(res.response.yearlyLoad))
          dispatch(project.actions.setLoadProfile(res.response.loadProfile))
          dispatch(project.actions.setPvgis(res.response.pvgis))
          dispatch(getHourlyData(res.response.loadProfile, 'loadProfile'))
        })
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
