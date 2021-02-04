import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './InnerFilterSalary.module.css'
import { filterSalary, selectSalary } from '../../../slice/offers'
import { debounce } from 'lodash'


const InnerFilterSalary = () => {
  const [inputFromValue, setInputFromValue] = useState(null);
  const [inputToValue, setInputToValue] = useState(null);
  const dispatch = useDispatch()
  const salary = useSelector(selectSalary)

  const makeDispatch = (value, range) => {
    dispatch(filterSalary({ value, range }))
  }

  const makeDispatchDebounced = useRef(debounce(makeDispatch, 500));

  const enterSalary = (e) => {
    let value = e.target.value
    let range = e.target.getAttribute('datafld')

    range === 'from'
    ? setInputFromValue(value)
    : setInputToValue(value)

    makeDispatchDebounced.current(value, range)
  }


  return (
    <div className={s.salaryWrapper}>
      <div className={s.salaryInputWrapper}>
        <label className={s.label}>
          від
          <input
            type="number"
            pattern="\d*"
            datafld='from'
            value={inputFromValue || salary.from}
            className={s.input}
            onChange={enterSalary}
          />
        </label>
        <label className={s.label}>
          до
          <input
            type="number"
            pattern="\d*"
            datafld='to'
            value={inputToValue || salary.to}
            className={s.input}
            onChange={enterSalary}
          />
        </label>
      </div>
    </div>
  )
}

export default InnerFilterSalary