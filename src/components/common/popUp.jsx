import React, { createRef, useEffect } from 'react'
import { errorsMap } from './errorsMap'
import s from './popUp.module.css'


const PopUp = ({ text, type, callback }) => {
  const ref = createRef()
  const backgroundColor = type === 'success' ? s.backgroundGreen : s.backgroundRed
  const textColor = type === 'success' ? s.textColorGreen : s.textColorRed
  const visible = text && text !== 'Unauthorized' ? s.visible : s.hidden

  useEffect(() => {
    if (text) {
      ref.current.focus()
    }
  }, [text])

  function onBlurActions() {
    setTimeout(() => {
      callback()
    }, 300)
  }

  return (
    <div
      tabIndex={1}
      className={[s.modalWrapper, s.defaultPosition, backgroundColor, visible].join(' ')}
      ref={ref}
      onBlur={onBlurActions}
    >
      <p className={[s.text, textColor].join(' ')}>{errorsMap[text] || text}</p>
    </div>
  )
}

export default PopUp