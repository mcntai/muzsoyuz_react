import { call, apply, take, takeEvery, put, all } from 'redux-saga/effects'
import socket from '../../api/socket-api'
import { createConnectChannel, createNewMessageChannel, createNewConversationChannel } from '../channels/chatChannels'
import { ACTIONS as t } from '../../constants/action-types'
import { EVENTS as e } from '../../constants/socket-events'

function* connectSaga() {
  try {
    const channel = yield call(createConnectChannel, socket)
    while (true) {
      const { type, payload } = yield take(channel)
      yield put({ type, payload })
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

function* newConversationCreated() {
  const channel = yield call(createNewConversationChannel, socket)
  try {
    const { type, payload } = yield take(channel)
    yield put({ type, payload })
  } catch (e) {
    console.error('socket error:', e)
  }
}


function* createNewConversation({ participantId }) {
  try {
    yield apply(socket, socket.emit, [e.CREATE_CONVERSATION, participantId])
  } catch (e) {
    console.error('socket error:', e)
  }
}

function* watcher() {
  yield takeEvery(t.SEND_MESSAGE, newMessageSendSaga)
  yield takeEvery(t.CREATE_CONVERSATION, createNewConversation)
}

export default function* rootSaga() {
  yield all([
    connectSaga(),
    newMessageReceivedSaga(),
    newConversationCreated(),
    watcher()
  ])
}