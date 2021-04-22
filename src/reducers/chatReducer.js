import { ACTIONS as t } from '../constants/action-types'
import keyBy from 'lodash/keyBy'
import reducersMap from "../redux/helpers/reducersMap"


const newMessageReceived = (state, action) => {
  state[action.payload.chatId].messages.push(action.payload)
}

export default reducersMap({
  [t.GET_CONVERSATIONS]: (state, action) => {
    return keyBy(action.payload, '_id')
  },
  [t.NEW_MESSAGE]: newMessageReceived,
})

export const selectChats = state => state.chat
export const selectChat = id => state => state.chat[id]
export const selectMessages = id => state => state.chat[id].messages