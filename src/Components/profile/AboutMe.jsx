import React from 'react'
import s from './AboutMe.module.css'
import user from '../../Assets/img/user.png'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'


const AboutMe = () => {
  return (
    <div className={s.aboutMeWrapper}>
      <div className={s.name}>
        <div><img src={user} alt="avatar"/></div>
        <div className={s.nameRole}>
          <span className={s.name}>Максим</span>
          <span className={s.role}>Укулеле</span>
        </div>
      </div>
      <div className={s.row}/>
      <div className={s.contacts}>
        <span className={s.phoneCode}>+380 <span className={s.phoneNumber}>631112233</span></span>
        <div className={s.row}/>
        <span className={s.email}>maksim.ukulele@gmail.com</span>
        <div className={s.row}/>
      </div>
      <div className={s.buttons}>
        <NavLink
          to="/edit"
          className={[s.btn, s.edit].join(' ')}
        >
          Редагувати
        </NavLink>
        <Logout/>
      </div>
    </div>
  )
}

export default AboutMe
