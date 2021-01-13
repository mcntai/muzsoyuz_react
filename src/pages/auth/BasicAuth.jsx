import React from 'react'
import { Redirect } from 'react-router'


class BasicAuth extends React.Component {
  async setDataToLocalStorage(response) {
    localStorage.setItem('token', response.token)
    localStorage.setItem('userId', response.profile.id)
  }

  handleRedirect() {
    if (this.props.authorized === true && !this.props.role) {
      return <Redirect to='/quest-start'/>
    } else if (this.props.authorized) {
      return <Redirect to='/'/>
    } else if (typeof this.props.authorized !== 'undefined') {
      return <Redirect to='/login'/>
    }
  }
}

export default BasicAuth