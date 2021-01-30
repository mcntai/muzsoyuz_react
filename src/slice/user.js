import { createSlice } from '@reduxjs/toolkit'
import loadExtraReducers from './utils/load-extra-reducers'
import { fetchUser, authenticateUser, getTokenAfterOauth } from '../actions/user'
import { STAGES } from './utils/constants'


const fulfilledReducer = (state, action) => {
  state.status = STAGES.SUCCESS
  Object.assign(state, action.payload)
}

const rejectedReducer = state => {
  state.status = STAGES.FAILED
}

const userSlice = createSlice({
  name         : 'user',
  initialState : {},
  reducers     : {
    cleanUser(state) {
      return state = {}
    }
  },
  extraReducers: {
    ...loadExtraReducers(fetchUser, {
      fulfilledReducer,
      rejectedReducer,
    }),
    ...loadExtraReducers(authenticateUser),
    ...loadExtraReducers(getTokenAfterOauth)
  }
})

export default userSlice.reducer

export const selectUser = state => state.user
export const { cleanUser } = userSlice.actions