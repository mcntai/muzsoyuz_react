import { ACTIONS as t } from '../../constants/action-types'
import { ROUTES as r } from '../../constants/routes'
import history from "../../history/history"

export const createConversation = participantId => ({
  type: t.CREATE_CONVERSATION,
  participantId
})

export const goToConcreteChat = id => () => {
  history.push({
    pathname: r.OPENED_CHAT,
    state   : { participantId: id }
  })
}

export const goToAllChats = () => () => {
  history.push({
    pathname: r.CHAT,
  })
}

export const typingStart = chatId => ({
  type: t.TYPING_START,
  chatId
})

export const typingEnd = chatId => ({
  type: t.TYPING_END,
  chatId
})

export const setMessagesViewed = chatId => ({
  type: t.SET_VIEWED,
  chatId
})


