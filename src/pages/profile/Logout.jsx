import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/user'
import { clearError } from '../../redux/actions/errors'
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
      <button
        className={s.btn}
        onClick={handleLogOut}
      >
        Вийти з системи
      </button>
    </div>
  )
}

export default Logout