import React from 'react'
import { useDispatch } from 'react-redux'
import s from './InnerFilterSets.module.css'
import { filterSets } from '../../../redux/slice/offers'


const InnerFilterSets = () => {
  const dispatch = useDispatch()

  const chooseSets = (e) => {
    dispatch(filterSets(Number(e.target.value)))
  }

  return (
    <div className={s.setsWrapper}>
      <select className={s.selector} onChange={chooseSets}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
  )
}

export default InnerFilterSets