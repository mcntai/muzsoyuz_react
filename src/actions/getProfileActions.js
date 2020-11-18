import { MuzSoyuzRequest } from '../muzsoyuz-request'


export const fetchDataIfLoggedIn = () => {
  return async dispatch => {
    dispatch(fetchAuthStatusBegin())
    try {
      const response = await MuzSoyuzRequest.getUserProfile()

      // TODO: need to save user.id to redux or state or ls
      dispatch(fetchAuthStatusSuccess())
    }
    catch (error) {
      dispatch(fetchAuthStatusFailure(error.message))
    }
  }
}

const fetchAuthStatusBegin = () => ({
  type: 'FETCH_AUTH_STATUS_BEGIN',
})

export const fetchAuthStatusSuccess = () => ({
  type      : 'FETCH_AUTH_STATUS_SUCCESS',
  authorized: true,
})

export const fetchAuthStatusFailure = (error) => ({
  type     : 'FETCH_AUTH_STATUS_FAILURE',
  authError: { error },
})