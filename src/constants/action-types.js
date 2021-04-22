const ACTION_PREFIXES = {
  USER_FETCH         : 'user/fetch',
  USER_AUTH          : 'user/auth',
  USER_OAUTH         : 'user/oauth',
  USER_PROFILE_UPDATE: 'user/profile/update',
  USER_GET_DAYS_OFF  : 'user/get/days/off',
  USER_SET_DAY_OFF   : 'user/set/day/off',
  USER_DELETE_DAY_OFF: 'user/delete/day/off',
  USER_UPDATE_IMAGE  : 'user/update/image',
  OFFER_MAKE         : 'offer/make',
  OFFER_FETCH        : 'offer/fetch',
  OFFER_FETCH_MORE   : 'offer/fetch/more',
  META_ROLES_FETCH   : 'meta/roles/fetch'
}

const TYPES = {
  LOGOUT                : 'LOGOUT',
  AUTH_SET_NEXT_LOCATION: 'AUTH_SET_NEXT_LOCATION',
  RESET_NEXT_LOCATION   : 'RESET_NEXT_LOCATION',
  CLEAR_ERROR           : 'CLEAR_ERROR',
}

const CHAT_CLIENT_ACTIONS = {
  TYPING_START                 : 'TYPING_START',
  SET_VIEWED                   : 'SET_VIEWED',
  JOIN_THE_CREATED_CONVERSATION: 'JOIN_THE_CREATED_CONVERSATION',
  SEND_MESSAGE                 : 'SEND_MESSAGE',
  SET_ACTIVE                   : 'SET_ACTIVE',
  CREATE_CONVERSATION          : 'CREATE_CONVERSATION',
  GET_CONVERSATIONS            : 'GET_CONVERSATIONS'
}

const CHAT_SERVER_ACTIONS = {
  TYPING_STARTED      : 'TYPING_STARTED',
  NEW_MESSAGE         : 'NEW_MESSAGE',
  CHAT_ERROR          : 'CHAT_ERROR',
  USER_ACTIVE         : 'USER_ACTIVE',
  CONVERSATION_CREATED: 'CONVERSATION_CREATED',
  CHAT_VIEWED         : 'CHAT_VIEWED',
}

export const ACTIONS = {
  ...ACTION_PREFIXES,
  ...TYPES,
  ...CHAT_CLIENT_ACTIONS,
  ...CHAT_SERVER_ACTIONS,
}