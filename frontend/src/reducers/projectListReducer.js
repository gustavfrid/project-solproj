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
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
      body: JSON.stringify({ userId: getState().user.userId }),
    }

    fetch(API_URL('project'), options)
      .then((res) => res.json())
      .then((res) => {
        dispatch(projectList.actions.setProjectList(res.response))
      })
      .catch((err) => console.log(err))
  }
}
