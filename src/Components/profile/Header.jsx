import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'


const Header = ({ prevRoute }) => {

  return (
    <div className={s.profileHeader}>
      <NavLink to={prevRoute} className={s.backBtn}>&lt;</NavLink>
      <span className={s.profile}>Профіль</span>
    </div>
  )
}

export default Header