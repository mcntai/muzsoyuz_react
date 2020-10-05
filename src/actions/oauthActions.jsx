import React from "react";
import {assert} from "../errors";
import {Redirect} from "react-router";
// import { Redirect } from '@reach/router';


// export async function oauthCallback(provider) {
export const oauthCallback = async (provider) => {
	try {
		const query = new URL(window.location.href);
		const response = await fetch(`http://localhost:9000/api/v1/oauth/${provider}/callback/${query.search}`);
		
		assert(response.ok, response.statusText);
		
		const { token } = await response.json();
		
		localStorage.setItem('token', token);
		
		alert(JSON.stringify({ token }));
		
		return <Redirect to='/main' />
	}
	catch(error) {
		alert(error.message);
	}
}