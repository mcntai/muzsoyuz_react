import React from "react"
import { connect } from 'react-redux'
import { MuzSoyuzRequest } from '../muzsoyuz-request'
import BasicAuth from "./BasicAuth"


const mapStateToProps = state => ({
  authorized: state.authReducer.authorized,
})

const fetchAuthStatusSuccess = () => ({
  type: 'FETCH_AUTH_STATUS_SUCCESS',
  payload: true,
})

const fetchAuthStatusFailure = (error) => ({
  type: 'FETCH_AUTH_STATUS_FAILURE',
  payload: { error },
})

class SocialMediaOauth extends BasicAuth {
  componentDidMount() {
    this.props.dispatch(this.oauthCallback(this.props.type))
  }

  oauthCallback(provider) {
    return async dispatch => {
      try {
        const query = new URL(window.location.href)

        const response = await MuzSoyuzRequest.getTokenAfterSocialOauth(provider, query.search)

        await this.setTokenToLocalStorage(response)

        dispatch(fetchAuthStatusSuccess())
      } catch (error) {
        dispatch(fetchAuthStatusFailure(error.message))
      }
    }
  }

  render() {
    return (
      <div>
        {this.handleRedirect()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(SocialMediaOauth)
