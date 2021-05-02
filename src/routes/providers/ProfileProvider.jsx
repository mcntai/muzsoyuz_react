import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../redux/actions/user'
import Loader from '../../components/common/Loader'
import { selectUser } from '../../redux/slice/user'


const ProfileProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { profile: { loaded, error, loading }, token } = useSelector(selectUser)

  useEffect(() => {
    if (!loaded && !loading && !error && token) {
      dispatch(fetchUser())
    }
  }, [dispatch, loaded, loading, error, token])

  return (
    <Loader
      error={error}
      loading={loading}
    >
      {children}
    </Loader>
  )
}

export default ProfileProvider