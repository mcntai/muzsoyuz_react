import { MuzSoyuzRequest } from '../muzsoyuz-request'


export const fetchDataIfLoggedIn = () => {
  return async dispatch => {
    dispatch(fetchAuthStatusBegin())
    try {
      const response = await MuzSoyuzRequest.getUserProfile()

      if (response.role) {
        dispatch(fetchAuthStatusSuccess(response.role))
      } else if (response.role === null) {
        dispatch(fetchAuthStatusSuccess())
      }
    }
    catch (error) {
      dispatch(fetchAuthStatusFailure(error.message))
    }
  }
}

export const fetchAuthStatusBegin = () => ({
  type: 'FETCH_AUTH_STATUS_BEGIN',
})

export const fetchAuthStatusSuccess = (role) => ({
  type      : 'FETCH_AUTH_STATUS_SUCCESS',
  authorized: true,
  role      : role,
})

export const fetchAuthStatusFailure = (error) => ({
  type      : 'FETCH_AUTH_STATUS_FAILURE',
  authorized: false,
  authError : error,
})