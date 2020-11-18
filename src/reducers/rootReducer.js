import { combineReducers } from 'redux'
import authStatusReducer from './authStatusReducer'
import checkRouteReducer from './checkRouteReducer'


export default combineReducers({
  authReducer: authStatusReducer,
  pageReducer: checkRouteReducer
})