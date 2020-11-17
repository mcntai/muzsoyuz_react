import { MuzSoyuzRequest } from '../muzsoyuz-request'


export const fetchDataIfLoggedIn = () => {
  return async dispatch => {
    dispatch(fetchAuthStatusBegin())
    try {
      const response = await MuzSoyuzRequest.getUserProfile()

      if(!response.statusCode || response.statusCode < 400) {
        dispatch(fetchAuthStatusSuccess())
      } else {
        dispatch(fetchAuthStatusFailure(response.message))
      }
    }
    catch(error) {
      dispatch(fetchAuthStatusFailure(error.message))
    }
  }
}

const fetchAuthStatusBegin = () => ({
  type: 'FETCH_AUTH_STATUS_BEGIN',
})

export const fetchAuthStatusSuccess = () => ({
  type: 'FETCH_AUTH_STATUS_SUCCESS',
  authorized: true,
})

export const fetchAuthStatusFailure = (error) => ({
  type: 'FETCH_AUTH_STATUS_FAILURE',
  authError: { error },
})