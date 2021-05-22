import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as FindJob } from '../../assets/img/findJob.svg'
import { ReactComponent as MainPage } from '../../assets/img/mainPage.svg'
import { ReactComponent as OfferJob } from '../../assets/img/offerJob.svg'
import s from './Footer.module.css'

const Footer = () => (
  <div className={s.footer}>
    <div className={s.navWrapper}>
      <NavLink to="/find-job" className={s.nav} activeClassName={s.active}>
        <FindJob className={s.image}/>
        Вакансії
      </NavLink>
    </div>
    <div className={s.navWrapper}>
      <NavLink to="/" className={s.nav} exact={true} activeClassName={s.active}>
        <MainPage className={s.image}/>
        Головна
      </NavLink>
    </div>
    <div className={s.navWrapper}>
      <NavLink to="/offer-job" className={s.nav} activeClassName={s.active}>
        <OfferJob className={s.image}/>
        Розмістити
      </NavLink>
    </div>
  </div>
)

export default Footer