import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { selectUser } from "../../redux/slice/user"
import { goToLogin, setAuthNextLocation } from "../../redux/actions/user"

const AuthGuard = ({ children }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const user = useSelector(selectUser)

  useEffect(() => {
    if (!user.loaded && !user.token) {
      dispatch(setAuthNextLocation(location.pathname))
      dispatch(goToLogin())
    }
  }, [dispatch, user.loaded, user.loading, user.token, location.pathname])

  return children
}

export default AuthGuard