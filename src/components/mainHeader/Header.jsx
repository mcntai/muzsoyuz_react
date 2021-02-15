import React from 'react'
import s from './Header.module.css'
import profile from '../../assets/img/profile.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../slice/user'


const Header = () => {
  const { loaded } = useSelector(selectProfile)

  return (
    <div className={s.profile}>
      <NavLink to={loaded ? '/profile' : '/login'}>
        <img src={profile} alt="profile-icon"/>
      </NavLink>
    </div>
  )
}

export default Header