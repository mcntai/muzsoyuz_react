import React from 'react'
import s from './ChooseExperiencePage.module.css'
import { useDispatch } from 'react-redux'
import { userProfileUpdate } from '../../actions/user'


const YearsOfExperience = () => {
  const dispatch = useDispatch()

  const chooseExperience = (e) => {
    const exp = Number(e.target.getAttribute('datafld'))

    dispatch(userProfileUpdate({ yearCommercialExp: exp }))
  }

  return (
    <>
      {
        Array.from(Array(5).keys(), n => n + 1).map(el => {
          return (
            <div
              key={el}
              datafld={el}
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