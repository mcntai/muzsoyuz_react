import { createSlice } from '@reduxjs/toolkit'
import loadExtraReducers from './utils/load-extra-reducers'
import { fetchUser, authenticateUser, getTokenAfterOauth } from '../actions/user'

// const loadWithContext = (context, reducers) => reducers.reduce(
//   (extraReducers, extraReducer) => ({
//     ...extraReducers,
//     ...loadExtraReducers(extraReducer, { context }),
//   }),
//   {}
// )

const userSlice = createSlice({
  name         : 'user',
  initialState : {
    profile: {}
  },
  reducers     : {
    cleanUser(state) {
      state.profile = {}
    }
  },
  extraReducers: {
    ...loadExtraReducers(fetchUser, { context: 'profile' }),
    ...loadExtraReducers(authenticateUser, { context: 'profile' }),
    ...loadExtraReducers(getTokenAfterOauth, { context: 'profile' }),
  }
})

export default userSlice.reducer

export const selectUser = state => state.user
export const selectProfile = state => state.user.profile
export const { cleanUser } = userSlice.actions