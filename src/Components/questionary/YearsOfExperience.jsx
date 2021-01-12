import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import s from './Questionary.module.css'


const YearsOfExperience = ({ count }) => {
  const [year, setYear] = useState(null)

  useEffect(() => {
    async function sendYearsOfExperience() {

    }

    sendYearsOfExperience()
  }, [year])

  const chooseExperience = (e) => {
    setYear(e.target.name)
  }

  return (
    <>
      <input
        type="button"
        name={count}
        value={count}
        className={s.expBtn}
        onClick={chooseExperience}
      />
    </>
  )
}

export default YearsOfExperience