import React from 'react'
import { connect } from 'react-redux'
import { MuzSoyuzRequest } from '../muzsoyuz-request'
import BasicAuth from './BasicAuth'
import * as swal from '../Components/common/Alerts'


const mapStateToProps = state => ({
  authorized: state.authReducer.authorized,
  role      : state.authReducer.role,
})

const fetchAuthStatusSuccess = (role) => ({
  type      : 'FETCH_AUTH_STATUS_SUCCESS',
  authorized: true,
  role      : role,
})

const fetchAuthStatusFailure = (error) => ({
  type   : 'FETCH_AUTH_STATUS_FAILURE',
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

        await this.setDataToLocalStorage(response)

        dispatch(fetchAuthStatusSuccess(response.profile.role))
      }
      catch (e) {
        if (e.message === 'Unauthorized') {
          swal.error(e.message, 'Упс!')
        } else {
          swal.error(e.message, 'Хммм')
        }

        dispatch(fetchAuthStatusFailure(e.message))
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
