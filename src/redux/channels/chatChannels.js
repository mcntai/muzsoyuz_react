import { eventChannel } from 'redux-saga'
import { EVENTS as e } from '../../constants/socket-events'
import { ACTIONS as t } from '../../constants/action-types'


export const createConnectChannel = socket => {
  return eventChannel(emit => {

    const connectHandler = () => {
      socket.emit(e.CONNECTED)

      socket.emit(e.GET_CONVERSATIONS, (conversations) => {
        emit({ type: t.GET_CONVERSATIONS, payload: conversations })
      })
    }

    socket.on(e.CONNECT, connectHandler)

    return () => {
    }
  })
}


export const createNewMessageChannel = socket => {
  return eventChannel(emit => {

    const newMessageHandler = payload => {
      emit({ type: t.NEW_MESSAGE, payload })
    }

    socket.on(e.NEW_MESSAGE, newMessageHandler)

    return () => {
    }
  })
}


export const createNewConversationChannel = socket => {
  return eventChannel(emit => {

    const onResponse = conversation => {
      emit({ type: t.CONVERSATION_CREATED, payload: conversation })
    }

    const joinTheConversation = participantId => {
      socket.emit(e.JOIN_THE_CREATED_CONVERSATION, participantId, onResponse)
    }

    socket.on(e.CONVERSATION_CREATED, joinTheConversation)

    return () => {
    }
  })
}

export const createUserIsActiveChannel = socket => {
  return eventChannel(emit => {

    const handleUserIsActiveStatus = user => {
      emit({ type: t.USER_ACTIVE, payload: user })
    }

    socket.on(e.USER_ACTIVE, handleUserIsActiveStatus)

    return () => {
    }
  })
}

export const typingStatusChannel = socket => {
  return eventChannel(emit => {

    const handleTypingStarted = chatId => {
      emit({ type: t.TYPING_STARTED, payload: chatId })
    }

    const handleTypingEnded = chatId => {
      emit({ type: t.TYPING_ENDED, payload: chatId })
    }

    socket.on(e.TYPING_STARTED, handleTypingStarted)
    socket.on(e.TYPING_ENDED, handleTypingEnded)

    return () => {
    }
  })
}