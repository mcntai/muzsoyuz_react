import React from 'react';
import s from './AuthForm.module.css';
import { assert } from '../../errors';


class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      email: '',
      password: '',
      confirmPassword: '',
      emailValidity: false,
      passwordValidity: false,
      confirmPasswordValidity: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  #FORM_TYPE_MAP = {
    reg: this.drawRegForm.bind(this),
    login: this.drawLoginForm.bind(this),
    oauthFacebook: this.oauthCallback.bind(this, 'facebook'),
    oauthGoogle: this.oauthCallback.bind(this, 'google'),
  }

  drawRegForm() {
    return (
      <div className={s.authFormReg}>
        <div className={s.header}>
          <a href="/login">Вход</a>
          <a href="/register" className={s.register}>Регистрация</a>
        </div>
        <form action="" className={s.form}>
          <input type="email" placeholder="email" className={s.inputEmail} value={this.state.email} onChange={this.handleEmailChange} />
          <input type="password" placeholder="password" className={s.inputPassword} value={this.state.password} onChange={this.handlePasswordChange} />
          <input type="password" placeholder="confirm password" className={s.inputConfirmPassword} value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
          <input type="submit" className={s.inputSubmit} value='' onClick={(e) => this.handleSubmit.call(this, e, 'register')} />
        </form>
      </div>
    );
  }

  drawLoginForm() {
    return (
      <div className={s.authFormLog}>
        <div className={s.header}>
          <a href="/login" className={s.login}>Вход</a>
          <a href="/register">Регистрация</a>
        </div>
        <form action="" className={s.form}>
          <input type="email" placeholder="email" className={s.inputEmail} value={this.state.email} onChange={this.handleEmailChange} />
          <input type="password" placeholder="password" className={s.inputPassword} value={this.state.password} onChange={this.handlePasswordChange} />
          <div className={s.rememberAndForgot}>
            <input type="checkbox" className={s.rememberMe}/><p>запомнить меня</p>
            <a href="/">Забыли Пароль?</a>
          </div>
          <input type="submit" className={s.inputSubmit} value='' onClick={(e) => this.handleSubmit.call(this, e, 'login')} />
        </form>
      </div>
    );
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
    let email = this.state.email;
    let emailValidationRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.setState({emailValidity: emailValidationRegExp.test(email)});
  }

  handlePasswordChange(event) {
    let password = event.target.value;
    let passwordValidationRegExp = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    this.setState({password: password});
    this.setState({passwordValidity: passwordValidationRegExp.test(password)});
  }

  handleConfirmPasswordChange(event) {
    let password = this.state.password;
    this.setState({confirmPassword: event.target.value});
    let confirmPassword = event.target.value;

    this.setState({confirmPasswordValidity: confirmPassword === password});
  }

  async authHandler(response) {
    assert(response.ok, response.statusText)

    const { token } = await response.json();

    localStorage.setItem('token', token);

    alert(JSON.stringify({ token }))
  }

  oauthCallback(provider) {
    const path = window.location.href.replace(`http://localhost:3000/oauth/${provider}/callback`, '')

    fetch(`http://localhost:9000/api/v1/oauth/${provider}/callback/${path}`)
      .then(this.authHandler)
      .catch(console.error)
  }

  async handleSubmit(e, route) {
    e.preventDefault();

    const assertRegister = state => {
      assert(state.emailValidity, 'Проверьте ваш имейл')
      assert(state.passwordValidity, 'Проверьте ваш пароль')
      assert(state.confirmPasswordValidity, 'Пароль не сходится')
    }

    try {
      if (route === 'register') {
        assertRegister(this.state);
      }

      const response = await fetch(`http://localhost:9000/api/v1/auth/${route}`, {
        method: 'POST',
        body: JSON.stringify({email: this.state.email, password: this.state.password}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      await this.authHandler(response)
    } catch (error) {
      alert(error.message)
    }
  }


  render() {
    return (
      <div>
        {
          this.#FORM_TYPE_MAP[this.state.type]()
        }
      </div>
    );
  }
}

export default AuthForm;