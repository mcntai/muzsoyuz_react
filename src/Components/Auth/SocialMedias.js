import React from 'react';
import './SocialMedias.css';


class SocialMedias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.drawRegSocialBtns = this.drawRegSocialBtns.bind(this);
    this.drawLoginSocialBtns = this.drawLoginSocialBtns.bind(this);
    this.facebookHandler = this.facebookHandler.bind(this);
    this.googleHandler = this.googleHandler.bind(this);
  }

  drawRegSocialBtns() {
    return (
    <div className="social_medias flex-col">
      <div className="social-medias__text montserrat-normal">или зарегистрироваться с помощью</div>
      <div className="social-medias__icons">
        <a href="http://localhost:9000/oauth/facebook"><input type="button" className="social-medias__icons__fb icons-styles montserrat-normal focus links-btn" value="Facebook" /></a>
        <a href="http://localhost:9000/oauth/google"><input type="button" className="social-medias__icons__google icons-styles montserrat-normal focus links-btn" value="Google" /></a>
      </div>
    </div>
    );
  }


  drawLoginSocialBtns() {
    return (
    <div className="social-medias flex-col">
      <div className="social-medias__text montserrat-normal">или войти с помощью</div>
      <div className="social-medias__icons">
        <a href="http://localhost:9000/oauth/facebook"><input type="button" className="social-medias__icons__fb icons-styles montserrat-normal focus links-btn" value="Facebook" /></a>
        <a href="http://localhost:9000/oauth/google"><input type="button" className="social-medias__icons__google icons-styles montserrat-normal focus links-btn" value="Google" /></a>
      </div>
    </div>
    );
  }

  async facebookHandler() {
    alert('Facebook')
  }

  async googleHandler() {
    alert('Google')
  }


  render() {
    const formType = this.state.type;
    return (
      <div className="socialmedias">
        {
          formType === 'reg'
          ? this.drawRegSocialBtns()
          : this.drawLoginSocialBtns()
        }
      </div>
    );
  }
}

export default SocialMedias;