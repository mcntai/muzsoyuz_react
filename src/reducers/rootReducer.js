import { combineReducers } from 'redux'
import checkRouteReducer from './checkRouteReducer'
import userReducer from '../slice/user'
import offersReducer from '../slice/offers'
import generalReducer from '../slice/general'
import errorsReducer from './errorsReducer'


export default combineReducers({
  pageReducer: checkRouteReducer,
  user       : userReducer,
  offers     : offersReducer,
  general    : generalReducer,
  errors     : errorsReducer,
})