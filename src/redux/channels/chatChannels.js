import { eventChannel, END } from 'redux-saga'
import { EVENTS as e } from '../../constants/socket-events'
import { ACTIONS as t } from '../../constants/action-types'

export const createConnectChannel = socket => {
  return eventChannel(emit => {

    const connectHandler = () => {
      socket.emit(e.CONNECTED)

      socket.emit(e.GET_CONVERSATIONS, (conversations) => {
        emit({ type: t.GET_CONVERSATIONS, payload: conversations })
      })

      socket.emit('getUsers', (users) => {
        // console.log(users)
      })
    }

    socket.on(e.CONNECT, connectHandler)

    return () => {
      socket.off('connect', connectHandler)
      emit(END)
    }
  })
}


export const createNewMessageChannel = socket => {
  return eventChannel(emit => {

    const newMessageHandler = payload => {
      emit({ type: t.NEW_MESSAGE, payload })
    }

    socket.on(e.NEW_MESSAGE, newMessageHandler)

    const unsubscribe = () => {
      // emit(END)
    }
    return unsubscribe
  })
}


export const createNewConversationChannel = socket => {
  return eventChannel(emit => {

    const onResponse = conversation => {
      emit({ type: t.CONVERSATION_CREATED, payload: conversation })
    }

    const createConversation = participantId => {
      socket.emit(e.JOIN_THE_CREATED_CONVERSATION, participantId, onResponse)
    }

    socket.on(e.CONVERSATION_CREATED, createConversation)

    const unsubscribe = () => {
      // emit(END)
    }
    return unsubscribe
  })
}