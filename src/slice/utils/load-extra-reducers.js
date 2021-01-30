import { identity } from "../../utils/array"

const defaultFulfilledReducer = (state, action) => {
  Object.assign(state, action.payload)
}

export default function loadExtraReducers(reducer, customReducers) {
  const {
    fulfilledReducer = defaultFulfilledReducer,
    pendingReducer = identity,
    rejectedReducer = identity,
  } = customReducers || {}

  return {
    [reducer.pending]  : (state, action) => {
      state.loading = true
      state.loaded = false
      state.error = null
      pendingReducer(state, action)
    },
    [reducer.fulfilled]: (state, action) => {
      state.loading = false
      state.loaded = true
      state.error = null
      fulfilledReducer(state, action)
    },
    [reducer.rejected] : (state, action) => {
      state.loading = false
      state.loaded = true

      const e = action?.error

      state.error = Array.isArray(e.message) ? e.message.join(', ') : e.message
      rejectedReducer(state, action)
    },
  }
}