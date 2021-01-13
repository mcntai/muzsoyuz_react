import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './HeaderInternalButtons.module.css'


const HeaderInternalButtons = ({ firstText, firstRoute, secondText, secondRoute, btnClass, active }) => {
  return (
    <div className={s.sortFilterButtons}>
      <NavLink
        to={firstRoute}
        className={btnClass}
        activeClassName={active}
      >
        {firstText}
      </NavLink>
      <NavLink
        to={secondRoute}
        className={btnClass}
        activeClassName={active}
      >
        {secondText}
      </NavLink>
    </div>
  )
}

export default HeaderInternalButtons
