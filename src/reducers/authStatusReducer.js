import produce from 'immer'


const initialState = {
  loading   : false,
  authorized: undefined,
  authError : null,
}

const authStatusReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'FETCH_AUTH_STATUS_BEGIN':
        draft.loading = true
        draft.authError = null
        break
      case 'FETCH_AUTH_STATUS_SUCCESS':
        draft.loading = false
        draft.authorized = action.authorized
        break
      case 'FETCH_AUTH_STATUS_FAILURE':
        draft.loading = false
        draft.authorized = action.authorized
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