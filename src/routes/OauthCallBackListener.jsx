import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom"
import { authenticateAfterOauth } from "../redux/actions/user"
import { selectUser } from "../redux/slice/user"

const getProvider = pathname => pathname.replace(/.+(facebook|google).+/g, '$1')

const OauthCallBackListener = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const provider = getProvider(location.pathname)
  const query = location.search

  const { user: { loading } } = useSelector(selectUser)

  useEffect(() => {
    if (!loading) {
      dispatch(authenticateAfterOauth({ provider, query }))
    }
  }, [loading])

  return React.Fragment
}

export default OauthCallBackListener
