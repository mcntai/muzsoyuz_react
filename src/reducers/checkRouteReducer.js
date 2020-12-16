import produce from 'immer'


const initialState = {
  currentRoute: '',
  prevRoute   : '',
}

const checkRouteReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'MAIN_PAGE':
        draft.currentRoute = action.currentRoute
        draft.prevRoute = state.currentRoute
        break
      case 'AUTH_PAGE':
        draft.currentRoute = action.currentRoute
        draft.prevRoute = state.currentRoute
        break
      case 'OFFER_JOB':
        draft.currentRoute = action.currentRoute
        draft.prevRoute = state.currentRoute
        break
      case 'FIND_JOB':
        draft.currentRoute = action.currentRoute
        draft.prevRoute = state.currentRoute
        break
      case 'PROFILE':
        draft.currentRoute = state.currentRoute
        draft.prevRoute = state.currentRoute
        break
      case 'SETTINGS':
        draft.currentRoute = action.currentRoute
        draft.prevRoute = state.currentRoute
        break
      default:
        return state
    }
  })
}

export default checkRouteReducer