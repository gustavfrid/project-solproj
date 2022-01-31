import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  username: null,
  accessToken: null,
  error: null,
  loading: false,
}

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    setLoading: (store, action) => {
      store.loading = action.payload
    },
    reset: (state) => (state = initialState),
  },
})
