import { ACTION_PREFIXES as p, TYPES as t } from '../constants/action-types'
import apiAction from './api-action'
import history from '../history/history'

const ROOT_PATH = '/'

export const logout = error => dispatch => {
  dispatch({ type: authenticateUser.rejected.type, error })
}

export const goToLogin = () => () => {
  history.push('/login')
}

export const navigateToNextLocation = () => (dispatch, getState) => {
  const nextLocation = getState().user.nextLocation || ROOT_PATH

  history.push(nextLocation)
}

export const setAuthNextLocation = (nextLocation) => ({
  type: t.AUTH_SET_NEXT_LOCATION,
  nextLocation,
})

export const fetchUser = apiAction(
  p.USER_FETCH,
  (_, thunkAPI) => thunkAPI.extra.api.getUserProfile()
)

export const authenticateUser = apiAction(
  p.USER_AUTH,
  async({ route, body }, thunkAPI) => {
    const response = await thunkAPI.extra.api.makeAuthentication(route, body)

    localStorage.setItem('token', response.token)

    thunkAPI.dispatch({
      type: authenticateUser.fulfilled.type,
      payload: response,
    })

    thunkAPI.dispatch(navigateToNextLocation())
  }
)

export const getTokenAfterOauth = apiAction(
  p.USER_OAUTH,
  async({ provider, query }, thunkAPI) => {
    const response = await thunkAPI.extra.api.getTokenAfterSocialOauth(provider, query)

    localStorage.setItem('token', response.token)

    thunkAPI.dispatch(navigateToNextLocation())

    return response
  }
)

export const userProfileUpdate = apiAction(
  p.USER_PROFILE_UPDATE,
  ({ name, phone, role, yearCommercialExp }, thunkAPI) => {
    return thunkAPI.extra.api.makeProfileUpdate({ name, phone, role, yearCommercialExp })
  }
)

export const getDaysOff = apiAction(
  p.USER_GET_DAYS_OFF,
  (_, thunkAPI) => thunkAPI.extra.api.getDaysOff(),
)

export const setDaysOff = apiAction(
  p.USER_SET_DAYS_OFF,
  ({ dates, dayOff }, thunkAPI) => {
    return thunkAPI.extra.api.setDaysOff({ dates, dayOff })
  }
)

