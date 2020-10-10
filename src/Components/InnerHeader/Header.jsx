import React from 'react';
import s from './Header.module.css';
import profile from '../../Assets/img/profile.png';
import chat from '../../Assets/img/chat.png';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatCount: ''
    }
  }

  render() {
    return (
      <div className={s.header}>
        <NavLink to="/chat"><img src={chat} alt="chat-icon" /><span className={s.chatCounter}>{this.state.chatCount}</span></NavLink>
        <NavLink to="/profile"><img src={profile} alt="profile-icon" /></NavLink>
      </div>
    );
  }
}

export default Header;