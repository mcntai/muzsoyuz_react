import React from 'react'
import { error as errorAlert } from './alerts'
import s from './Loader.module.css'

function Loader({ children, loading, error }) {
  return (
    <>
      {
        loading
          ? <div className={s.loaderWrapper}>
            <div className={s.loaderLine}/>
          </div>
          : null
      }
      {children}
      {
        error
          ? console.log(error)
          : null
      }
    </>

  )
}

export default Loader
