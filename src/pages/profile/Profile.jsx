import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { goBack, updateImage } from '../../actions/user'
import CollapseButton from '../findJobs/filters/CollapseButton'
import InputNameProfile from './InputNameProfile'
import InstrumentProfile from './InstrumentProfile'
import InputPhoneProfile from './InputPhoneProfile'
import SinglePickCalendar from '../../components/common/SinglePickCalendar'
import Logout from './Logout'
import ImageUpdate from "../../components/common/ImageUpdate"
import { selectProfile } from '../../slice/user'
import avatar from '../../assets/img/avatar.svg'
import settings from '../../assets/img/settings.svg'
import s from './Profile.module.css'
import styles from './CalendarProfile.module.css'


const Profile = () => {
  const userImage = useSelector(selectProfile('imageURL'))
  const dispatch = useDispatch()

  return (
    (
      <div className={s.profileWrapper}>
        <div className={s.profileTopSection}>
          <span className={s.backBtn} onClick={() => dispatch(goBack())}/>
          <div className={s.topContentWrapper}>
            <div className={s.avatarWrapper}>
              <ImageUpdate uploadImageCallback={updateImage}>
                <img src={userImage || avatar} alt="avatar" className={s.avatar}/>
              </ImageUpdate>
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
            innerContent={<SinglePickCalendar styles={styles}/>}
          />
        </div>
        <Logout btnWrapper={s.logoutBtnWrapper}/>
      </div>
    )
  )
}


export default Profile