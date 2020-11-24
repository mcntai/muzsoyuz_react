import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './HeaderInternalButtons.module.css'


const HeaderInternalButtons = ({ firstText, firstRoute, secondText, secondRoute }) => {
  return (
    <div className={s.sortFilterButtons}>
      <NavLink
        to={firstRoute}
        className={s.btn}
        activeClassName={s.active}
      >
        {firstText}
      </NavLink>
      <NavLink
        to={secondRoute}
        className={s.btn}
        activeClassName={s.active}
      >
        {secondText}
      </NavLink>
    </div>
  )
}

export default HeaderInternalButtons
