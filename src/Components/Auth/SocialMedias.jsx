import React from 'react';
import s from './SocialMedias.module.css';


class SocialMedias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type
    }
  }

  #FORM_TYPE_MAP = {
    register: 'зарегистрироваться',
    login: 'войти',
  }

  getLinks() {
    return (
      <div className={s.socialIcons}>
        <a href="http://localhost:9000/api/v1/auth/oauth/facebook"><input type="button" className={s.facebookIcon} value="Facebook" /></a>
        <a href="http://localhost:9000/api/v1/auth/oauth/google"><input type="button" className={s.googleIcon} value="Google" /></a>
      </div>
    )
  }

  drawAuthSocialBtns(word) {
    return (
    <div className={s.socialMedias}>
      <p className={s.authWith}>{word && `или ${word} с помощью`}</p>
      {word && this.getLinks()}
    </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.drawAuthSocialBtns(this.#FORM_TYPE_MAP[this.state.type])
        }
      </div>
    );
  }
}

export default SocialMedias;