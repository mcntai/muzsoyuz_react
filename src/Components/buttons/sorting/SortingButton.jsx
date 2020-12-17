import React, { useState } from 'react'
import SortingFrom from './SortingFrom'
import s from './SortingButton.module.css'


const SortingButton = ({ btnName, title, btnTextFirst, btnTextSecond }) => {
  const [trigger, setTrigger] = useState(false)

  const showMenu = () => {
    setTrigger(!trigger)
  }

  const hideMenu = () => {
    setTrigger(false)
  }

  return (
    <div>
      <input
        type="button"
        className={s.sortBtnWrapper}
        onClick={showMenu}
        onBlur={hideMenu}
        defaultValue={title}
      />
      <SortingFrom
        btnName={btnName}
        trigger={trigger}
        btnTextFirst={btnTextFirst}
        btnTextSecond={btnTextSecond}
      />
    </div>
  )
}


export default SortingButton