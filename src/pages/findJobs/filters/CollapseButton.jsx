import React, { useState } from 'react'
import arrowIcon from '../../../assets/img/arrow-bottom.svg'
import s from './CollapseButton.module.css'


const CollapseButton = ({ btnWrapper, filterName, title, innerContent }) => {
  const [collapse, setCollapse] = useState(true)
  const [hide, setHide] = useState(s.hideContent)
  const [show, setShow] = useState('')
  const [arrow, setArrow] = useState('')


  const toggle = () => {
    const close = hide === s.hideContent ? '' : s.hideContent
    const open = show === '' ? s.showContent : ''
    const arrowUp = arrow === '' ? s.arrowUp : ''

    setCollapse(!collapse)
    setShow(open)
    setHide(close)
    setArrow(arrowUp)
  }

  return (
    <div>
      <div className={btnWrapper} onClick={toggle}>
        <span className={filterName}>{title}</span>
        <img src={arrowIcon} className={[arrow, s.arrowSize].join(" ")} alt="arrow-icon"/>
      </div>
      <div className={[show, hide].join(' ')}>
        {innerContent}
      </div>
    </div>
  )
}

export default CollapseButton