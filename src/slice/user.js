import { createSlice } from '@reduxjs/toolkit'
import loadExtraReducers from './utils/load-extra-reducers'
import {
  fetchUser,
  authenticateUser,
  authenticateAfterOauth,
  userProfileUpdate,
  setDayOff,
  getDaysOff
} from '../actions/user'
import { TYPES as t } from '../constants/action-types'


const INITIAL_STATE = {
  profile : {},
  workdays: { dates: [] },
  token   : localStorage.getItem('token'),
}

const fulfilledGetWorkDays = (state, action) => {
  state.dates = [...state.dates, ...action.payload]
}

const fulfilledSetWorkDays = (state, action) => {
  state.dates = [...state.dates, action.payload]
}

const logout = state => {
  localStorage.removeItem('token')

  state.loaded = false
  state.token = null
  state.nextLocation = null
  state.workdays = INITIAL_STATE.workdays
  state.profile = INITIAL_STATE.profile
}

const setNextLocation = (state, action) => {
  state.nextLocation = action.nextLocation
}

const resetNextLocation = (state) => {
  state.nextLocation = null
}

const userSlice = createSlice({
  name         : 'user',
  initialState : INITIAL_STATE,
  reducers     : {},
  extraReducers: {
    ...loadExtraReducers(fetchUser, { context: 'profile' }),
    ...loadExtraReducers(authenticateUser, { rejectedReducer: logout }),
    ...loadExtraReducers(authenticateAfterOauth, { context: 'profile' }),
    ...loadExtraReducers(userProfileUpdate, { context: 'profile' }),
    ...loadExtraReducers(setDayOff, { context: 'workdays', fulfilledReducer: fulfilledSetWorkDays }),
    ...loadExtraReducers(getDaysOff, { context: 'workdays', fulfilledReducer: fulfilledGetWorkDays }),
    [t.AUTH_SET_NEXT_LOCATION]: setNextLocation,
    [t.RESET_NEXT_LOCATION]   : resetNextLocation,
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