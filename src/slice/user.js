import { createSlice } from '@reduxjs/toolkit'
import loadExtraReducers from './utils/load-extra-reducers'
import {
  fetchUser,
  authenticateUser,
  authenticateAfterOauth,
  userProfileUpdate,
  setDayOff,
  getDaysOff, deleteDayOff
} from '../actions/user'
import { TYPES as t } from '../constants/action-types'
import keyBy from 'lodash/keyBy'


const INITIAL_STATE = {
  profile: {},
  daysOff: {
    map : {},
    list: [],
  },
  token  : localStorage.getItem('token'),
}

const fulfilledGetDaysOff = (state, action) => {
  state.map = keyBy(action.payload, '_id')
  state.list = action.payload.map(item => item._id)
}

const fulfilledSetDayOff = (state, action) => {
  Object.assign(state.map, { [action.payload._id]: action.payload })
  state.list = [...state.list, action.payload._id]
}

const pendingDeleteDayOff = (state, action) => {
  state.list = state.list.filter(id => id !== action.meta.arg)
}

const fulfilledDeleteDayOff = (state, action) => {
  delete state.map[action.meta.arg]
}

const rejectedDeleteDayOff = (state, action) => {
  state.list = [...state.list, action.meta.arg]
}

const logout = state => {
  localStorage.removeItem('token')

  state.loaded = false
  state.token = null
  state.nextLocation = null
  state.daysOff = INITIAL_STATE.daysOff
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
    ...loadExtraReducers(fetchUser, {
      context: 'profile'
    }),
    ...loadExtraReducers(authenticateUser, {
      rejectedReducer: logout
    }),
    ...loadExtraReducers(authenticateAfterOauth, {
      context: 'profile'
    }),
    ...loadExtraReducers(userProfileUpdate, {
      context: 'profile'
    }),
    ...loadExtraReducers(setDayOff, {
      context         : 'daysOff',
      fulfilledReducer: fulfilledSetDayOff
    }),
    ...loadExtraReducers(getDaysOff, {
      context         : 'daysOff',
      fulfilledReducer: fulfilledGetDaysOff
    }),
    ...loadExtraReducers(deleteDayOff, {
      context         : 'daysOff',
      pendingReducer  : pendingDeleteDayOff,
      fulfilledReducer: fulfilledDeleteDayOff,
      rejectedReducer : rejectedDeleteDayOff
    }),
    [t.AUTH_SET_NEXT_LOCATION]: setNextLocation,
    [t.RESET_NEXT_LOCATION]   : resetNextLocation,
  }
})

export default userSlice.reducer

export const selectUser = state => state.user
export const selectProfile = arg => state => state.user.profile[arg]
export const selectDaysOff = state => state.user.daysOff