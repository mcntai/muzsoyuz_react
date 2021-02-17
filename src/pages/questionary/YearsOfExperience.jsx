import React from 'react'
import s from './ChooseExperiencePage.module.css'
import { useDispatch } from 'react-redux'
import { userProfileUpdate } from '../../actions/user'


const YearsOfExperience = ({sendYearForUpdate}) => {

  const chooseExperience = (e) => {
    const exp = Number(e.target.getAttribute('data-year'))
    sendYearForUpdate(exp)
  }

  return (
    <>
      {
        Array.from(Array(5).keys(), n => n + 1).map(el => {
          return (
            <div
              key={el}
              data-year={el}
              tabIndex={1}
              className={s.expBtn}
              onClick={chooseExperience}
            >
              {
                el < 5
                ? el
                : `${el}+`
              }
            </div>
          )
        })
      }
    </>
  )
}

export default YearsOfExperience