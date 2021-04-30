import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app/App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './redux/reducers/rootReducer'
import rootSaga from './redux/saga/sagas'
import { MuzSoyuz } from './api/muzsoyuz'


const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer       : rootReducer,
  preloadedState: {},
  middleware    : [thunk.withExtraArgument({ api: MuzSoyuz }), sagaMiddleware],
  devTools      : true,
})

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
)
