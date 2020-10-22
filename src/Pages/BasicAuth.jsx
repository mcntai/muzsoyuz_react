import React from "react"
import { Redirect } from "react-router"
import { assert } from "../errors"


class BasicAuth extends React.Component {
  async setToken(response) {
    assert(response.status !== 400, JSON.stringify(response))

      localStorage.setItem('token', response.token)

      alert(JSON.stringify({ token: response.token }))
  }

  handleRedirect() {
    if (this.props.authorized) {
      return <Redirect to='/'/>
    } else if (typeof this.props.authorized !== 'undefined') {
      return <Redirect to='/login'/>
    }
  }
}

export default BasicAuth