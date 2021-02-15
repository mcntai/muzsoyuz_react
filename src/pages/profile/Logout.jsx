import React from 'react'
import s from './Logout.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from "../../actions/user"
import { clearError } from '../../actions/errors'


const Logout = ({ btnWrapper }) => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout({message: 'logged out'}))
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