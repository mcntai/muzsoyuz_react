import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'
import { selectRoles } from "../../slice/meta"
import { fetchRoles } from "../../actions/meta"


const Preloader = ({ children }) => {
  const dispatch = useDispatch()
  const { error, loading, loaded } = useSelector(selectRoles)

  useEffect(() => {
    if (!loading && !loaded) {
      dispatch(fetchRoles())
    }
  }, [loading, loaded, dispatch])

  return (
    <Loader
      error={error}
      loading={loading}
    >
      {children}
    </Loader>
  )
}


export default Preloader