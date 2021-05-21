import { ACTIONS as t } from '../../constants/action-types'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import reducersMap from "../helpers/reducersMap"


const INITIAL_STATE = {
  chats: {},
  users: {},
}

const getInitialData = (state, action) => {
  state.chats = keyBy(action.payload, '_id')
  state.users = mapValues(keyBy(action.payload, 'user._id'), x => x._id)
}

const newMessageReceived = (state, action) => {
  state.chats[action.payload.chatId].messages.push(action.payload)
}

const newConversationCreated = (state, action) => {
  state.chats[action.payload._id] = action.payload
  state.users[action.payload.user._id] = action.payload._id
}

const userIsActiveStatusHandler = (state, action) => {
  const chatId = state.users[action.payload._id]

  state.chats[chatId].user.isActive = action.payload.isActive
  state.chats[chatId].user.lastSeen = action.payload.lastSeen
}

const typingStartedHandler = (state, action) => {
  state.chats[action.payload].typing = true
}

const typingEndedHandler = (state, action) => {
  state.chats[action.payload].typing = false
}

const setMessagesAsViewed = (state, action) => {
  return state.chats[action.chatId]?.messages.forEach(msg => {
    if (msg.senderId !== action.senderId) {
      msg.viewed = true
    }
  })
}

export default reducersMap({
  [t.GET_CONVERSATIONS]   : getInitialData,
  [t.NEW_MESSAGE]         : newMessageReceived,
  [t.CONVERSATION_CREATED]: newConversationCreated,
  [t.USER_ACTIVE]         : userIsActiveStatusHandler,
  [t.TYPING_STARTED]      : typingStartedHandler,
  [t.TYPING_ENDED]        : typingEndedHandler,
  [t.SET_VIEWED]          : setMessagesAsViewed,
}, INITIAL_STATE)

export const selectChats = state => state.chat.chats
export const selectChat = id => state => state.chat.chats[id]
export const selectLastMessage = id => state => state.chat.chats[id]?.messages[state.chat.chats[id]?.messages.length - 1]
export const selectUser = id => state => state.chat.users[id]
export const selectUserLastSeenTime = id => state => state.chat.chats[id]?.user.lastSeen