import React from "react"
import { connect } from 'react-redux'
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
        const response = await fetch(`http://localhost:9000/api/v1/auth/oauth/${provider}/callback/${query.search}`)

        await this.setToken(response)

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
