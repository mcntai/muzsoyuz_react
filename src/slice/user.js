import { createSlice } from '@reduxjs/toolkit'
import loadExtraReducers from './utils/load-extra-reducers'
import { addHours, trimTime } from '../utils/date'
import {
  fetchUser,
  authenticateUser,
  getTokenAfterOauth,
  userProfileUpdate,
  setDaysOff,
  getDaysOff
} from '../actions/user'


const fulfilledProfileUpdateReducer = (state, action) => {
  const param = Object.keys(action.payload).join()
  state[param] = Object.values(action.payload).join()
}

const fulfilledGetWorkDays = (state, action) => {
  state.dates = action.payload.map(day => day.date)
}

const fulfilledSetWorkDays = (state, action) => {
  action.payload.dayOff === true
  ? state.dates = [...state.dates, action.payload.dates]
  : state.dates = state.dates.filter(date => date !== addHours(trimTime(action.payload.dates), 2).toISOString())
}

const userSlice = createSlice({
  name         : 'user',
  initialState : {
    profile : {},
    workdays: { dates: [] }
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
    ...loadExtraReducers(userProfileUpdate, { context: 'profile', fulfilledReducer: fulfilledProfileUpdateReducer }),
    ...loadExtraReducers(setDaysOff, { context: 'workdays', fulfilledReducer: fulfilledSetWorkDays }),
    ...loadExtraReducers(getDaysOff, { context: 'workdays', fulfilledReducer: fulfilledGetWorkDays }),
  }
})

export default userSlice.reducer

export const selectUser = state => state.user
export const selectUserImage = state => state.user.profile.imageURL
export const selectUserName = state => state.user.profile.name
export const selectUserRole = state => state.user.profile.role
export const selectUserPhone = state => state.user.profile.phone
export const selectProfile = state => state.user.profile
export const selectWorkDays = state => state.user.workdays
export const { cleanUser } = userSlice.actions