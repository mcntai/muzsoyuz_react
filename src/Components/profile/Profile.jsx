import React from 'react'
import s from './Profile.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import HeaderInternalButtons from '../common/HeaderInternalButtons'
import AboutMe from './AboutMe'


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized
  }
}

const handleLogoutRedux = () => ({
  type: 'LOGOUT',
})

class Profile extends React.Component {

  // handleLogOut(dispatch) {
  //   try {
  //     localStorage.removeItem('token')
  //     localStorage.removeItem('userId')
  //
  //     dispatch(handleLogoutRedux())
  //   }
  //   catch (error) {
  //     alert(error.message)
  //   }
  // }

  userAuthorized() {
    return (
      <div className={s.profileWrapper}>
        <div className={s.profileHeader}>
          <span className={s.back}>&lt;</span>
          <span className={s.profile}>Профіль</span>
        </div>
        <div className={s.headerButtons}>
          <HeaderInternalButtons first="Про себе" second="Налаштування"/>
        </div>
        <div className={s.row}/>
        <AboutMe/>
      </div>
    )
  }

  userUnAuthorized() {
    return (
      <div className={s.headerLoggedIn}>
        <NavLink to="/login" className={s.loginButton}>Ввійти</NavLink>
      </div>
    )
  }

  // userAuthorized() {
  //   return (
  //     <div className={s.headerLoggedOut}>
  //       <NavLink
  //         to=""
  //         className={s.logoutButton}
  //         onClick={() => this.props.dispatch(this.handleLogOut)}
  //       >
  //         Выйти
  //       </NavLink>
  //     </div>
  //   )
  // }

  render() {
    return (
      <div>
        {
          this.props.authorized
          ? this.userAuthorized()
          : this.userUnAuthorized()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Profile)