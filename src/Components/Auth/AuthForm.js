import React from 'react';
import s from './AuthForm.module.css';


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
    if (response.ok) {
      let result = await response.json();

      localStorage.setItem('token', result.token);
      console.log(result)
    }
    else {
      alert("Ошибка: " + response.status);
    }
  }

  async handleSubmit(e, route) {
    e.preventDefault();

    const assertArguments = (condition, message) => {
      if (!condition) {
        throw new Error(message)
      }
    }

    const assertRegister = state => {
      assertArguments(state.emailValidity, 'Проверьте ваш имейл')
      assertArguments(state.passwordValidity, 'Проверьте ваш пароль')
      assertArguments(state.confirmPasswordValidity, 'Пароль не сходится')
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
    const formType = this.state.type;
    return (
      <div>
        {
          formType === 'reg'
            ? this.drawRegForm()
            : this.drawLoginForm()
        }
      </div>
    );
  }
}

export default AuthForm;