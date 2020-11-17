import React from 'react'
import s from './Footer.module.css'
import findJob from '../../Assets/img/findJob.png'
import mainPage from '../../Assets/img/mainPage.png'
import offerJob from '../../Assets/img/offerJob.png'
import { NavLink } from 'react-router-dom'


class Footer extends React.Component {

  render() {
    return (
      <div className={s.footer}>
        <div>
          <NavLink to="/find-job"><img src={findJob} alt="find-job-icon"/>Найти работу</NavLink>
        </div>
        <div>
          <NavLink to="/"><img src={mainPage} alt="main page icon"/>Главная</NavLink>
        </div>
        <div className={s.offerJob}>
          <NavLink to="/offer-job"><img src={offerJob} alt="offer-job-icon"/>Предложить</NavLink>
        </div>
      </div>
    )
  }
}

export default Footer