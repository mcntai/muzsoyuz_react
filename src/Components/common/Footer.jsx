import React from 'react'
import s from './Footer.module.css'
import findJob from '../../Assets/img/findJob.svg'
import mainPage from '../../Assets/img/mainPage.svg'
import offerJob from '../../Assets/img/offerJob.svg'
import { NavLink } from 'react-router-dom'


class Footer extends React.Component {

  render() {
    return (
      <div className={s.footer}>
        <div>
          <NavLink to="/find-job"><img src={findJob} alt="find-job-icon"/>Вакансії</NavLink>
        </div>
        <div>
          <NavLink to="/"><img src={mainPage} alt="main page icon"/>Головна</NavLink>
        </div>
        <div className={s.offerJob}>
          <NavLink to="/offer-job"><img src={offerJob} alt="offer-job-icon"/>Розмістити</NavLink>
        </div>
      </div>
    )
  }
}

export default Footer