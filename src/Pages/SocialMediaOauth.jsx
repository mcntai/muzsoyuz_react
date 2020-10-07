import React from "react";
import {connect} from 'react-redux';
import {assert} from "../errors";
import {Redirect} from "react-router";

const mapStateToProps = state => {
	return {
		socialMediaAuthorized: state.authReducer.socialMediaAuthorized
	}
}

const oauthCallback = (provider) => {
	return async dispatch => {
		try {
			const query = new URL(window.location.href);
			const response = await fetch(`http://localhost:9000/api/v1/oauth/${provider}/callback/${query.search}`);

			assert(response.ok, response.statusText);

			const { token } = await response.json();

			localStorage.setItem('token', token);

			alert(JSON.stringify({ token }));

			dispatch(fetchOauthStatusSuccess());
		}
		catch(response) {
			dispatch(fetchOauthStatusFailure(response.statusText))
		}
	}
}


const fetchOauthStatusSuccess = () => ({
	type: 'FETCH_OAUTH_STATUS_SUCCESS',
	payload: true
})

const fetchOauthStatusFailure = (error) => ({
	type: 'FETCH_OAUTH_STATUS_FAILURE',
	payload: {error}
})


class SocialMediaOauth extends React.Component {
	componentDidMount() {
		this.props.dispatch(oauthCallback(this.props.type))
	}
	
	render() {
		return (
			<div>
				{
					this.props.socialMediaAuthorized === true
					? <Redirect to='/main' />
					: null
				}
				{
					this.props.socialMediaAuthorized === false
						? <Redirect to='/login' />
						: null
				}
			</div>
		);
	}
}

export default connect(mapStateToProps)(SocialMediaOauth);
