import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthForm from './AuthForm'
import SocialMedias from './SocialMedias'
import PopUp from '../../components/common/popUp'
import { useDispatch, useSelector } from 'react-redux'
import { selectError } from '../../reducers/errorsReducer'
import { clearError } from '../../actions/errors'
import s from './Auth.module.css'
import logo from '../../assets/img/logo.svg'


const Auth = ({ type }) => {
  const error = useSelector(selectError)
  const dispatch = useDispatch()

  return (
    <div className={s.wrapper}>
      <div>
        <NavLink to='/'><img src={logo} alt="Logo" className={s.logo}/></NavLink>
      </div>
      <PopUp text={error} type="fail" callback={() => dispatch(clearError())}/>
      <AuthForm type={type}/>
      <SocialMedias type={type}/>
    </div>
  )
}

export default Auth
