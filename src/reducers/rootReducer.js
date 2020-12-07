import { combineReducers } from 'redux'
import authStatusReducer from './authStatusReducer'
import checkRouteReducer from './checkRouteReducer'
import questionaryReducer from './questionaryReducer'


export default combineReducers({
  authReducer : authStatusReducer,
  pageReducer : checkRouteReducer,
  questReducer: questionaryReducer,
})