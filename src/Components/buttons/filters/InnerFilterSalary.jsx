import React, { useState } from 'react'
import { connect } from 'react-redux'
import { filterSalary } from '../../../actions/filterActions'
import s from './InnerFilterSalary.module.css'


const InnerFilterSalary = (props) => {
  const [minSalary, setMinSalary] = useState(0)
  const [maxSalary, setMaxSalary] = useState(60000)

  const enterMinSalary = (e) => {
    setMinSalary(e.target.value)
  }
  const enterMaxSalary = (e) => {
    setMaxSalary(e.target.value)
  }

  const fixSalary = () => {
    if(minSalary > 0) {
      props.dispatch(filterSalary(minSalary, maxSalary))
    }
    else if(maxSalary < 60000) {
      props.dispatch(filterSalary(minSalary, maxSalary))
    }
  }

  return (
    <div className={s.salaryWrapper}>
      <div className={s.salaryInputWrapper}>
        <label className={s.label}>
          від
        <input
          type="number"
          pattern="\d*"
          className={s.input}
          value={minSalary}
          onChange={enterMinSalary}
          onBlur={fixSalary}
        />
      </label>
        <label className={s.label}>
          до
        <input
          type="number"
          pattern="\d*"
          className={s.input}
          value={maxSalary}
          onChange={enterMaxSalary}
          onBlur={fixSalary}
        />
        </label>
      </div>
      {/*<div className={s.salaryRangeWrapper}>*/}
      {/*  <input*/}
      {/*    type="range"*/}
      {/*    min="0"*/}
      {/*    max="30000"*/}
      {/*    className={s.range}*/}
      {/*    value={minSalary}*/}
      {/*    onChange={enterMinSalary}*/}
      {/*    onTouchEnd={fixSalary}*/}
      {/*    onMouseUp={fixSalary}*/}
      {/*  />*/}
      {/*  <input*/}
      {/*    type="range"*/}
      {/*    min="30001"*/}
      {/*    max="60000"*/}
      {/*    className={s.range}*/}
      {/*    value={maxSalary}*/}
      {/*    onChange={enterMaxSalary}*/}
      {/*    onTouchEnd={fixSalary}*/}
      {/*    onMouseUp={fixSalary}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  )
}

export default connect(undefined)(InnerFilterSalary)