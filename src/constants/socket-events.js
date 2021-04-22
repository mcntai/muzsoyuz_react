const CLIENT_EVENTS = {
  TYPING_START                 : 'typingStart',
  TYPING_END                   : 'typingEnd',
  SET_VIEWED                   : 'setViewed',
  MESSAGE                      : 'message',
  CREATE_CONVERSATION          : 'createConversation',
  GET_CONVERSATIONS            : 'getConversations',
  JOIN_THE_CREATED_CONVERSATION: 'joinTheCreatedConversation',
  CONNECTED                    : 'connected',
}

const SERVER_EVENTS = {
  TYPING_STARTED      : 'typingStarted',
  NEW_MESSAGE         : 'newMessage',
  CHAT_ERROR          : 'chatError',
  CREATED_CONVERSATION: 'createdConversation',
  CONNECT             : 'connect',
  USER_ACTIVE         : 'userActive',
  CHAT_VIEWED         : 'chatViewed',
  GET_USERS           : 'getUsers',
}

export const EVENTS = {
  ...CLIENT_EVENTS,
  ...SERVER_EVENTS,
}