import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenAfterOauth } from '../../actions/user'
import { selectUser } from '../../slice/user'
import { handleRedirect } from './authRedirectHandler'


const SocialMediaOauth = ({ type }) => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(oauthCallback(type))
  })

  function oauthCallback(provider) {
    const url = new URL(window.location.href)
    const query = url.search

    dispatch(getTokenAfterOauth({ provider, query }))
  }

  return (
    <>
      {() => handleRedirect(user)}
    </>
  )
}

export default SocialMediaOauth
