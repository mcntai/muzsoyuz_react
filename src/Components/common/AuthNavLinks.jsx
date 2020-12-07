import React from 'react'
import s from '../auth/AuthForm.module.css'
import { NavLink } from 'react-router-dom'


class AuthNavLinks extends React.Component {

  render() {
    return (
      <div>
        <div className={s.header}>
          <NavLink to="/login" activeClassName={s.login}>Вхід</NavLink>
          <NavLink to="/register" activeClassName={s.register}>Реєстрація</NavLink>
        </div>
      </div>
    )
  }
}

export default AuthNavLinks