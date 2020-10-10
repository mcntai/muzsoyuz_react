import produce from 'immer';

const initialState = {
	email: '',
	emailValidity: false,
	password: '',
	passwordValidity: false,
	confirmPassword: '',
	confirmPasswordValidity: false,
	authorized: undefined,
	authError: ''
}

const authReducer = (state = initialState, action) => {
	return produce(state, draft => {
		switch(action.type) {
			case 'EMAIL_CHANGE':
				draft.email = action.payload
				break
			case 'EMAIL_VALIDATE':
				draft.emailValidity = action.payload
				break
			case 'PASSWORD_CHANGE':
				draft.password = action.payload
				break
			case 'PASSWORD_VALIDATE':
				draft.passwordValidity = action.payload
				break
			case 'CONFIRM_PASSWORD_CHANGE':
				draft.confirmPassword = action.payload
				break
			case 'CONFIRM_PASSWORD_VALIDATE':
				draft.confirmPasswordValidity = action.payload
				break
			case 'FETCH_AUTH_STATUS_SUCCESS':
				draft.authorized = action.payload
				break
			case 'FETCH_AUTH_STATUS_FAILURE':
				draft.authorized = false
				draft.authError = action.payload
				break
			default:
				return state
		}
	})
}

export default authReducer