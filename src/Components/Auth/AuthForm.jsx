import React from 'react'
import s from './AuthForm.module.css'
import { connect } from 'react-redux'
import AuthNavLinks from '../common/AuthNavLinks'
import { assert } from "../../errors"
import BasicAuth from "../../Pages/BasicAuth"
import { MuzSoyuzRequest } from "../../muzsoyuz-request"


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized,
  }
}

const mapDispatchToProps = dispatch => ({
  authPageRoute: (type) => {
    dispatch({
      type: 'AUTH_PAGE',
      currentRoute: type,
    })
  },
  fetchAuthStatusSuccess: () => {
    dispatch({
      type: 'FETCH_AUTH_STATUS_SUCCESS',
      payload: true,
    })
  },
  fetchAuthStatusFailure: (error) => {
    dispatch({
      type: 'FETCH_AUTH_STATUS_FAILURE',
      payload: { error },
    })
  },
})

class AuthForm extends BasicAuth {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailValidity: false,
      password: '',
      passwordValidity: false,
      confirmPassword: '',
      confirmPasswordValidity: false,
    }
  }

  componentDidMount() {
    this.props.authPageRoute(this.props.type)
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.props.authPageRoute(this.props.type)
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handleEmailValidation(email) {
    this.setState({ emailValidity: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handlePasswordValidation(password) {
    this.setState({ passwordValidity: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password) })
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value })
  }

  handleConfirmPasswordValidation(password, confirmPassword) {
    this.setState({ confirmPasswordValidity: password === confirmPassword })
  }

  assertAuth(props, route) {
    assert(this.state.emailValidity, 'Проверьте ваш имейл')
    assert(this.state.passwordValidity, 'Проверьте ваш пароль')

    if (route === 'register') {
      assert(this.state.confirmPasswordValidity, 'Пароль не сходится')
    }
  }

  async handleAuthSubmit(e, route) {
    e.preventDefault()

    try {
      this.assertAuth(this.state, route)

      const response = await MuzSoyuzRequest.makeAuthentication(route, {
        email: this.state.email,
        password: this.state.password,
      })

      await this.setTokenToLocalStorage(response)

      this.props.fetchAuthStatusSuccess()
    } catch(error) {
      console.error(error.message)

      this.props.fetchAuthStatusFailure(error.message)
    }
  }

  drawRegForm() {
    return (
      <div className={s.authFormReg}>
        <AuthNavLinks/>
        <form action="" className={s.form}>
          <input type="email" placeholder="email" className={s.inputEmail} value={this.state.email}
                 onChange={this.handleEmailChange.bind(this)}
                 onBlur={this.handleEmailValidation.bind(this, this.state.email)}/>
          <input type="password" placeholder="password" className={s.inputPassword} value={this.state.password}
                 onChange={this.handlePasswordChange.bind(this)}
                 onBlur={this.handlePasswordValidation.bind(this, this.state.password)}/>
          <input type="password" placeholder="confirm password" className={s.inputConfirmPassword}
                 value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange.bind(this)}
                 onBlur={this.handleConfirmPasswordValidation.bind(this, this.state.password, this.state.confirmPassword)}/>
          <input type="submit" className={s.inputSubmit} value=''
                 onClick={(e) => this.handleAuthSubmit.call(this, e, 'register')}/>
        </form>
      </div>
    )
  }

  drawLoginForm() {
    return (
      <div className={s.authFormLog}>
        <AuthNavLinks/>
        <form action="" className={s.form}>
          <input type="email" placeholder="email" className={s.inputEmail} value={this.state.email}
                 onChange={this.handleEmailChange.bind(this)}
                 onBlur={this.handleEmailValidation.bind(this, this.state.email)}/>
          <input type="password" placeholder="password" className={s.inputPassword} value={this.state.password}
                 onChange={this.handlePasswordChange.bind(this)}
                 onBlur={this.handlePasswordValidation.bind(this, this.state.password)}/>
          <div className={s.rememberAndForgot}>
            <input type="checkbox" className={s.rememberMe}/><p>запомнить меня</p>
            <a href="/">Забыли Пароль?</a>
          </div>
          <input type="submit" className={s.inputSubmit} value=''
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
