import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './HeaderInternal.module.css'


const HeaderInternal = ({ prevRoute, heading, btnText, wrapperClass, btnTextClass, redirectTo }) => {

  return (
    <div className={wrapperClass}>
      <NavLink to={prevRoute} className={s.backBtn} />
      <span className={s.heading}>{heading}</span>
      <NavLink to={redirectTo} className={btnTextClass}>{btnText}</NavLink>
    </div>
  )
}

export default HeaderInternal