import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterSalary, selectSalary } from '../../../redux/slice/offers'
import { debounce } from 'lodash'
import s from './InnerFilterSalary.module.css'

const InnerFilterSalary = () => {
  const [inputFromValue, setInputFromValue] = useState(null)
  const [inputToValue, setInputToValue] = useState(null)
  const dispatch = useDispatch()
  const salary = useSelector(selectSalary)

  const debounced = useRef(
    debounce((value, range) => {
      dispatch(filterSalary({ value, range }))
    }, 1000)
  )

  const enterSalary = e => {
    const value = e.target.value
    const range = e.target.getAttribute('data-range')

    range === 'from'
      ? setInputFromValue(value)
      : setInputToValue(value)

    debounced.current(value, range)
  }

  return (
    <div>
      <div className={s.salaryInputWrapper}>
        <label className={s.label}>
          від
          <input
            type="number"
            pattern="\d*"
            data-range='from'
            defaultValue={!inputFromValue ? salary.from : inputFromValue}
            className={s.input}
            onChange={enterSalary}
          />
        </label>
        <label className={s.label}>
          до
          <input
            type="number"
            pattern="\d*"
            data-range='to'
            defaultValue={!inputToValue ? salary.to : inputToValue}
            className={s.input}
            onChange={enterSalary}
          />
        </label>
      </div>
    </div>
  )
}

export default InnerFilterSalary