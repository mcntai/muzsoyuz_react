import { createSlice } from '@reduxjs/toolkit'
import loadExtraReducers from "./utils/load-extra-reducers"
import { fetchRoles } from "../actions/meta"
import keyBy from 'lodash/keyBy'

const fulfilledReducer = (state, action) => {
  state.data = keyBy(action.payload, 'name')
}

const metaSlice = createSlice({
  name         : 'meta',
  initialState : {
    roles: { data: {} }
  },
  reducers     : {},
  extraReducers: {...loadExtraReducers(fetchRoles, {context: 'roles', fulfilledReducer})}
})

export default metaSlice.reducer
export const selectRoles = state => state.meta.roles