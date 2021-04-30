import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom"
import { authenticateAfterOauth } from "../redux/actions/user"

const getProvider = pathname => pathname.replace(/.+(facebook|google).+/g, '$1')

const OauthCallBackListener = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const provider = getProvider(location.pathname)
  const query = location.search

  useEffect(() => {
    dispatch(authenticateAfterOauth({ provider, query }))
  }, [location, dispatch])

  return React.Fragment
}

export default OauthCallBackListener
