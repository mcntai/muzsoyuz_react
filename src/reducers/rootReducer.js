import { combineReducers } from 'redux'
import authStatusReducer from './authStatusReducer'
import checkRouteReducer from './checkRouteReducer'
import questionaryReducer from './questionaryReducer'
import filterReducer from './filterReducer'
import userReducer from '../slice/user'
import offersReducer from '../slice/offers'


export default combineReducers({
  authReducer : authStatusReducer,
  pageReducer : checkRouteReducer,
  questReducer: questionaryReducer,
  filterReducer,
  user        : userReducer,
  offers      : offersReducer,
})