import React from "react"
import { Redirect } from "react-router"
import { assert } from "../errors"


class BasicAuth extends React.Component {
  async setTokenToLocalStorage(response) {
    console.log(response)
    assert(!response.statusCode || response.statusCode < 400, response.message)

    localStorage.setItem('token', response.token)
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