import React from 'react';
import s from './AuthForm.module.css';
import { handleAuthSubmit } from '../../actions/asyncAuthActions'
import { connect } from 'react-redux';
import AuthNavLinks from '../common/AuthNavLinks';


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
		},
		authPageRoute: () => {
			dispatch({
				type: 'AUTH_PAGE',
				currentRoute: window.location.href.replace('http://localhost:3000/', '')
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
  }
  
  componentDidMount() {
    this.props.authPageRoute()
  }
	
	// #FORM_TYPE_MAP = {
  //   register: this.drawRegForm.bind(this),
  //   login: this.drawLoginForm.bind(this),
	//
  // }

  drawRegForm() {
    return (
      <div className={s.authFormReg}>
	      <AuthNavLinks />
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
	      <AuthNavLinks />
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
  
  render() {
    return (
	    <div>
		    {
		    	this.state.type === 'register'
			    ? this.drawRegForm()
				  : this.drawLoginForm()
		    }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
