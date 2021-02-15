import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app/App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import { MuzSoyuzRequest } from './muzsoyuz-request'

export const store = configureStore({
  reducer       : rootReducer,
  preloadedState: {},
  middleware    : [thunk.withExtraArgument({ api: MuzSoyuzRequest })],
  devTools      : true,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
