import React, { useState, useEffect } from 'react'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import * as swalAlert from '../common/Alerts'
import edit from '../../Assets/img/edit-icon.svg'
import s from './InputNameProfile.module.css'


const InputNameProfile = ({ data }) => {
  const [name, setName] = useState({})
  const [disabled, setDisabled] = useState(true)
  const border = !disabled ? s.border : null
  const [finishedUpdatingName, setFinishedUpdatingName] = useState(false)

  useEffect(() => {
    setName(data)
  }, [data])

  useEffect(() => {
    async function submitChanges() {
      if (finishedUpdatingName) {
        try {
          await MuzSoyuzRequest.makeProfileUpdate({ name })
        }
        catch (e) {
          swalAlert.error(e.message, 'Сталася помилка при оновленні профілю')
        }
      }
    }

    submitChanges()
  }, [finishedUpdatingName])

  const changeName = (e) => {
    setName(e.target.value)
  }

  const enableNameEdit = () => {
    setDisabled(false)
  }

  const disableNameEdit = () => {
    setDisabled(true)
    setFinishedUpdatingName(true)
  }

  return (
    <div className={s.nameWrapper}>
      <input
        type='text'
        name='name'
        className={[s.name, s.inp, border].join(' ')}
        value={name || ''}
        placeholder="Твоє ім'я"
        contentEditable={true}
        disabled={disabled}
        onChange={changeName}
        onBlur={disableNameEdit}
      />
      <img src={edit} alt='edit' className={s.edit} onClick={enableNameEdit}/>
    </div>
  )
}


export default InputNameProfile