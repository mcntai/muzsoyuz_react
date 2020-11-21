import React from 'react'
import s from './AuthForm.module.css'
import { connect } from 'react-redux'
import AuthNavLinks from '../common/AuthNavLinks'
import { argumentAssert } from '../../errors'
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
      email                  : '',
      emailValidity          : false,
      password               : '',
      passwordValidity       : false,
      confirmPassword        : '',
      confirmPasswordValidity: false,
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

  handleEmailValidation(email) {
    this.setState({ emailValidity: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handlePasswordValidation(password) {
    this.setState({ passwordValidity: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/.test(password) })
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value })
  }

  handleConfirmPasswordValidation(password, confirmPassword) {
    this.setState({ confirmPasswordValidity: password === confirmPassword })
  }

  assertAuth(props, route) {
    argumentAssert(this.state.emailValidity, 'Мінімум 4 символа')
    argumentAssert(this.state.passwordValidity, 'Мінімум 8 символів включаючи цифру')

    if (route === 'register') {
      argumentAssert(this.state.confirmPasswordValidity, 'Повторно введений пароль не співпадає')
    }
  }

  async handleAuthSubmit(e, route) {
    e.preventDefault()

    try {
      this.assertAuth(this.state, route)

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
          <input type="email" placeholder="імейл" className={s.inputEmail} value={this.state.email}
                 onChange={this.handleEmailChange.bind(this)}
                 onBlur={this.handleEmailValidation.bind(this, this.state.email)}/>
          <input type="password" placeholder="пароль" className={s.inputPassword} value={this.state.password}
                 onChange={this.handlePasswordChange.bind(this)}
                 onBlur={this.handlePasswordValidation.bind(this, this.state.password)}/>
          <input type="password" placeholder="підтвердіть пароль" className={s.inputConfirmPassword}
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
          <input type="email" placeholder="імейл" className={s.inputEmail} value={this.state.email}
                 onChange={this.handleEmailChange.bind(this)}
                 onBlur={this.handleEmailValidation.bind(this, this.state.email)}/>
          <input type="password" placeholder="пароль" className={s.inputPassword} value={this.state.password}
                 onChange={this.handlePasswordChange.bind(this)}
                 onBlur={this.handlePasswordValidation.bind(this, this.state.password)}/>
          <div className={s.rememberAndForgot}>
            <input type="checkbox" className={s.rememberMe}/><p>запам'ятати мене</p>
            <a href="/">Забули Пароль?</a>
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

export default connect(mapStateToProps)(AuthForm)