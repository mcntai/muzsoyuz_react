import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { pageRoute } from '../../actions/routingActions'
import HeaderInternal from '../common/HeaderInternal'
import HeaderInternalButtons from '../common/HeaderInternalButtons'
import notifications from '../../Assets/img/notifications.svg'
import twoFactors from '../../Assets/img/2fa.svg'
import autoLogout from '../../Assets/img/auto-logout.svg'
import s from './Settings.module.css'


const mapStateToProps = state => {
  return {
    prevRoute: state.pageReducer.prevRoute
  }
}


const Settings = ({dispatch, prevRoute}) => {
  useEffect( () => {
    dispatch(pageRoute('SETTINGS', prevRoute))
  })

  return (
    <div className={s.settingsPageWrapper}>
      <HeaderInternal
        prevRoute={prevRoute}
        heading="Профіль"
        wrapperClass={s.headerWrapper}
        btnTextClass={s.headerBtnText}
        redirectTo=""
      />
      <div className={s.sortFilterButtons}>
      <HeaderInternalButtons
        firstText="Про себе"
        firstRoute='/profile'
        secondText="Налаштування"
        secondRoute='/settings'
      />
      </div>
      <div className={s.row}/>
      <div className={s.settingsContainer}>
      <div className={s.settingsWrapper}>
        <img src={notifications} alt="settings" className={s.settingsImg}/>
        <span className={s.settingsText}>Оповіщення і звуки</span>
      </div>
      <div className={s.settingsWrapper}>
        <img src={twoFactors} alt="2fa" className={s.settingsImg}/>
        <span className={s.settingsText}>2-факторна аутентифікація</span>
      </div>
      <div className={s.settingsWrapper}>
        <img src={autoLogout} alt="logout" className={s.settingsImg}/>
        <span className={s.settingsText}>Авто розлогін</span>
      </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Settings)