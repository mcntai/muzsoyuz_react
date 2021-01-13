import React, { useState, useEffect } from 'react'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import * as swalAlert from '../../Components/common/alerts'
import s from './InputNameProfile.module.css'


const InputNameProfile = ({ data }) => {
  const [name, setName] = useState({})
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

  const disableNameEdit = () => {
    setFinishedUpdatingName(true)
  }

  return (
    <div className={s.nameWrapper}>
      <input
        type='text'
        name='name'
        className={[s.name, s.inp].join(' ')}
        value={name || ''}
        placeholder="Твоє ім'я"
        contentEditable={true}
        onChange={changeName}
        onBlur={disableNameEdit}
      />
    </div>
  )
}


export default InputNameProfile