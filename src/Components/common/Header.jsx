import React from 'react'
import s from './Header.module.css'
import profile from '../../Assets/img/profile.png'
import chat from '../../Assets/img/chat.png'
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

  renderHeaderLoggedIn() {
    return (
      <div className={s.headerLoggedIn}>
        <NavLink to="/chat"><img src={chat} alt="chat-icon"/><span
          className={s.chatCounter}>{this.state.chatCount}</span></NavLink>
        <NavLink to="/profile"><img src={profile} alt="profile-icon"/></NavLink>
      </div>
    )
  }

  renderHeaderLoggedOut() {
    return (
      <div className={s.headerLoggedOut}>
        <NavLink to="/login" className={s.loginButton}>Войти</NavLink>
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          this.props.authorized
          ? this.renderHeaderLoggedIn()
          : this.renderHeaderLoggedOut()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Header)