import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import CollapseButton from '../findJobs/filters/CollapseButton'
import InputNameProfile from './InputNameProfile'
import InstrumentProfile from './InstrumentProfile'
import InputPhoneProfile from './InputPhoneProfile'
import CalendarProfile from './CalendarProfile'
import Logout from './Logout'
import { pageRoute } from '../../actions/routingActions'
import { selectUserImage } from '../../slice/user'
import avatar from '../../assets/img/avatar.svg'
import settings from '../../assets/img/settings.svg'
import s from './Profile.module.css'


const mapStateToProps = state => {
  return {
    prevRoute: state.pageReducer.prevRoute
  }
}

const Profile = ({ prevRoute, dispatch }) => {
  const userImage = useSelector(selectUserImage)

  useEffect(() => {
    dispatch(pageRoute('PROFILE', prevRoute))
  }, [])


  return (
    (
      <div className={s.profileWrapper}>
        <div className={s.profileTopSection}>
          <NavLink to={prevRoute} className={s.backBtn}/>
          <div className={s.topContentWrapper}>
            <div className={s.avatarWrapper}>
              <img src={userImage || avatar} alt="avatar" className={s.avatar}/>
            </div>
            <InputNameProfile/>
          </div>
        </div>
        <div className={s.profileMiddleSection}>
          <div className={s.profileTitleSettingsWrapper}>
            <span className={s.profileTitle}>Профіль</span>
            <NavLink to='/profile'><img src={settings} className={s.settings} alt='settings'/></NavLink>
          </div>
          <CollapseButton
            title={'Твій інструмент'}
            btnWrapper={s.btnWrapperInstrument}
            filterName={s.filterName}
            innerContent={<InstrumentProfile/>}
          />
          <InputPhoneProfile/>
          <CollapseButton
            title={'Вільні дні'}
            btnWrapper={s.btnWrapperCalendar}
            filterName={s.filterName}
            innerContent={<CalendarProfile/>}
          />
        </div>
        <Logout btnWrapper={s.logoutBtnWrapper}/>
      </div>
    )
  )
}


export default connect(mapStateToProps)(Profile)