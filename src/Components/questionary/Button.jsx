import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import s from './Questionary.module.css'


const mapStateToProps = state => {
  return {
    finishBtn: state.questReducer.finishBtn,
  }
}

const Button = ({ btnText, nextRoute, btnClass, finishBtn, handleSubmit }) => {
  const btn = finishBtn === true ? s.finishBtn : ''

  return (
    <>
      <NavLink
        to={nextRoute}
        className={[btnClass, btn].join(' ')}
        onClick={handleSubmit}
      >
        {btnText}
      </NavLink>
    </>
  )
}

export default connect(mapStateToProps)(Button)