import React from 'react'
import s from './AuthForm.module.css'
import { connect } from 'react-redux'
import AuthNavLinks from '../common/AuthNavLinks'
import { authValidator } from '../../validators'
import BasicAuth from '../../Pages/BasicAuth'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { fetchAuthStatusSuccess } from '../../actions/getProfileActions'
import { fetchAuthStatusFailure } from '../../actions/getProfileActions'
import { authPageRoute } from '../../actions/routingActions'
import * as swal from '../common/Alerts'


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized,
    role      : state.authReducer.role,
  }
}

class AuthForm extends BasicAuth {
  constructor(props) {
    super(props)
    this.state = {
      email          : '',
      password       : '',
      confirmPassword: '',
      emailErr       : '',
      passwordErr    : '',
      confirmErr     : '',
    }
  }

  componentDidMount() {
    this.props.dispatch(authPageRoute(this.props.type))
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.props.dispatch(authPageRoute(this.props.type))
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateInput(e, name, prevValue) {
    let value = e.target.value

    try {
      authValidator(name, value, prevValue)
      this.setState({ [name]: '' })
    }
    catch (e) {
      this.setState({ [name]: e.message })
    }
  }

  async handleAuthSubmit(e, route) {
    e.preventDefault()

    try {
      const response = await MuzSoyuzRequest.makeAuthentication(route, {
        email   : this.state.email,
        password: this.state.password,
      })

      await this.setDataToLocalStorage(response)

      this.props.dispatch(fetchAuthStatusSuccess(response.profile.role))
    }
    catch (e) {
      if (e.message === 'Unauthorized') {
        swal.error(e.message, 'Упс!')
      } else {
        swal.error(e.message, 'Хммм')
      }

      this.props.dispatch(fetchAuthStatusFailure(e.message))
    }
  }

  drawRegForm() {
    return (
      <div className={s.authFormReg}>
        <AuthNavLinks/>
        <form action="" className={s.form}>

          <span className={s.textErr}>{this.state.emailErr}</span>
          <div className={s.inputWrapper}>
            <div className={s.emailIcon}></div>
            <input
              type="email"
              name="email"
              placeholder="імейл"
              className={s.input}
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
              onBlur={(e) => this.validateInput(e, 'emailErr')}
            />
          </div>

          <span className={s.textErr}>{this.state.passwordErr}</span>
          <div className={s.inputWrapper}>
            <div className={s.passwordIcon}></div>
            <input
              type="password"
              name="password"
              placeholder="пароль"
              className={s.input}
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
              onBlur={(e) => this.validateInput(e, 'passwordErr')}
            />
          </div>

          <span className={s.textErr}>{this.state.confirmErr}</span>
          <div className={s.inputWrapper}>
            <div className={s.passwordIcon}></div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="підтвердіть пароль"
              className={s.input}
              value={this.state.confirmPassword}
              onChange={this.handleChange.bind(this)}
              onBlur={(e) => this.validateInput(e, 'confirmErr', this.state.password)}
            />
          </div>

          <input
            type="submit"
            className={s.inputSubmit}
            value=''
            onClick={(e) => this.handleAuthSubmit.call(this, e, 'register')}
          />
        </form>
      </div>
    )
  }

  drawLoginForm() {
    return (
      <div className={s.authFormLog}>
        <AuthNavLinks/>
        <form action="" className={s.form}>

          <span className={s.textErr}>{this.state.emailErr}</span>
          <div className={s.inputWrapper}>
            <div className={s.emailIcon}></div>
            <input
              type="email"
              name="email"
              placeholder="імейл"
              className={s.input}
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
              onBlur={(e) => this.validateInput(e, 'emailErr')}
            />
          </div>

          <span className={s.textErr}>{this.state.passwordErr}</span>
          <div className={s.inputWrapper}>
            <div className={s.passwordIcon}></div>
            <input
              type="password"
              name="password"
              placeholder="пароль"
              className={s.input}
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
              onBlur={(e) => this.validateInput(e, 'passwordErr')}
            />
          </div>

          <input
            type="submit"
            className={s.inputSubmit}
            value=''
            onClick={(e) => this.handleAuthSubmit.call(this, e, 'login')}/>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          this.props.type === 'register'
          ? this.drawRegForm()
          : this.drawLoginForm()
        }
        {
          this.handleRedirect()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(AuthForm)