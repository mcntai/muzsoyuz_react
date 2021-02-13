import { identity } from '../../utils/array'
import { STAGES } from './constants'
import get from 'lodash/get'
import { store } from '../../index'


const defaultFulfilledReducer = (state, action) => {
  Object.assign(state, action.payload)
}

const contextWrapper = (context, reducer) => (state, action) => {
  return reducer(context ? get(state, context) : state, action)
}

export default function loadExtraReducers(reducer, extra) {
  const {
    fulfilledReducer = defaultFulfilledReducer,
    pendingReducer = identity,
    rejectedReducer = identity,
    context,
  } = extra || {}

  return {
    [reducer.pending]  : contextWrapper(context, (state, action) => {
      state.loading = true
      state.loaded = false
      state.error = null
      state.status = STAGES.PENDING
      pendingReducer(state, action)
    }),
    [reducer.fulfilled]: contextWrapper(context, (state, action) => {
      state.loading = false
      state.loaded = true
      state.error = null
      state.status = STAGES.SUCCESS
      fulfilledReducer(state, action)
    }),
    [reducer.rejected] : contextWrapper(context, (state, action) => {
      state.loading = false
      state.loaded = true
      state.status = STAGES.FAILED

      state.error = action?.error?.message || action?.error
      rejectedReducer(state, action)
    }),
  }
}