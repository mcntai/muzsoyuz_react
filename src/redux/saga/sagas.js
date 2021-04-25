import { call, apply, take, takeEvery, put, all, fork } from 'redux-saga/effects'
import socket from '../../api/socket-api'
import {
  createConnectChannel,
  createNewMessageChannel,
  createNewConversationChannel,
  createUserIsActiveChannel, typingStatusChannel, typingStartedChannel, typingFinishedChannel
} from '../channels/chatChannels'
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

function* isUserActive() {
  const channel = yield call(createUserIsActiveChannel, socket)
  try {
    const { type, payload } = yield take(channel)
    yield put({ type, payload })
  } catch (e) {
    console.error('socket error:', e)
  }
}

function* handleTypingStart({ chatId }) {
  try {
    yield apply(socket, socket.emit, [e.TYPING_START, chatId])
  } catch (e) {
    console.error('socket error:', e)
  }
}

function* handleTypingEnd({ chatId }) {
  try {
    yield apply(socket, socket.emit, [e.TYPING_END, chatId])
  } catch (e) {
    console.error('socket error:', e)
  }
}

function* handleTypingStatus() {
  const channel = yield call(typingStatusChannel, socket)

  while (true) {
    try {
      const { type, payload } = yield take(channel)
      yield put({ type, payload })
    } catch (e) {
      console.error('socket error:', e)
    }
  }
}

function* watcher() {
  yield takeEvery(t.SEND_MESSAGE, newMessageSendSaga)
  yield takeEvery(t.CREATE_CONVERSATION, createNewConversation)
  yield takeEvery(t.TYPING_START, handleTypingStart)
  yield takeEvery(t.TYPING_END, handleTypingEnd)
}

export default function* rootSaga() {
  yield all([
    connectSaga(),
    newMessageReceivedSaga(),
    newConversationCreated(),
    isUserActive(),
    handleTypingStatus(),
    watcher()
  ])
}