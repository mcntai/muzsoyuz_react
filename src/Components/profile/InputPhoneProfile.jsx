import React, { useState, useEffect } from 'react'
import s from './InputPhoneProfile.module.css'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { jobOfferValidator } from '../../validators/index'
import * as swalAlert from '../common/Alerts'


const InputPhoneProfile = ({ data }) => {
  const [phone, setPhone] = useState({})
  const [finishedUpdatingPhone, setFinishedUpdatingPhone] = useState(false)

  useEffect(() => {
    setPhone(data)
  }, [data])

  useEffect(() => {
    async function submitChanges() {
      if (finishedUpdatingPhone) {
        try {
          await MuzSoyuzRequest.makeProfileUpdate({ phone })
        }
        catch (e) {
          swalAlert.error(e.message, 'Сталася помилка при оновленні профілю')
        }
      }
    }

    submitChanges()
  }, [phone, finishedUpdatingPhone])

  const changePhone = (e) => {
    setPhone(e.target.value)
  }

  const finishChanges = (e) => {
    const value = e.target.value

    try {
      jobOfferValidator('phoneErr', value)
      setFinishedUpdatingPhone(true)
    }
    catch (e) {
      swalAlert.error(e.message, 'Упс...')
    }
  }

  return (
    <>
      <input
        type='text'
        name='phone'
        className={[s.phoneNumber, s.inp].join(' ')}
        value={phone || ''}
        placeholder="+380-XX-XXX-XX-XX"
        onChange={changePhone}
        onBlur={finishChanges}
      />
    </>
  )
}


export default InputPhoneProfile