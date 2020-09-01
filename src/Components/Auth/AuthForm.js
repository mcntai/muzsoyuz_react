import React from 'react';
import './AuthForm.css';


class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      email: '',
      password: '',
      confirmPassword: ''
    }

    this.drawRegForm = this.drawRegForm.bind(this);
    this.drawLoginForm = this.drawLoginForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  drawRegForm() {
    return (
      <div className="form flex-col shadow">
        <div className="form__header montserrat-normal">
          <div><a href="/login">Вход</a></div>
          <div className="form__header__register"><a href="/register">Регистрация</a></div>
        </div>
        <form action="" className="form__form flex-col">
          <input type="email" placeholder="email"
                 className="input-email montserrat-normal input-icon-position focus" value={this.state.email}
                 onChange={this.handleEmailChange}/>
          <input type="password" placeholder="password"
                 className="input-password montserrat-normal input-icon-position focus"
                 value={this.state.password} onChange={this.handlePasswordChange}/>
          <input type="password" placeholder="confirm password"
                 className="input-confirm-password montserrat-normal input-icon-position focus"
                 value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange}/>
          <div className="btn-background"><input type="submit" className="input-submit focus" value='' onClick={this.handleSubmit} /></div>
        </form>
      </div>
    );
  }

  drawLoginForm() {
    return (
      <div className="form flex-col shadow">
        <div className="form__header montserrat-normal">
          <div className="form__header__login"><a href="/login">Вход</a></div>
          <div><a href="/register">Регистрация</a></div>
        </div>
        <form action="" className="form__form flex-col">
          <input type="email" placeholder="email"
                 className="input-email montserrat-normal input-icon-position focus" value={this.state.email}
                 onChange={this.handleEmailChange}/>
          <input type="password" placeholder="password"
                 className="input-password montserrat-normal input-icon-position focus"
                 alue={this.state.password} onChange={this.handlePasswordChange}/>
          <div className="form__form-login-text flex-col montserrat-normal">
            <input type="checkbox" className="remember-login"/><p>запомнить меня</p>
            <a href="#">Забыли Пароль?</a>
          </div>
          <div className="btn-background"><input type="submit" className="input-submit focus" value=''
                                                 onClick={this.handleSubmit}/></div>
        </form>
      </div>
    );
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange(event) {
    this.setState({confirmPassword: event.target.value});
  }

  async handleSubmit(e) {
    e.preventDefault();

    let response = await fetch('http://localhost:9000/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      let result = await response.json();

      console.dir(JSON.stringify(result))
    } else {
      alert("Ошибка: " + response.status);
    }
  }


  render() {
    const formType = this.state.type;
    return (
      <div className="authform" onLoad={this.drawForm}>
        {
          formType == 'reg'
            ? this.drawRegForm()
            : this.drawLoginForm()
        }
      </div>
    );
  }
}

export default AuthForm;