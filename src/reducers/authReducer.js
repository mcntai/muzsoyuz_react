import produce from 'immer'

const initialState = {
  authorized: undefined,
  authError: '',
}

const authReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'FETCH_AUTH_STATUS_SUCCESS':
        draft.authorized = action.payload
        break
      case 'FETCH_AUTH_STATUS_FAILURE':
        draft.authorized = false
        draft.authError = action.payload
        break
      default:
        return state
    }
  })
}

export default authReducer