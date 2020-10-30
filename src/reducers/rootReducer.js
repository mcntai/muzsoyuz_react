import { combineReducers } from "redux"
import getUserProfileReducer from './getUserProfileReducer'
import authStatusReducer from './authStatusReducer'
import checkRouteReducer from "./checkRouteReducer"


export default combineReducers({ getProfileReducer: getUserProfileReducer, authReducer: authStatusReducer, pageReducer: checkRouteReducer })