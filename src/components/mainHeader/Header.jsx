import React from 'react'
import s from './Header.module.css'
import profile from '../../assets/img/profile.svg'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized
  }
}

class Header extends React.Component {

  userAuthorized() {
    return (
      <div className={s.profile}>
        <NavLink to="/profile"><img src={profile} alt="profile-icon"/></NavLink>
      </div>
    )
  }

  userUnAuthorized() {
    return (
      <div className={s.profile}>
        <NavLink to="/login"><img src={profile} alt="profile-icon"/></NavLink>
      </div>
    )
  }

  render() {
    return (
      <>
        {
          this.props.authorized
          ? this.userAuthorized()
          : this.userUnAuthorized()
        }
      </>
    )
  }
}

export default connect(mapStateToProps)(Header)