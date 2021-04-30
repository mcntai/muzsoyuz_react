import React from 'react'
import AuthForm from './AuthForm'
import SocialMedias from './SocialMedias'
import PopUp from '../../components/common/popUp'
import { useDispatch, useSelector } from 'react-redux'
import { selectError } from '../../redux/reducers/errorsReducer'
import { clearError } from '../../redux/actions/errors'
import { goToHomePage } from '../../redux/actions/user'
import s from './Auth.module.css'
import logo from '../../assets/img/logo.svg'


const Auth = ({ type }) => {
  const error = useSelector(selectError)
  const dispatch = useDispatch()

  return (
    <div className={s.wrapper}>
      <div>
        <img src={logo} alt="Logo" className={s.logo} onClick={() => dispatch(goToHomePage())}/>
      </div>
      <PopUp text={error} type="fail" callback={() => dispatch(clearError())}/>
      <AuthForm type={type}/>
      <SocialMedias type={type}/>
    </div>
  )
}

export default Auth
