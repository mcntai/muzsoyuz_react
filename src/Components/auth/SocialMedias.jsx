import React from 'react'
import { config } from '../../config'
import s from './SocialMedias.module.css'


const appPath = config.getApiPath()

class SocialMedias extends React.Component {

  #FORM_TYPE_MAP = {
    register: 'зареєструватись',
    login   : 'увійти',
  }

  getLinks() {
    return (
      <div className={s.socialIcons}>
        <a href={appPath + '/auth/oauth/facebook'}>
          <input
            type="button"
            className={s.facebookIcon}
            value="Facebook"
          />
        </a>
        <a href={appPath + '/auth/oauth/google'}>
          <input
            type="button"
            className={s.googleIcon}
            value="Google"
          />
        </a>
      </div>
    )
  }

  drawAuthSocialBtns(word) {
    return (
      <div className={s.socialMedias}>
        <p className={s.authWith}>{`або ${word} через`}</p>
        {
          this.getLinks()
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          this.drawAuthSocialBtns(this.#FORM_TYPE_MAP[this.props.type])
        }
      </div>
    )
  }
}

export default SocialMedias