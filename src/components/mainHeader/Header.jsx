import React from 'react'
import s from './Header.module.css'
import profile from '../../assets/img/profile.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux"
import { selectProfile } from "../../redux/slice/user"
import ChatWithCounter from './ChatWithCounter'


const Header = () => {
  const authorized = useSelector(selectProfile('_id'))

  return (
    <div className={s.headerWrapper}>
      {
        authorized
          ? <ChatWithCounter/>
          : null
      }
      <NavLink to='/profile'>
        <img src={profile} className={s.profileImg} alt="profile-icon"/>
      </NavLink>
    </div>
  )
}

export default Header