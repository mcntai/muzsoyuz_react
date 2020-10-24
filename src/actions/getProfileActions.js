import { MuzSoyuzRequest } from '../muzsoyuz-request'

export const fetchDataIfLoggedIn = () => {
  return async dispatch => {
    dispatch(fetchLoginStatusBegin())
    try {
      const response = await MuzSoyuzRequest.get('/user/profile')
        .sendToken()

      if (!response.statusCode || response.statusCode < 400) {
        dispatch(fetchLoginStatusSuccess())
      } else {
        dispatch(fetchLoginStatusFailure(response.message))
      }
    } catch (error) {
      dispatch(fetchLoginStatusFailure(error.message))
    }
  }
}


const fetchLoginStatusBegin = () => ({
  type: 'FETCH_LOGIN_STATUS_BEGIN',
})

const fetchLoginStatusSuccess = () => ({
  type: 'FETCH_LOGIN_STATUS_SUCCESS',
  payload: true,
})

const fetchLoginStatusFailure = error => ({
  type: 'FETCH_LOGIN_STATUS_FAILURE',
  payload: { error },
})