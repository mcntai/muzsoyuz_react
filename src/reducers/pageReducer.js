import produce from 'immer';

const initialState = {
	currentRoute: '',
	prevRoute: ''
}

const pageReducer = (state = initialState, action) => {
	return produce(state, draft => {
		switch(action.type) {
			case 'MAIN_PAGE':
				draft.currentRoute = action.currentRoute
				draft.prevRoute = state.currentRoute
				break
			case 'AUTH_PAGE':
				draft.currentRoute = action.currentRoute
				draft.prevRoute = state.currentRoute
				break
			default:
				return state
		}
	})
}

export default pageReducer