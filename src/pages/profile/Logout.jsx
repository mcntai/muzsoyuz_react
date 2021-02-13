import React from 'react'
import s from './Logout.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cleanUser } from '../../slice/user'


const Logout = ({ btnWrapper }) => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')

    dispatch(cleanUser())
  }

  const LogoutButton = () => {
    return (
      <NavLink
        to=""
        className={s.btn}
        onClick={handleLogOut}
      >
        Вийти
      </NavLink>
    )
  }

  return (
    <div className={btnWrapper}>
      {LogoutButton()}
    </div>
  )
}

export default Logout