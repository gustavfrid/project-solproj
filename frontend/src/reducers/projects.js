import { createSlice } from '@reduxjs/toolkit'

import { API_URL } from '../utils/constants'

export const projectList = createSlice({
  name: 'projectList',
  initialState: { projectList: [] },
  reducers: {
    setProjectList: (state, action) => {
      state.projectList = action.payload
    },
  },
})

export const getProjectList = () => {
  return (dispatch, getState) => {
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
    }

    fetch(API_URL('project'), options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        dispatch(projectList.actions.setProjectList(res.response))
      })
  }
}
