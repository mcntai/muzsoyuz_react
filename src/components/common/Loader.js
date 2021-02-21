import React from 'react'
import { error as errorAlert } from './alerts'
import preloader from '../../assets/img/preloader.gif'
import s from './Loader.module.css'
import loaderLine from '../../assets/img/loaderline.gif'


function Loader({ children, loading, error }) {
  // if (loading) {
  //   return (
  //     <div className={s.wrapper}>
  //       <img className={s.spinner} alt="preloader" src={preloader}/>
  //     </div>
  //   )
  // }
  //
  // if (error) {
  //   errorAlert(error)
  //
  //   return null
  // }

  return (
    <>
      {
        loading
          ? <img className={s.spinner} alt="preloader" src={loaderLine}/>
          : null
      }
      {children}
    </>

  )
}

export default Loader
