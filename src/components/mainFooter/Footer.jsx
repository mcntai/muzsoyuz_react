import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Footer.module.css'
import findJob from '../../assets/img/findJob.svg'
import mainPage from '../../assets/img/mainPage.svg'
import offerJob from '../../assets/img/offerJob.svg'

const Footer = () => (
  <div className={s.footer}>
    <div className={s.navWrapper}>
      <NavLink to="/find-job" className={s.nav} activeClassName={s.active}>
        <img src={findJob} alt="find-job-icon"/>
        Вакансії
      </NavLink>
    </div>
    <div className={s.navWrapper}>
      <NavLink to="/" className={s.nav} exact={true} activeClassName={s.active}>
        <img src={mainPage} alt="main page icon"/>
        Головна
      </NavLink>
    </div>
    <div className={s.navWrapper}>
      <NavLink to="/offer-job" className={s.nav} activeClassName={s.active}>
        <img src={offerJob} alt="offer-job-icon"/>
        Розмістити
      </NavLink>
    </div>
  </div>
)

export default Footer