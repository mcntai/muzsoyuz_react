import React from 'react'
import { connect } from 'react-redux'
import AuthNavLinks from './AuthNavLinks'
import { authValidator } from '../../validators'
import { authenticateUser } from '../../actions/user'
import BasicAuth from './BasicAuth'
import { authPageRoute } from '../../actions/routingActions'
import * as swal from '../../components/common/alerts'
import s from './AuthForm.module.css'


const mapStateToProps = state => {
  return {
    user: state.user,
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
      gender         : '',
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

  handleGender(e) {
    let gender = e.target.getAttribute('datafld')
    this.setState({ gender })
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

  handleAuthSubmit(e, route) {
    e.preventDefault()

    this.props.dispatch(authenticateUser({
      route,
      body: {
        email   : this.state.email,
        password: this.state.password,
      }
    }))
  }

  drawRegForm() {
    return (
      <div className={s.authFormReg}>
        <AuthNavLinks/>
        <form action="" className={s.form}>

          <div className={s.inputWrapper}>
            <span className={s.textErr}>{this.state.emailErr}</span>
            <input
              type="email"
              name="email"
              placeholder="Імейл"
              className={s.input}
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
              onBlur={(e) => this.validateInput(e, 'emailErr')}
            />
          </div>

          <div className={s.inputWrapper}>
            <span className={s.textErr}>{this.state.passwordErr}</span>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              className={s.input}
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
              onBlur={(e) => this.validateInput(e, 'passwordErr')}
            />
          </div>

          <div className={s.inputWrapper}>
            <span className={s.textErr}>{this.state.confirmErr}</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Повторити пароль"
              className={s.input}
              value={this.state.confirmPassword}
              onChange={this.handleChange.bind(this)}
              onBlur={(e) => this.validateInput(e, 'confirmErr', this.state.password)}
            />
          </div>

          <div className={s.genderWrapper}>
            <span className={s.genderTitle}>Стать</span>
            <div
              tabIndex={1}
              datafld='жін'
              className={s.genderInput}
              onClick={this.handleGender.bind(this)}
            >
              жін
            </div>
            <div
              tabIndex={1}
              datafld='чол'
              className={s.genderInput}
              onClick={this.handleGender.bind(this)}
            >
              чол
            </div>
          </div>

          <button
            className={s.inputSubmit}
            onClick={(e) => this.handleAuthSubmit.call(this, e, 'register')}
          >
            Зареєструватися
          </button>
        </form>
      </div>
    )
  }

  drawLoginForm() {
    const submit = this.props.type === 'login' ? s.inputSubmitLogin : s.inputSubmit

    return (
      <div className={s.authFormLog}>
        <AuthNavLinks/>
        <form action="" className={s.form}>

          <div className={s.inputWrapper}>
            <span className={s.textErr}>{this.state.emailErr}</span>
            <input
              type="email"
              name="email"
              placeholder="Імейл"
              className={s.input}
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
              onBlur={(e) => this.validateInput(e, 'emailErr')}
            />
          </div>

          <div className={s.inputWrapper}>
            <span className={s.textErr}>{this.state.passwordErr}</span>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              className={s.input}
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
              onBlur={(e) => this.validateInput(e, 'passwordErr')}
            />
          </div>

          <button
            className={submit}
            onClick={(e) => this.handleAuthSubmit.call(this, e, 'login')}
          >
            Увійти
          </button>
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
          this.handleRedirect(this.props?.user?.profile)
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(AuthForm)