import { identity } from '../../utils/array'
import get from 'lodash/get'


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
      pendingReducer(state, action)
    }),
    [reducer.fulfilled]: contextWrapper(context, (state, action) => {
      state.loading = false
      state.loaded = true
      state.error = null
      fulfilledReducer(state, action)
    }),
    [reducer.rejected] : contextWrapper(context, (state, action) => {
      state.loading = false

      const e = action?.error

      state.error = Array.isArray(e?.message) ? e.message.join(', ') : e?.message
      rejectedReducer(state, action)
    }),
  }
}