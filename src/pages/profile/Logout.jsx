import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/user'
import { clearError } from '../../actions/errors'
import { ERRORS as e } from '../../constants/errors'
import s from './Logout.module.css'


const Logout = ({ btnWrapper }) => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout({ message: e.LOGGED_OUT }))
    dispatch(clearError())
  }

  return (
    <div className={btnWrapper}>
      <NavLink
        to={'/'}
        className={s.btn}
        onClick={handleLogOut}
      >
        Вийти
      </NavLink>
    </div>
  )
}

export default Logout