import React from 'react';
import './SocialMedias.css';


class SocialMedias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type
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
        <input type="button" className="social-medias__icons__fb icons-styles montserrat-normal focus" value="Facebook" onClick={this.facebookHandler} />
        <input type="button" className="social-medias__icons__google icons-styles montserrat-normal focus" value="Google" onClick={this.googleHandler} />
      </div>
    </div>
    );
  }


  drawLoginSocialBtns() {
    return (
    <div className="social_medias flex-col">
      <div className="social-medias__text montserrat-normal">или войти с помощью</div>
      <div className="social-medias__icons">
        <input type="button" className="social-medias__icons__fb icons-styles montserrat-normal focus" value="Facebook" onClick={this.facebookHandler} />
        <input type="button" className="social-medias__icons__google icons-styles montserrat-normal focus" value="Google" onClick={this.googleHandler} />
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
          formType == 'reg'
          ? this.drawRegSocialBtns()
          : this.drawLoginSocialBtns()
        }
      </div>
    );
  }
}

export default SocialMedias;