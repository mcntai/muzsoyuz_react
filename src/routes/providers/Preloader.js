import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'
import { selectRoles } from "../../redux/slice/meta"
import { fetchRoles } from "../../redux/actions/meta"


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
      loaded={loaded}
    >
      {children}
    </Loader>
  )
}


export default Preloader