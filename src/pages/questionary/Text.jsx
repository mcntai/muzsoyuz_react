import React from 'react'
import { useSelector } from 'react-redux'
import { selectShowText } from '../../slice/general'


const Text = ({ text, textWrapperClass, textClass }) => {
  const showText = useSelector(selectShowText)

  return (
    <div className={textWrapperClass}>
      {
        showText
        ? <span className={textClass}>{text}</span>
        : null
      }
    </div>
  )
}

export default Text