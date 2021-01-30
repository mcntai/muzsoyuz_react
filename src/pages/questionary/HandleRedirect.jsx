import React from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../slice/user'
import { STAGES } from '../../slice/utils/constants'


const HandleRedirect = (renderContent) => {
  const user = useSelector(selectProfile)
  const status = user?.status === STAGES.SUCCESS
  const role = user?.role

  if (status && role) {
    return <Redirect to='/'/>
  } else if (!status) {
    return <Redirect to='/login'/>
  } else {
    return renderContent()
  }
}

export default HandleRedirect
