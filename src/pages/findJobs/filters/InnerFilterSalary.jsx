import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './InnerFilterSalary.module.css'
import { filterSalary, selectSalary } from '../../../slice/offers'


const InnerFilterSalary = () => {
  const dispatch = useDispatch()
  const salary = useSelector(selectSalary)

  const enterSalary = (e) => {
    let value = e.target.value
    let range = e.target.getAttribute('datafld')

    // dispatch(filterSalary({ value, range }))
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
            value={salary.from}
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
            value={salary.to}
            className={s.input}
            onChange={enterSalary}
          />
        </label>
      </div>
    </div>
  )
}

export default InnerFilterSalary