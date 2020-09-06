import React from 'react';
import s from './Header.module.css';
import profile from '../../Assets/img/profile.png';
import chat from '../../Assets/img/chat.png';

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
        <a href="/chat"><img src={chat} alt="chat-icon" /><span className={s.chatCounter}>{this.state.chatCount}</span></a>
        <a href="/profile"><img src={profile} alt="profile-icon" /></a>
      </div>
    );
  }
}

export default Header;