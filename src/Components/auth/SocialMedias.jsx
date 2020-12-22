import React from 'react'
import { config } from '../../config'
import s from './SocialMedias.module.css'


const appPath = config.getApiPath()

class SocialMedias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialIcons: '',
    }
  }

  componentDidMount() {
    const socialIcons = this.props.type === 'login' ? s.logIcons : s.regIcons

    this.setState({ socialIcons })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const socialIcons = this.props.type === 'login' ? s.logIcons : s.regIcons

    if(prevProps.type !== this.props.type) {
      this.setState({ socialIcons })
    }
  }

  #FORM_TYPE_MAP = {
    register: 'зареєструватись',
    login   : 'увійти',
  }

  getLinks() {
    // const socialIcons = this.props.type === 'login' ? s.logIcons : s.regIcons

    return (
      <div className={this.state.socialIcons}>
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