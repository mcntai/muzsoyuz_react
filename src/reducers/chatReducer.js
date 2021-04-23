import { ACTIONS as t } from '../constants/action-types'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import reducersMap from "../redux/helpers/reducersMap"


const INITIAL_STATE = {
  chats: {},
  users: {}
}

const getInitialData = (state, action) => {
  state.chats = keyBy(action.payload, '_id')
  state.users = mapValues(keyBy(action.payload, 'user._id'), x => x._id)
}

const newMessageReceived = (state, action) => {
  state.chats[action.payload.chatId].messages.push(action.payload)
  // state.users[action.payload._id] = action.payload.chatId
}

const newConversationCreated = (state, action) => {
  state.chats[action.payload._id] = action.payload
  state.users[action.payload.user._id] = action.payload._id
}

export default reducersMap({
  [t.GET_CONVERSATIONS]   : getInitialData,
  [t.NEW_MESSAGE]         : newMessageReceived,
  [t.CONVERSATION_CREATED]: newConversationCreated,
}, INITIAL_STATE)

export const selectChats = state => state.chat.chats
export const selectChat = id => state => state.chat.chats[id]
export const selectUser = id => state => state.chat.users[id]