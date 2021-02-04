import { combineReducers } from 'redux'
import checkRouteReducer from './checkRouteReducer'
import questionaryReducer from './questionaryReducer'
import userReducer from '../slice/user'
import offersReducer from '../slice/offers'


export default combineReducers({
  pageReducer : checkRouteReducer,
  questReducer: questionaryReducer,
  user        : userReducer,
  offers      : offersReducer,
})