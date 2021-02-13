import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Redirect } from 'react-router'
import s from './SortingFrom.module.css'
import { sortOffers } from '../../../slice/offers'


const SortingFrom = ({ param, display, btnTextFirst, btnTextSecond }) => {
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false)
  let visible = display ? s.visible : s.hidden

  const handleSorting = (e) => {
    const sortType = e.target.getAttribute('data-sort')
    dispatch(sortOffers({ param, sortType }))

    setRedirect(true)
  }

  return (
    <div className={[s.sortingModalWrapper, visible, s.defaultPosition].join(' ')}>
      <div className={s.sortingBtnWrapper}>
        <button
          data-sort='DESC'
          onMouseDown={handleSorting}
          className={s.btn}
        >
          {btnTextFirst}
        </button>
        <button
          data-sort='ASC'
          onMouseDown={handleSorting}
          className={s.btn}
        >
          {btnTextSecond}
        </button>
      </div>
      <button
        className={[s.btn, s.cancelBtn].join(' ')}
      >
        Відмінити
      </button>
      {
        redirect && <Redirect to="/find-job"/>
      }
    </div>
  )
}


export default connect(undefined)(SortingFrom)