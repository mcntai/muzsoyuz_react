import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'
import CollapseButton from '../findJobs/filters/CollapseButton'
import InputNameProfile from './InputNameProfile'
import InstrumentProfile from './InstrumentProfile'
import InputPhoneProfile from './InputPhoneProfile'
import CalendarProfile from './CalendarProfile'
import Logout from './Logout'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { pageRoute } from '../../actions/routingActions'
import * as swalAlert from '../../components/common/alerts'
import avatar from '../../assets/img/avatar.svg'
import settings from '../../assets/img/settings.svg'
import s from './Profile.module.css'
import { selectProfile } from '../../slice/user'
import { STAGES } from '../../slice/utils/constants'


const mapStateToProps = state => {
  return {
    prevRoute : state.pageReducer.prevRoute
  }
}

const Profile = ({ prevRoute, dispatch }) => {
  const [profileData, setProfileData] = useState({})
  const user = useSelector(selectProfile)

  useEffect(() => {
    dispatch(pageRoute('PROFILE', prevRoute))

    async function fetchData() {
      try {
        const response = await MuzSoyuzRequest.getUserProfile()
        setProfileData(response)
      }
      catch (e) {
        swalAlert.error(e.message, 'Упс!')
      }
    }

    fetchData()
  }, [])


  const userAuthorized = () => {
    return (
      <div className={s.profileWrapper}>
        <div className={s.profileTopSection}>
          <NavLink to={prevRoute} className={s.backBtn}/>
          <div className={s.topContentWrapper}>
            <div className={s.avatarWrapper}>
            <img src={profileData.imageURL || avatar} alt="avatar" className={s.avatar}/>
            </div>
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
        user?.status !== STAGES.SUCCESS
        ? <Redirect to='/login'/>
        : userAuthorized()
      }
    </>
  )
}


export default connect(mapStateToProps)(Profile)