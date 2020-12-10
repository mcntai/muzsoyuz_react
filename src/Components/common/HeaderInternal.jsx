import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './HeaderInternal.module.css'


const HeaderInternal = ({ prevRoute, heading, btnText, wrapperClass, btnTextClass }) => {

  return (
    <div className={wrapperClass}>
      <NavLink to={prevRoute} className={s.backBtn} />
      <span className={s.heading}>{heading}</span>
      <button className={btnTextClass}>{btnText}</button>
    </div>
  )
}

export default HeaderInternal