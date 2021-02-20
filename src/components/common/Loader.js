import React from 'react'
import { error as errorAlert } from './alerts'
import preloader from '../../assets/img/preloader.gif'
import s from './Loader.module.css'


function Loader({ children, loading, error }) {
  if (loading) {
    return (
      <div className={s.wrapper}>
        <img className={s.spinner} alt="preloader" src={preloader}/>
      </div>
    )
  }

  if (error) {
    errorAlert(error)

    return null
  }

  return children
}

export default Loader
