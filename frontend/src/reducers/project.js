import { createSlice } from '@reduxjs/toolkit'

export const project = createSlice({
  name: 'project',
  initialState: {
    position: { lat: 59.32496507200476, lng: 18.070742255316343 },
    name: '',
  },
  reducers: {
    setPosition: (state, action) => {
      state.position = { ...action.payload }
    },
  },
})
