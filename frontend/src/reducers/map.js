import { createSlice } from '@reduxjs/toolkit'

export const map = createSlice({
  name: 'map',
  initialState: {},
  reducers: {
    setFeatureCollection: (state, action) => {
      state.loading = action.payload
    },
  },
})
