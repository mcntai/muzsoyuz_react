import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectShowButton } from '../../slice/general'
import s from './Questionary.module.css'


const Button = ({ btnText, nextRoute, btnClass, callback }) => {
  const finishBtn = useSelector(selectShowButton)
  const btn = finishBtn === true ? s.finishBtn : ''

  return (
    <>
      <NavLink
        to={nextRoute}
        className={[btnClass, btn].join(' ')}
        onClick={callback}
      >
        {btnText}
      </NavLink>
    </>
  )
}

export default Button