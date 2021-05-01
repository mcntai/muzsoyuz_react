import { ACTIONS as p, ACTIONS as t } from '../../constants/action-types'
import apiAction from './api-action'
import history from '../../history/history'
import { ROUTES as r } from '../../constants/routes'

const ROOT_PATH = '/'

export const logout = error => dispatch => {
  dispatch({ ...authenticateUser.rejected, error })

  document.location.reload()
}

export const goToLogin = () => () => {
  history.push(r.LOGIN)
}

export const goToHomePage = () => dispatch => {
  history.push(r.HOME)
  dispatch({ type: t.RESET_NEXT_LOCATION })
}

export const goTo = routeName => () => {
  history.push(routeName)
}

export const goBack = () => () => {
  history.goBack()
}

export const navigateToNextLocation = () => (dispatch, getState) => {
  const nextLocation = getState().user.nextLocation || ROOT_PATH

  const userProfile = getState().user.profile

  history.push(userProfile.role === null ? r.START_ROUTE : nextLocation)
}

export const setAuthNextLocation = (nextLocation) => ({
  type: t.AUTH_SET_NEXT_LOCATION,
  nextLocation,
})

const finalizeAuthentication = response => dispatch => {
  localStorage.setItem('token', response.token)

  dispatch({ ...authenticateUser.fulfilled, payload: response })

  dispatch(navigateToNextLocation())
}

export const fetchUser = apiAction(
  p.USER_FETCH,
  (_, thunkAPI) => thunkAPI.extra.api.getUserProfile()
)

export const authenticateUser = apiAction(
  p.USER_AUTH,
  async ({ route, body }, thunkAPI) => {
    const response = await thunkAPI.extra.api.makeAuthentication(route, body)

    thunkAPI.dispatch(finalizeAuthentication(response))
  }
)

export const authenticateAfterOauth = apiAction(
  p.USER_OAUTH,
  async ({ provider, query }, thunkAPI) => {
    const response = await thunkAPI.extra.api.getTokenAfterSocialOauth(provider, query)

    thunkAPI.dispatch(finalizeAuthentication(response))
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

export const setDayOff = apiAction(
  p.USER_SET_DAY_OFF,
  (day, thunkAPI) => {
    return thunkAPI.extra.api.setDayOff(day)
  }
)

export const deleteDayOff = apiAction(
  p.USER_DELETE_DAY_OFF,
  (id, thunkAPI) => {
    return thunkAPI.extra.api.deleteDayOff(id)
  }
)

export const updateImage = apiAction(
  p.USER_UPDATE_IMAGE,
  ({ formData, fileType, width, height, x, y }, thunkAPI) => {
    return thunkAPI.extra.api.updateImage(formData, fileType, width, height, x, y)
  }
)



