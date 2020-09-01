import React from 'react';
import './Auth.css';
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
        <div className="wraper flex-col">
          <div className="header flex-col">
            <img src={logo} alt="Logo" className="header__logo" />
            <div className="header__slogan montserrat-normal">
              <span className="slogan-music">Muz</span> Soyuz
            </div>
          </div>
          <AuthForm type={this.state.type} />
          <SocialMedias type={this.state.type} />
        </div>
    );
  }
}

export default Auth;
