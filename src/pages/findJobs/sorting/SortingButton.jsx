import React, { useState } from 'react'
import SortingFrom from './SortingFrom'
import s from './SortingButton.module.css'


const SortingButton = ({ param, title, btnTextFirst, btnTextSecond }) => {
  const [trigger, setTrigger] = useState(false)

  const showMenu = () => {
    setTrigger(!trigger)
  }

  const hideMenu = () => {
    setTrigger(false)
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
        trigger={trigger}
        btnTextFirst={btnTextFirst}
        btnTextSecond={btnTextSecond}
      />
    </div>
  )
}


export default SortingButton