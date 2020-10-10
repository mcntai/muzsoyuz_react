import React from 'react';
import s from './Auth.module.css';
import logo from '../Assets/img/logo.png';
import AuthForm from '../Components/Auth/AuthForm';
import SocialMedias from '../Components/Auth/SocialMedias';



class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type
    }
  }

  render() {
    return (
        <div className={s.wrapper}>
          <div className={s.header}>
            <img src={logo} alt="Logo" className={s.logo} />
              <p className={s.brandName}><span className={s.muz}>Muz</span> soyuz</p>
          </div>
          <AuthForm type={this.state.type} />
          <SocialMedias type={this.state.type} />
        </div>
    );
  }
}

export default Auth;
