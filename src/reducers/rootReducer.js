import {combineReducers} from "redux";
import getProfileReducer from './getProfileReducer'
import authReducer from './authReducer'


export default combineReducers({getProfileReducer, authReducer})