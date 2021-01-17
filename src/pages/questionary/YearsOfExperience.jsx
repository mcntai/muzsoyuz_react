import React, { useState, useEffect } from 'react'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import * as swalAlert from '../../components/common/alerts'
import s from './ChooseExperiencePage.module.css'


const YearsOfExperience = () => {
  const [year, setYear] = useState(null)

  useEffect(() => {
    async function sendYearsOfExperience() {
      try {
        await MuzSoyuzRequest.makeProfileUpdate({ yearCommercialExp: year })
      }
      catch (e) {
        swalAlert.error(e.message, 'Упс...')
      }
    }

    sendYearsOfExperience()
  }, [year])

  const chooseExperience = (e) => {
    const exp = e.target.getAttribute('datafld')
    setYear(Number(exp))
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