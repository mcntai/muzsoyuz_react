import produce from 'immer'

const initialState = {
  authorized: undefined,
  authError: '',
}

const authStatusReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'FETCH_AUTH_STATUS_SUCCESS':
        draft.authorized = action.authorized
        break
      case 'FETCH_AUTH_STATUS_FAILURE':
        draft.authorized = false
        draft.authError = action.authError
        break
      case 'LOGOUT':
        draft.authorized = false
        break
      default:
        return state
    }
  })
}

export default authStatusReducer