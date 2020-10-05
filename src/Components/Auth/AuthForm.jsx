import React from 'react';
import s from './AuthForm.module.css';
import { assert } from '../../errors';
import { handleAuthSubmit } from '../../actions/asyncAuthActions'
import { connect } from 'react-redux';


const mapStateToProps = state => {
	return {
		email: state.authReducer.email,
		emailValidity: state.authReducer.emailValidity,
		password: state.authReducer.password,
		passwordValidity: state.authReducer.passwordValidity,
		confirmPassword: state.authReducer.confirmPassword,
		confirmPasswordValidity: state.authReducer.confirmPasswordValidity
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleEmailChange: (e) => {
			dispatch({
				type: 'EMAIL_CHANGE',
				payload: e.target.value
			})
		},
		handleEmailValidation: (email) => {
			dispatch({
				type: 'EMAIL_VALIDATE',
				payload: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
			})
		},
		handlePasswordChange: (e) => {
			dispatch({
				type: 'PASSWORD_CHANGE',
				payload: e.target.value
			})
		},
		handlePasswordValidation: (password) => {
			dispatch({
				type: 'PASSWORD_VALIDATE',
				payload: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password)
			})
		},
		handleConfirmPasswordChange: (e) => {
			dispatch({
				type: 'CONFIRM_PASSWORD_CHANGE',
				payload: e.target.value
			})
		},
		handleConfirmPasswordValidation: (password, confirmPassword) => {
			dispatch({
				type: 'CONFIRM_PASSWORD_VALIDATE',
				payload: password === confirmPassword
			})
		}
	}
}

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  #FORM_TYPE_MAP = {
    reg: this.drawRegForm.bind(this),
    login: this.drawLoginForm.bind(this),
    // oauthFacebook: this.oauthCallback.bind(this, 'facebook'),
    // oauthGoogle: this.oauthCallback.bind(this, 'google'),
  }

  drawRegForm() {
    return (
      <div className={s.authFormReg}>
        <div className={s.header}>
          <a href="/login">Вход</a>
          <a href="/register" className={s.register}>Регистрация</a>
        </div>
        <form action="" className={s.form}>
          <input type="email" placeholder="email" className={s.inputEmail} value={this.props.email} onChange={(e) => this.props.handleEmailChange(e)} onBlur={() => this.props.handleEmailValidation(this.props.email)} />
          <input type="password" placeholder="password" className={s.inputPassword} value={this.props.password} onChange={(e) => this.props.handlePasswordChange(e)} onBlur={() => this.props.handlePasswordValidation(this.props.password)} />
          <input type="password" placeholder="confirm password" className={s.inputConfirmPassword} value={this.props.confirmPassword} onChange={(e) => this.props.handleConfirmPasswordChange(e)} onBlur={() => this.props.handleConfirmPasswordValidation(this.props.password, this.props.confirmPassword)} />
          <input type="submit" className={s.inputSubmit} value='' onClick={(e) => handleAuthSubmit.call(this, e, 'register')} />
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
          <input type="email" placeholder="email" className={s.inputEmail} value={this.props.email} onChange={(e) => this.props.handleEmailChange(e)} onBlur={() => this.props.handleEmailValidation(this.props.email)} />
          <input type="password" placeholder="password" className={s.inputPassword} value={this.props.password} onChange={(e) => this.props.handlePasswordChange(e)} onBlur={() => this.props.handlePasswordValidation(this.props.password)} />
          <div className={s.rememberAndForgot}>
            <input type="checkbox" className={s.rememberMe}/><p>запомнить меня</p>
            <a href="/">Забыли Пароль?</a>
          </div>
          <input type="submit" className={s.inputSubmit} value='' onClick={(e) => handleAuthSubmit.call(this, e, 'login')} />
        </form>
      </div>
    );
  }
  

  // async authHandler(response) {
  //   assert(response.ok, response.statusText)
	//
  //   const { token } = await response.json();
	//
  //   localStorage.setItem('token', token);
	//
  //   alert(JSON.stringify({ token }))
  // }
	//
  // oauthCallback(provider) {
  //   const path = window.location.href.replace(`http://localhost:3000/oauth/${provider}/callback`, '')
	//
  //   fetch(`http://localhost:9000/api/v1/oauth/${provider}/callback/${path}`)
  //     .then(this.authHandler)
  //     .catch(console.error)
  // }
	//
  // async handleSubmit(e, route) {
  //   e.preventDefault();
	//
  //   const assertRegister = props => {
  //     assert(props.emailValidity, 'Проверьте ваш имейл')
  //     assert(props.passwordValidity, 'Проверьте ваш пароль')
  //     assert(props.confirmPasswordValidity, 'Пароль не сходится')
  //   }
	//
  //   try {
  //     if (route === 'register') {
  //       assertRegister(this.props);
  //     }
	//
  //     const response = await fetch(`http://localhost:9000/api/v1/auth/${route}`, {
  //       method: 'POST',
  //       body: JSON.stringify({email: this.props.email, password: this.props.password}),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
	//
  //     await this.authHandler(response)
  //   } catch (error) {
  //     alert(error.message)
  //   }
  // }


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

// export default AuthForm;
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);