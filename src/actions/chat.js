import { ACTIONS as t } from '../constants/action-types'

export const createConversation = participantId => ({
  type: t.CREATE_CONVERSATION,
  participantId
})