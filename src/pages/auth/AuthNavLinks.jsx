import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './AuthForm.module.css'


class AuthNavLinks extends React.Component {

  render() {
    return (
        <div className={s.header}>
          <NavLink to="/login" activeClassName={s.login}>Вхід</NavLink>
          <NavLink to="/register" activeClassName={s.register}>Реєстрація</NavLink>
        </div>
    )
  }
}

export default AuthNavLinks