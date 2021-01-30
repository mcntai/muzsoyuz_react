import { createSlice } from '@reduxjs/toolkit'
import loadExtraReducers from './utils/load-extra-reducers'
import { makeOffer } from '../actions/offers'
import { STAGES } from './utils/constants'


const fulfilledReducer = (state, action) => {
  state.status = STAGES.SUCCESS
  state[action.type] = {}
  Object.assign(state[action.type], action.payload)
}

const rejectedReducer = state => {
  state.status = STAGES.FAILED
}

const offersSlice = createSlice({
  name         : 'offers',
  initialState : {},
  reducers     : {},
  extraReducers: {
    ...loadExtraReducers(makeOffer, {
      fulfilledReducer,
      rejectedReducer,
    })
  }
})

export default offersSlice.reducer

export const selectOffer = state => state.offers
export const { } = offersSlice.actions