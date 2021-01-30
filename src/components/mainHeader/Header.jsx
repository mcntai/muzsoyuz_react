import React from 'react'
import s from './Header.module.css'
import profile from '../../assets/img/profile.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../slice/user'
import { STAGES } from '../../slice/utils/constants'


const Header = () => {
  const user = useSelector(selectProfile)

  return (
    <>
      {
        user.status === STAGES.SUCCESS
        ?
        <div className={s.profile}>
          <NavLink to="/profile"><img src={profile} alt="profile-icon"/></NavLink>
        </div>
        :
        <div className={s.profile}>
          <NavLink to="/login"><img src={profile} alt="profile-icon"/></NavLink>
        </div>
      }
    </>
  )
}

export default Header