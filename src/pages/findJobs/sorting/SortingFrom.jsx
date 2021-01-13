import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { sortDesc } from '../../../actions/filterActions'
import { sortAsc } from '../../../actions/filterActions'
import s from './SortingFrom.module.css'


const SortingFrom = ({ btnName, trigger, btnTextFirst, btnTextSecond, dispatch }) => {
  const [redirect, setRedirect] = useState(false)
  const visible = trigger ? s.visible : s.hidden

  const sortingDescending = () => {
    dispatch(sortDesc(btnName))

    setRedirect(!redirect)
  }

  const sortingAscending = () => {
    dispatch(sortAsc(btnName))

    setRedirect(!redirect)
  }

  return (
    <div className={[s.sortingModalWrapper, visible, s.defaultPosition].join(' ')}>
      <div className={s.sortingBtnWrapper}>
        <button
          name={btnName}
          onClick={sortingDescending}
          className={s.btn}
        >
          {btnTextFirst}
        </button>
        <button
          name={btnName}
          onClick={sortingAscending}
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
        redirect
        ? <Redirect to="/find-job"/>
        : null
      }
    </div>
  )
}


export default connect(undefined)(SortingFrom)