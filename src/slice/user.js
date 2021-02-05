import { createSlice } from '@reduxjs/toolkit'
import loadExtraReducers from './utils/load-extra-reducers'
import { fetchUser, authenticateUser, getTokenAfterOauth, userProfileUpdate, setDaysOff } from '../actions/user'


const fulfilledReducer = (state, action) => {
  const param = Object.keys(action.payload).join()
  state[param] = Object.values(action.payload).join()
}

const fulfilledWorkdaysReducer = (state, action) => {
  state.dates = action.payload.dates
  state.dayOff = true
}

const userSlice = createSlice({
  name         : 'user',
  initialState : {
    profile: {},
    workdays: {dates: []}
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
    ...loadExtraReducers(userProfileUpdate, { context: 'profile', fulfilledReducer }),
    ...loadExtraReducers(setDaysOff, { context: 'workdays', fulfilledReducer: fulfilledWorkdaysReducer }),
  }
})

export default userSlice.reducer

export const selectUser = state => state.user
export const selectProfile = state => state.user.profile
export const { cleanUser } = userSlice.actions