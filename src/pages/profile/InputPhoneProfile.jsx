import React, { useState, useEffect } from 'react'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { jobOfferValidator } from '../../validators'
import * as swalAlert from '../../components/common/alerts'
import s from './InputPhoneProfile.module.css'


const InputPhoneProfile = ({ data }) => {
  const [phone, setPhone] = useState({})
  const [lastNumber, setLastNumber] = useState({phone: ''})
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
  }, [finishedUpdatingPhone])

  const backUpLastNumber= (e) => {
    setLastNumber(e.target.value)
  }

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
      setPhone(lastNumber)
    }
  }

  return (
    <>
      <input
        type='number'
        name='phone'
        className={[s.phoneNumber, s.inp].join(' ')}
        value={phone || ''}
        placeholder="+380-XX-XXX-XX-XX"
        onChange={changePhone}
        onBlur={finishChanges}
        onFocus={backUpLastNumber}
      />
    </>
  )
}


export default InputPhoneProfile