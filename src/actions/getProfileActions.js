import { MuzSoyuzRequest } from '../muzsoyuz-request'


export const fetchDataIfLoggedIn = () => {
  return async dispatch => {
    dispatch(fetchAuthStatusBegin())
    try {
      await MuzSoyuzRequest.getUserProfile()

      dispatch(fetchAuthStatusSuccess())
    }
    catch (error) {
      dispatch(fetchAuthStatusFailure(error.message))
    }
  }
}

export const fetchAuthStatusBegin = () => ({
  type: 'FETCH_AUTH_STATUS_BEGIN',
})

export const fetchAuthStatusSuccess = () => ({
  type      : 'FETCH_AUTH_STATUS_SUCCESS',
  authorized: true,
})

export const fetchAuthStatusFailure = (error) => ({
  type     : 'FETCH_AUTH_STATUS_FAILURE',
  authorized: false,
  authError: { error },
})