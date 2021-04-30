import React from 'react'
import s from './Header.module.css'
import profile from '../../assets/img/profile.svg'
import chat from '../../assets/img/chat.svg'
import { NavLink } from 'react-router-dom'


const Header = () => (
  <div className={s.profile}>
    <NavLink to='/chat'>
      <img src={chat} className={s.chatImg} alt="chat-icon"/>
    </NavLink>
    <NavLink to='/profile'>
      <img src={profile} className={s.profileImg} alt="profile-icon"/>
    </NavLink>
  </div>
)

export default Header