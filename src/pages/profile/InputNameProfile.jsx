import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userProfileUpdate } from '../../actions/user'
import s from './InputNameProfile.module.css'


const InputNameProfile = ({ data }) => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setName(data)
  }, [data])

  const changeName = (e) => {
    setName(e.target.value)
  }

  const finishChangeName = () => {
    dispatch(userProfileUpdate({ name }))
  }

  return (
    <div className={s.nameWrapper}>
      <input
        type='text'
        name='name'
        className={s.name}
        value={name || ''}
        placeholder="Твоє ім'я"
        contentEditable={true}
        onChange={changeName}
        onBlur={finishChangeName}
      />
    </div>
  )
}

export default InputNameProfile