import React from 'react'
import s from './HeaderInternalButtons.module.css'


const HeaderInternalButtons = ({ first, second }) => {
  return (
    <div className={s.sortFilterButtons}>
      <button>{first}</button>
      <button>{second}</button>
    </div>
  )
}

export default HeaderInternalButtons
