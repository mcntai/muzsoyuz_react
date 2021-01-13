import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthForm from './AuthForm'
import SocialMedias from './SocialMedias'
import s from './Auth.module.css'
import logo from '../../Assets/img/logo.svg'


class Auth extends React.Component {

  render() {
    return (
      <div className={s.wrapper}>
        <div>
          <NavLink to='/'><img src={logo} alt="Logo" className={s.logo}/></NavLink>
        </div>
        <AuthForm type={this.props.type}/>
        <SocialMedias type={this.props.type}/>
      </div>
    )
  }
}

export default Auth
