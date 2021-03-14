import { combineReducers } from 'redux'
import userReducer from '../slice/user'
import offersReducer from '../slice/offers'
import generalReducer from '../slice/general'
import metaReducer from '../slice/meta'
import errorsReducer from './errorsReducer'


export default combineReducers({
  user   : userReducer,
  offers : offersReducer,
  general: generalReducer,
  meta   : metaReducer,
  errors : errorsReducer,
})