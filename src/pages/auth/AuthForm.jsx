import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AuthNavLinks from './AuthNavLinks'
import { authValidator } from '../../validators'
import { authenticateUser } from '../../redux/actions/user'
import s from './AuthForm.module.css'


const initialInputStates = {
  email          : '',
  password       : '',
  confirmPassword: '',
  emailErr       : '',
  passwordErr    : '',
  confirmErr     : '',
}

const AuthForm = ({ type }) => {
  const [inputs, setInputs] = useState(initialInputStates)
  const [gender, setGender] = useState('')
  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  function handleGender(e) {
    const gender = e.target.getAttribute('data-gender')
    setGender(gender)
  }

  function validateInput(e, name, prevValue) {
    const value = e.target.value

    try {
      authValidator(name, value, prevValue)
      setInputs({ ...inputs, [name]: '' })
    }
    catch (e) {
      setInputs({ ...inputs, [name]: e.message })
    }
  }

  function handleAuthSubmit(e, route) {
    e.preventDefault()

    dispatch(authenticateUser({
      route,
      body: {
        email   : inputs.email,
        password: inputs.password,
      }
    }))
  }

  function drawRegForm() {
    return (
      <div className={s.authFormReg}>
        <AuthNavLinks/>
        <form action="" className={s.form}>

          <div className={s.inputWrapper}>
            <span className={s.textErr}>{inputs.emailErr}</span>
            <input
              type="email"
              name="email"
              autoComplete="on"
              placeholder="Імейл"
              className={s.input}
              value={inputs.email}
              onChange={handleChange}
              onBlur={(e) => validateInput(e, 'emailErr')}
            />
          </div>

          <div className={s.inputWrapper}>
            <span className={s.textErr}>{inputs.passwordErr}</span>
            <input
              type="password"
              name="password"
              autoComplete="on"
              placeholder="Пароль"
              className={s.input}
              value={inputs.password}
              onChange={handleChange}
              onBlur={(e) => validateInput(e, 'passwordErr')}
            />
          </div>

          <div className={s.inputWrapper}>
            <span className={s.textErr}>{inputs.confirmErr}</span>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="on"
              placeholder="Повторити пароль"
              className={s.input}
              value={inputs.confirmPassword}
              onChange={handleChange}
              onBlur={(e) => validateInput(e, 'confirmErr', inputs.password)}
            />
          </div>

          <div className={s.genderWrapper}>
            <span className={s.genderTitle}>Стать</span>
            <div
              tabIndex={1}
              data-gender='жін'
              className={s.genderInput}
              onClick={handleGender}
            >
              жін
            </div>
            <div
              tabIndex={1}
              data-gender='чол'
              className={s.genderInput}
              onClick={handleGender}
            >
              чол
            </div>
          </div>

          <button
            className={s.inputSubmit}
            onClick={(e) => handleAuthSubmit(e, 'signUp')}
          >
            Зареєструватися
          </button>
        </form>
      </div>
    )
  }

  function drawLoginForm() {
    const submit = type === 'login' ? s.inputSubmitLogin : s.inputSubmit

    return (
      <div className={s.authFormLog}>
        <AuthNavLinks/>
        <form action="" className={s.form}>

          <div className={s.inputWrapper}>
            <span className={s.textErr}>{inputs.emailErr}</span>
            <input
              type="email"
              name="email"
              autoComplete="on"
              placeholder="Імейл"
              className={s.input}
              value={inputs.email}
              onChange={handleChange}
              onBlur={(e) => validateInput(e, 'emailErr')}
            />
          </div>

          <div className={s.inputWrapper}>
            <span className={s.textErr}>{inputs.passwordErr}</span>
            <input
              type="password"
              name="password"
              autoComplete="on"
              placeholder="Пароль"
              className={s.input}
              value={inputs.password}
              onChange={handleChange}
              onBlur={(e) => validateInput(e, 'passwordErr')}
            />
          </div>

          <button
            className={submit}
            onClick={(e) => handleAuthSubmit(e, 'signIn')}
          >
            Увійти
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {
        type === 'register'
        ? drawRegForm()
        : drawLoginForm()
      }
    </div>
  )
}

export default AuthForm