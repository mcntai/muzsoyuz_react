import { Redirect } from 'react-router'
import React from 'react'


export const handleRedirect = (authorized, role, renderContent) => {
  if (authorized && role) {
    return <Redirect to='/'/>
  } else if (!authorized) {
    return <Redirect to='/login'/>
  } else {
    return renderContent()
  }
}
