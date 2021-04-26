import { call, apply, takeEvery, put, all } from 'redux-saga/effects'
import { socket } from '../../api/socket-api'
import {
  createConnectChannel,
  createNewMessageChannel,
  createNewConversationChannel,
  createUserIsActiveChannel, typingStatusChannel,
} from '../channels/chatChannels'
import { ACTIONS as t } from '../../constants/action-types'
import { EVENTS as e } from '../../constants/socket-events'

function* mainSaga(createChannelFn) {
  const channel = yield call(createChannelFn, socket)

  try {
    yield takeEvery(channel, function* ({ type, payload }) {
      yield put({ type, payload })
    })
  } catch (e) {
    console.error('socket error:', e)
  }
}

function* handleEmitSaga(args) {
  try {
    yield apply(socket, socket.emit, args)
  } catch (e) {
    console.error('socket error:', e)
  }
}

function* watcher() {
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
}

export default function* rootSaga() {
  yield all([
    mainSaga(createConnectChannel),
    mainSaga(createNewMessageChannel),
    mainSaga(createNewConversationChannel),
    mainSaga(createUserIsActiveChannel),
    mainSaga(typingStatusChannel),
    watcher()
  ])
}