import React from 'react';
import s from './SocialMedias.module.css';


class SocialMedias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type
    }
  }

  drawAuthSocialBtns(word) {
    return (
    <div className={s.socialMedias}>
      <p className={s.authWith}>или {word} с помощью</p>
      <div className={s.socialIcons}>
        <a href="http://localhost:9000/api/v1/oauth/facebook"><input type="button" className={s.facebookIcon} value="Facebook" /></a>
        <a href="http://localhost:9000/api/v1/oauth/google"><input type="button" className={s.googleIcon} value="Google" /></a>
      </div>
    </div>
    );
  }

  render() {
    const formType = this.state.type;
    return (
      <div>
        {
          this.drawAuthSocialBtns(formType === 'reg' ? 'зарегистрироваться' : 'войти')
        }
      </div>
    );
  }
}

export default SocialMedias;