import { ACTIONS as t } from '../constants/action-types'
import { ROUTES as r } from '../constants/routes'
import history from "../history/history"

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


