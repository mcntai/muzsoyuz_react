import React, { useState } from 'react'
import SortingFrom from './SortingFrom'
import s from './SortingButton.module.css'


const SortingButton = ({ param, title, btnTextFirst, btnTextSecond }) => {
  const [display, setDisplay] = useState(false)

  const showMenu = () => {
    setDisplay(!display)
  }

  const hideMenu = () => {
    setDisplay(false)
  }

  return (
    <div>
      <div
        tabIndex={1}
        className={s.sortBtnWrapper}
        onClick={showMenu}
        onBlur={hideMenu}
      >
        {title}
      </div>
      <SortingFrom
        param={param}
        display={display}
        btnTextFirst={btnTextFirst}
        btnTextSecond={btnTextSecond}
      />
    </div>
  )
}


export default SortingButton