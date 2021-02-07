import React, { useState, useEffect, useRef } from 'react'
import { jobOfferValidator } from '../../validators'
import * as swalAlert from '../../components/common/alerts'
import s from './InputPhoneProfile.module.css'
import { userProfileUpdate } from '../../actions/user'
import { useDispatch } from 'react-redux'


const InputPhoneProfile = ({ data }) => {
  const [phone, setPhone] = useState(data)
  const [lastNumber, setLastNumber] = useState('')
  const [finishedUpdatingPhone, setFinishedUpdatingPhone] = useState(false)
  const ref = useRef(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setPhone(data)
  }, [data])

  useEffect(() => {
    if (ref.current === false) return

    dispatch(userProfileUpdate({ phone }))
  }, [finishedUpdatingPhone])

  const backUpLastNumber = (e) => {
    setLastNumber(e.target.value)
  }

  const changePhone = (e) => {
    setPhone(e.target.value)
  }

  const finishChanges = (e) => {
    const value = e.target.value

    try {
      jobOfferValidator('phoneErr', value)
      ref.current = true
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