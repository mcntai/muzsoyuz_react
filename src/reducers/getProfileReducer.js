import produce from 'immer'

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
}

const getProfileReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'FETCH_LOGIN_STATUS_BEGIN':
        draft.loading = true
        draft.error = null
        break
      case 'FETCH_LOGIN_STATUS_SUCCESS':
        draft.loading = false
        draft.isLoggedIn = action.payload
        break
      case 'FETCH_LOGIN_STATUS_FAILURE':
        draft.loading = false
        draft.error = action.payload.error
        break
      case 'LOGOUT':
        draft.isLoggedIn = action.payload
        break
      default:
        return state
    }
  })
}

export default getProfileReducer