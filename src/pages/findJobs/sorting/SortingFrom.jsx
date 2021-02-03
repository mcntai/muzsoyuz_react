import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Redirect } from 'react-router'
import s from './SortingFrom.module.css'
import { sortOffers } from '../../../slice/offers'


const SortingFrom = ({ param, trigger, btnTextFirst, btnTextSecond }) => {
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false)
  const visible = trigger ? s.visible : s.hidden

  const handleSorting = (e) => {
    const sortType = e.target.getAttribute('datafld')
    dispatch(sortOffers({ param, sortType }))

    setRedirect(true)
  }

  return (
    <div className={[s.sortingModalWrapper, visible, s.defaultPosition].join(' ')}>
      <div className={s.sortingBtnWrapper}>
        <button
          datafld='DESC'
          onClick={handleSorting}
          className={s.btn}
        >
          {btnTextFirst}
        </button>
        <button
          datafld='ASC'
          onClick={handleSorting}
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