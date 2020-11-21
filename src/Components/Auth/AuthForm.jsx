import React from 'react'
import s from './AuthForm.module.css'
import { connect } from 'react-redux'
import AuthNavLinks from '../common/AuthNavLinks'
import { mapAuthValidation } from '../../errors'
import BasicAuth from '../../Pages/BasicAuth'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { fetchAuthStatusSuccess } from '../../actions/getProfileActions'
import { fetchAuthStatusFailure } from '../../actions/getProfileActions'
import { authPageRoute } from '../../actions/routingActions'
import * as swal from '../common/Alerts'


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized,
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

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value })
  }

  validateInput(e, name) {
    let value = e.target.value

    try {
      mapAuthValidation[name](value)
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

      console.log(response)
      await this.setDataToLocalStorage(response)

      this.props.dispatch(fetchAuthStatusSuccess())
    }
    catch (error) {
      swal.unauthorized(error.message, 'Упс!')

      this.props.dispatch(fetchAuthStatusFailure(error.message))
    }
  }

  drawRegForm() {
    return (
      <div className={s.authFormReg}>
        <AuthNavLinks/>
        <form action="" className={s.form}>
          <span className={s.textErr}>{this.state.emailErr}</span>
          <input
            type="email"
            placeholder="імейл"
            className={s.inputEmail}
            value={this.state.email}
            onChange={this.handleEmailChange.bind(this)}
            onBlur={(e) => this.validateInput(e, 'emailErr')}
          />
          <span className={s.textErr}>{this.state.passwordErr}</span>
          <input
            type="password"
            placeholder="пароль"
            className={s.inputPassword}
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
            onBlur={(e) => this.validateInput(e, 'passwordErr')}
          />
          <span className={s.textErr}>{this.state.confirmErr}</span>
          <input
            type="password"
            placeholder="підтвердіть пароль"
            className={s.inputConfirmPassword}
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordChange.bind(this)}
            onBlur={(e) => this.validateInput(e, 'confirmErr')}
          />
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
          <input
            type="email"
            placeholder="імейл"
            className={s.inputEmail}
            value={this.state.email}
            onChange={this.handleEmailChange.bind(this)}
            onBlur={(e) => this.validateInput(e, 'emailErr')}
          />
          <span className={s.textErr}>{this.state.passwordErr}</span>
          <input
            type="password"
            placeholder="пароль"
            className={s.inputPassword}
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
            onBlur={(e) => this.validateInput(e, 'passwordErr')}
          />
          <div className={s.rememberAndForgot}>
            <input
              type="checkbox"
              className={s.rememberMe}
            />
            <p>
              запам'ятати мене
            </p>
            <a href="/">
              Забули Пароль?
            </a>
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