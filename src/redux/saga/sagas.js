import { call, apply, takeEvery, put, all, take, select } from 'redux-saga/effects'
import {
  createConnectChannel,
  createNewMessageChannel,
  createNewConversationChannel,
  createUserIsActiveChannel, typingStatusChannel,
} from '../channels/chatChannels'
import { ACTIONS as t, fulfilled, rejected } from '../../constants/action-types'
import { EVENTS as e } from '../../constants/socket-events'
import io from "socket.io-client"

function* mainSaga(createChannelFn, socket) {
  const channel = yield call(createChannelFn, socket)

  yield takeEvery(channel, function* ({ type, payload }) {
    yield put({ type, payload })
  })
}

function* watcher(socket) {

  function* handleEmitSaga(args) {
    yield apply(socket, socket.emit, args)
  }

  yield takeEvery(t.SEND_MESSAGE, (action) => {
    return handleEmitSaga([e.MESSAGE, action.message])
  })

  yield takeEvery(t.CREATE_CONVERSATION, (action) => {
    return handleEmitSaga([e.CREATE_CONVERSATION, action.participantId])
  })

  yield takeEvery(t.TYPING_START, (action) => {
    return handleEmitSaga([e.TYPING_START, action.chatId])
  })

  yield takeEvery(t.TYPING_END, (action) => {
    return handleEmitSaga([e.TYPING_END, action.chatId])
  })

  yield takeEvery(t.SET_VIEWED, (action) => {
    return handleEmitSaga([e.SET_VIEWED, action.chatId])
  })

  yield takeEvery(rejected(t.USER_AUTH), () => {
    return socket.disconnect()
  })
}

export default function* rootSaga() {
  yield take(fulfilled(t.USER_FETCH))

  const state = yield select()

  const socket = io('https://muzsoyuz.com/', {
    path : '/api/v2/chat',
    query: {
      token: state.user.token
    }
  })

  yield all([
    mainSaga(createConnectChannel, socket),
    mainSaga(createNewMessageChannel, socket),
    mainSaga(createNewConversationChannel, socket),
    mainSaga(createUserIsActiveChannel, socket),
    mainSaga(typingStatusChannel, socket),
    watcher(socket)
  ])
}