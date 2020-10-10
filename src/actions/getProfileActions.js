export const fetchDataIfLoggedIn = () => {
	return async dispatch => {
		dispatch(fetchLoginStatusBegin());
		try {
			let response = await fetch('http://localhost:9000/api/v1/user/profile', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json'
				}
			})

			if (response.statusText === 'OK') {
				dispatch(fetchLoginStatusSuccess())
			}
			else {
				dispatch(fetchLoginStatusFailure(response.statusText))
			}
		}
		catch (response) {
			dispatch(fetchLoginStatusFailure(response.statusText))
		}
	}
}


const fetchLoginStatusBegin = () => ({
	type: 'FETCH_LOGIN_STATUS_BEGIN'
})

const fetchLoginStatusSuccess = () => ({
	type: 'FETCH_LOGIN_STATUS_SUCCESS',
	payload: true
})

const fetchLoginStatusFailure = error => ({
	type: 'FETCH_LOGIN_STATUS_FAILURE',
	payload: {error}
})