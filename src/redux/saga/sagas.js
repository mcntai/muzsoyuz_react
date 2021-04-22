import { call, apply, take, takeEvery, put, all } from 'redux-saga/effects'
import socket from '../../api/socket-api'
import { createConnectChannel, createNewMessageChannel } from '../channels/chatChannels'
import { ACTIONS as t } from '../../constants/action-types'

function* connectSaga() {
  try {
    const channel = yield call(createConnectChannel, socket)
    while (true) {
      const { type, payload } = yield take(channel)
      yield put({ type, payload })
      console.log(payload)
    }
  } catch (e) {
    console.error('socket error:', e)
  }
}

function* newMessageReceivedSaga() {
  const channel = yield call(createNewMessageChannel, socket)

  while (true) {
    try {
      const { type, payload } = yield take(channel)
      yield put({ type, payload })
    } catch (e) {
      console.error('socket error:', e)
    }
  }
}

function* newMessageSendSaga({ message }) {
  try {
    yield apply(socket, socket.send, [message])
  } catch (e) {
    console.error('socket error:', e)
  }
}

function* watchMessageSend() {
  yield takeEvery(t.SEND_MESSAGE, newMessageSendSaga)
}

export default function* rootSaga() {
  yield all([
    connectSaga(),
    newMessageReceivedSaga(),
    watchMessageSend()
  ])
}