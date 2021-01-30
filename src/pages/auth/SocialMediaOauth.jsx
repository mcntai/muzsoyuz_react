import React from 'react'
import { connect } from 'react-redux'
import { getTokenAfterOauth } from '../../actions/user'
import BasicAuth from './BasicAuth'
import * as swal from '../../components/common/alerts'


const mapStateToProps = state => ({
  user: state.user,
})


class SocialMediaOauth extends BasicAuth {
  componentDidMount() {
    this.props.dispatch(this.oauthCallback(this.props.type))
  }

  oauthCallback(provider) {
    const url = new URL(window.location.href)
    const query = url.search

    this.props.dispatch(getTokenAfterOauth({provider, query}))
  }

  render() {
    return (
      <div>
        {this.handleRedirect(this.props.user)}
      </div>
    )
  }
}

export default connect(mapStateToProps)(SocialMediaOauth)
