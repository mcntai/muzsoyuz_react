import React from 'react'
import s from './Header.module.css'
import profile from '../../assets/img/profile.svg'
import { NavLink } from 'react-router-dom'


const Header = () => (
  <div className={s.profile}>
    <NavLink to='/profile'>
      <img src={profile} alt="profile-icon"/>
    </NavLink>
  </div>
)

export default Header