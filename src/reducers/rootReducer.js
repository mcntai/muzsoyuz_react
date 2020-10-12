import { combineReducers } from "redux"
import getProfileReducer from './getProfileReducer'
import authReducer from './authReducer'
import pageReducer from "./pageReducer"


export default combineReducers({ getProfileReducer, authReducer, pageReducer })