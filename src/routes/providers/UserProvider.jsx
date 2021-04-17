import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchUser, goToLogin, setAuthNextLocation } from '../../actions/user'
import Loader from '../../components/common/Loader'
import { selectUser } from '../../slice/user'
import useChat from "../../pages/chat/useChat"


const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const isMainPage = location.pathname === '/'

  const user = useSelector(selectUser)

  useEffect(() => {
    if (!user.loaded && !user.token && !isMainPage) {
      dispatch(setAuthNextLocation(location.pathname))
      dispatch(goToLogin())
    }
  }, [dispatch, user.loaded, user.loading, location.pathname])

  return children
}

const ProfileProvider = ({ children }) => {
  const { socketConnect } = useChat()
  const dispatch = useDispatch()
  const { profile: { loaded, error, loading }, token } = useSelector(selectUser)

  const location = useLocation()

  const isMainPage = location.pathname === '/'

  useEffect(() => {
    if (!loaded && !loading && !error && token) {
      dispatch(fetchUser())

      socketConnect()
    }
  }, [])

  return (
    <Loader
      error={isMainPage ? null : error}
      loading={loading}
    >
      {children}
    </Loader>
  )
}

const UserProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </AuthProvider>
  )
}

export default UserProvider