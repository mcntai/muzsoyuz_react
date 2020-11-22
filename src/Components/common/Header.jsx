import React from 'react'
import s from './Header.module.css'
import profile from '../../Assets/img/profile.png'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatCount: '',
    }
  }

  renderHeader() {
    return (
      <div className={s.headerLoggedIn}>
        <NavLink to="/profile"><img src={profile} alt="profile-icon"/></NavLink>
      </div>
    )
  }

  // renderHeaderLoggedIn() {
  //   return (
  //     <div className={s.headerLoggedIn}>
  //       <NavLink to="/profile"><img src={profile} alt="profile-icon"/></NavLink>
  //     </div>
  //   )
  // }
  //
  // renderHeaderLoggedOut() {
  //   return (
  //     <div className={s.headerLoggedOut}>
  //       {/*<NavLink to="/login" className={s.loginButton}>Ввійти</NavLink>*/}
  //       <NavLink to="/profile"><img src={profile} alt="profile-icon"/></NavLink>
  //     </div>
  //   )
  // }

  render() {
    return (
      <div>
        {
          this.renderHeader()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Header)