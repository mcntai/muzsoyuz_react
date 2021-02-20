import { combineReducers } from 'redux'
import userReducer from '../slice/user'
import offersReducer from '../slice/offers'
import generalReducer from '../slice/general'
import errorsReducer from './errorsReducer'


export default combineReducers({
  user       : userReducer,
  offers     : offersReducer,
  general    : generalReducer,
  errors     : errorsReducer,
})