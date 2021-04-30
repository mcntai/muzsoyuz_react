import { createAsyncThunk } from '@reduxjs/toolkit'
import {  logout } from "./user"

const UNAUTHORIZED = 401

export default function apiAction(typePrefix, payloadCreator) {
  return createAsyncThunk(typePrefix, (body, thunkAPI) => {
    const state = thunkAPI.getState()

    thunkAPI.extra.api.methods.forEach(method => {
      const apiCall = thunkAPI.extra.api[method]

      thunkAPI.extra.api[method] = (...args) => {
        const request = apiCall.apply(thunkAPI.extra.api, args)

        return state.user.token
          ? request.setToken(state.user.token)
          : request
      }
    })

    return payloadCreator(body, thunkAPI)
      .catch(error => {
        const status = error.error?.statusCode || error.status

        if (status === UNAUTHORIZED) {
          thunkAPI.dispatch(logout(error))
        }

        throw error
      })
  })
}