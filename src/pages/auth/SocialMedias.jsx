import React from 'react'
import { config } from '../../config'
import s from './SocialMedias.module.css'


const appPath = config.getApiPath()

class SocialMedias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialIcons: '',
      authWith: '',
    }
  }

  componentDidMount() {
    const socialIcons = this.props.type === 'login' ? s.logIcons : s.regIcons
    const authWith = this.props.type === 'login' ? s.authWithLogin : s.authWith

    this.setState({ socialIcons, authWith })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const socialIcons = this.props.type === 'login' ? s.logIcons : s.regIcons
    const authWith = this.props.type === 'login' ? s.authWithLogin : s.authWith

    if(prevProps.type !== this.props.type) {
      this.setState({ socialIcons, authWith })
    }
  }

  #FORM_TYPE_MAP = {
    register: 'зареєструватись',
    login   : 'увійти',
  }

  getLinks() {
    return (
      <div className={this.state.socialIcons}>
        <a href={appPath + '/oauth/link/facebook'}>
          <input
            type="button"
            className={s.facebookIcon}
            value="Facebook"
          />
        </a>
        <a href={appPath + '/oauth/link/google'}>
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
        <p className={this.state.authWith}>{`або ${word} через`}</p>
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