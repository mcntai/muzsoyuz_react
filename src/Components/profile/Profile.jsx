import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'
import CollapseButton from '../buttons/filters/CollapseButton'
import InputNameProfile from './InputNameProfile'
import InstrumentProfile from './InstrumentProfile'
import InputPhoneProfile from './InputPhoneProfile'
import CalendarProfile from './CalendarProfile'
import Logout from './Logout'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { pageRoute } from '../../actions/routingActions'
import * as swalAlert from '../common/Alerts'
import avatar from '../../Assets/img/avatar.svg'
import settings from '../../Assets/img/settings.svg'
import s from './Profile.module.css'


const mapStateToProps = state => {
  return {
    loading   : state.authReducer.loading,
    authorized: state.authReducer.authorized,
    prevRoute : state.pageReducer.prevRoute
  }
}

const Profile = ({ loading, authorized, prevRoute, dispatch }) => {
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    dispatch(pageRoute('PROFILE', prevRoute))

    async function fetchData() {
      try {
        const response = await MuzSoyuzRequest.getUserProfile()
        setProfileData(response)
        console.log(response)
      }
      catch (e) {
        swalAlert.error(e.message, 'Упс!')
      }
    }

    fetchData()
  }, [prevRoute, dispatch])


  const userAuthorized = () => {
    return (
      <div className={s.profileWrapper}>
        <div className={s.profileTopSection}>
          <NavLink to={prevRoute} className={s.backBtn}/>
          <div className={s.avatarWrapper}>
            <img src={profileData.imageURL || avatar} alt="avatar"/>
            <InputNameProfile data={profileData.name}/>
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
            innerContent={<InstrumentProfile defaultInstrument={{ role: profileData.role }}/>}
          />
          <InputPhoneProfile data={profileData.phone}/>
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
  }

  return (
    <>
      {
        authorized === false
        ? <Redirect to='/login'/>
        : userAuthorized()
      }
    </>
  )
}


export default connect(mapStateToProps)(Profile)