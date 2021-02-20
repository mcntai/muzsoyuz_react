import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './SortingFilterButtons.module.css'


const SortingFilterButtons = ({ firstText, firstRoute, secondText, secondRoute, btnClass, active, callback }) => {
  return (
    <div className={s.sortFilterButtons}>
      <NavLink
        to={firstRoute}
        className={btnClass}
        activeClassName={active}
        onClick={callback}
      >
        {firstText}
      </NavLink>
      <NavLink
        to={secondRoute}
        className={btnClass}
        activeClassName={active}
        onClick={callback}
      >
        {secondText}
      </NavLink>
    </div>
  )
}

export default SortingFilterButtons
