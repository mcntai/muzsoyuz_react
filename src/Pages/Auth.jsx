import React from 'react'
import s from './Auth.module.css'
import logo from '../Assets/img/logo.svg'
import AuthForm from '../Components/auth/AuthForm'
import SocialMedias from '../Components/auth/SocialMedias'
import { NavLink } from 'react-router-dom'


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
