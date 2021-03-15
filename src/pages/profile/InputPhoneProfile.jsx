import React, { useState, useEffect, useRef } from 'react'
import { jobOfferValidator } from '../../validators'
import * as swalAlert from '../../components/common/alerts'
import { userProfileUpdate } from '../../actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../../slice/user'
import s from './InputPhoneProfile.module.css'


const InputPhoneProfile = () => {
  const { phone: userPhone } = useSelector(selectProfile)
  const [phone, setPhone] = useState(userPhone)
  const [lastNumber, setLastNumber] = useState('')
  const [finishedUpdatingPhone, setFinishedUpdatingPhone] = useState(false)
  const ref = useRef(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setPhone(userPhone)
  }, [userPhone])

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