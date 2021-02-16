import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchUser, setAuthNextLocation } from '../actions/user'
import Loader from '../components/common/Loader'
import { selectUser } from '../slice/user'


const AuthProvider = ({ children, history }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const isMainPage = location.pathname === '/'

  const user = useSelector(selectUser)

  useEffect(() => {
    if (!user.loaded && !user.loading) {
      dispatch(setAuthNextLocation(location.pathname))
    }
  }, [dispatch, user.loaded, user.loading, location.pathname])

  useEffect(() => {
    if (!user.loaded && !user.token && !isMainPage) {
      history.push('/login')
    }
  }, [user.loaded, user.token, isMainPage])

  return children
}

const ProfileProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { profile: { loaded, error, loading }, token } = useSelector(selectUser)

  const location = useLocation()

  const isMainPage = location.pathname === '/'

  useEffect(() => {
    if (!loaded && !error && !loading && token) {
      dispatch(fetchUser())
    }
  }, [dispatch, loaded, loading, error, token])

  return (
    <Loader
      error={isMainPage ? null : error}
      loading={loading}
    >
      {children}
    </Loader>
  )
}

const UserProvider = ({ children, history }) => {
  return (
    <AuthProvider history={history}>
      <ProfileProvider>{children}</ProfileProvider>
    </AuthProvider>
  )
}

export default UserProvider