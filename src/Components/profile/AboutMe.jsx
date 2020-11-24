import React from 'react'
import s from './AboutMe.module.css'
import avatar from '../../Assets/img/avatar.svg'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'


const AboutMe = ({ user }) => {
  const {name, role, phone, email, type} = user

  return (
    <div className={s.aboutMeWrapper}>
      <div className={s.name}>
        <div><img src={avatar} alt="avatar"/></div>
        <div className={s.nameRole}>
          <span className={s.name}>
            {
              name
              ? name
              : "Ваше ім'я"
            }
          </span>
          <span className={s.role}>
            {
              type === 'musician' || 'teacher' || 'student'
              ? role
              : null
            }
          </span>
        </div>
      </div>
      <div className={s.row}/>
      <div className={s.contacts}>
        <span className={s.phoneCode}>
          +380
          <span className={s.phoneNumber}>
          {
            phone
            ? phone
            : ' XXX-XX-XX'
          }
        </span>
        </span>
        <div className={s.row}/>
        <span className={s.email}>{email}</span>
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
