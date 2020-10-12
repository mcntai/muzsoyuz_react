import React from 'react'
import s from './Header.module.css'
import profile from '../../Assets/img/profile.png'
import chat from '../../Assets/img/chat.png'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


const mapStateToProps = state => {
  return {
    isLoggedIn: state.getProfileReducer.isLoggedIn,
  }
}


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatCount: '',
    }
  }

  render() {
    return (
      <div className={s.header}>
        <NavLink to="/chat"><img src={chat} alt="chat-icon"/><span className={s.chatCounter}>{this.state.chatCount}</span></NavLink>
        {
          this.props.isLoggedIn
          ? <NavLink to="/profile"><img src={profile} alt="profile-icon"/></NavLink>
          : <NavLink to="/login" className={s.loginButton}>Войти</NavLink>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Header)