import React from 'react'
import s from './Header.module.css'
import profile from '../../assets/img/profile.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../slice/user'
import { STAGES } from '../../slice/utils/constants'


const Header = () => {
  const user = useSelector(selectProfile)

  return (
    <>
      <div className={s.profile}>
        <NavLink
          to={user.status === STAGES.SUCCESS ? '/profile' : '/login'}
        >
          <img src={profile} alt="profile-icon"/>
        </NavLink>
      </div>
    </>
  )
}

export default Header