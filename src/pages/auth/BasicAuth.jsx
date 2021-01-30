import React from 'react'
import { Redirect } from 'react-router'
import { STAGES } from '../../slice/utils/constants'


class BasicAuth extends React.Component {
  handleRedirect(user) {
    if (user?.status === STAGES.SUCCESS && !user.role) {
      return <Redirect to='/quest-start'/>
    } else if (user?.status === STAGES.SUCCESS) {
      return <Redirect to='/'/>
    } else if (typeof user?.status !== 'undefined') {
      return <Redirect to='/login'/>
    }
  }
}

export default BasicAuth