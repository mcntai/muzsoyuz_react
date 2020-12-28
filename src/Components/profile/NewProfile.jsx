import React, { useState, useEffect, useRef } from 'react'
import CollapseButton from '../buttons/filters/CollapseButton'
import CalendarProfile from './CalendarProfile'
import InstrumentProfile from './InstrumentProfile'
import { NavLink } from 'react-router-dom'
import { fetchAuthStatusFailure } from '../../actions/getProfileActions'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { pickChanges } from '../../utils/muzsoyuz/object'
import s from './NewProfile.module.css'
import avatar from '../../Assets/img/avatar.svg'
import edit from '../../Assets/img/edit-icon.svg'
import * as swalAlert from '../common/Alerts'


const NewProfile = () => {
  const [profileData, setProfileData] = useState({})
  const fetchedProfile = useRef({})
  const [disabled, setDisabled] = useState(true)
  const [finishedUpdating, setFinishedUpdating] = useState(false)

  useEffect(() => {

    async function fetchData() {
      try {
        const response = await MuzSoyuzRequest.getUserProfile()

        fetchedProfile.current = response
        setProfileData(response)
      }
      catch (e) {
        // this.props.dispatch(fetchAuthStatusFailure(e.message))
        console.log(e.message)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    async function submitChanges() {
      const changes = pickChanges(
        fetchedProfile.current,
        profileData,
        ['name', 'phone',],
      )

      if (Object.keys(changes).length) {
        try {
          await MuzSoyuzRequest.makeProfileUpdate(changes)
        }
        catch (e) {
          swalAlert.error(e.message, 'Сталася помилка при оновленні профілю')
        }
      }
    }

    submitChanges()
  }, [finishedUpdating])

  const changeInput = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const enableNameEdit = () => {
    setDisabled(false)
  }

  const disableNameEdit = () => {
    setDisabled(true)
    setFinishedUpdating(true)
  }

  return (
    <div className={s.profileWrapper}>
      <div className={s.profileTopSection}>
        <div className={s.avatarWrapper}>
          <img src={profileData.imageURL || avatar} alt="avatar"/>
        </div>
        <div className={s.nameWrapper}>
          <input
            type='text'
            name='name'
            className={[s.name, s.inp].join(' ')}
            value={profileData.name || ''}
            placeholder="Твоє ім'я"
            disabled={disabled}
            onChange={changeInput}
            onBlur={disableNameEdit}
          />
          <img src={edit} alt='edit' onClick={enableNameEdit}/>
        </div>
      </div>
      <div className={s.profileMiddleSection}>
        <div className={s.profileTitleSettingsWrapper}>
          <span className={s.profileTitle}>Профіль</span>
          <NavLink to='/new-profile'><img src='' alt='settings'/></NavLink>
        </div>
        <CollapseButton
          title={'Твій інструмент'}
          btnWrapper={s.btnWrapper}
          filterName={s.filterName}
          innerContent={<InstrumentProfile defaultInstrument={{ role: profileData.role }}/>}
        />
        <input
          type='text'
          name='phone'
          className={[s.phoneNumber, s.inp].join(' ')}
          value={profileData.phone || ''}
          placeholder="+380-XX-XXX-XX-XX"
          onChange={changeInput}
          onBlur={disableNameEdit}
        />
        <CollapseButton
          title={'Вільні дні'}
          btnWrapper={s.btnWrapper}
          filterName={s.filterName}
          innerContent={<CalendarProfile/>}
        />
      </div>

    </div>
  )
}


export default NewProfile