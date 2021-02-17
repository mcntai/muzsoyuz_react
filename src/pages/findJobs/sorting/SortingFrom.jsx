import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import s from './SortingFrom.module.css'
import { sortOffers } from '../../../slice/offers'
import history from '../../../history/history'


const SortingFrom = ({ param, display, btnTextFirst, btnTextSecond }) => {
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false)
  let visible = display ? s.visible : s.hidden

  useEffect(() => {
    if (redirect) {
      history.push('/find-job')
    }
  }, [redirect])

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
    </div>
  )
}


export default connect(undefined)(SortingFrom)