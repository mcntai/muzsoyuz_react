import React from 'react'
import logo from '../../Assets/img/logo.svg'
import s from './Questionary.module.css'


const BackgroundImage = ({ img, imgClass }) => {
  return (
    <div className={s.imgWrapper}>
      <img src={logo} className={s.logo} alt="logo"/>
      <img src={img} className={imgClass} alt="background"/>
    </div>
  )
}

export default BackgroundImage