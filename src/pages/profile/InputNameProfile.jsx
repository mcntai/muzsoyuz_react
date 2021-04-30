import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileUpdate } from '../../redux/actions/user'
import { selectProfile } from '../../redux/slice/user'
import s from './InputNameProfile.module.css'


const InputNameProfile = () => {
  const userName = useSelector(selectProfile('name'))
  const [name, setName] = useState(userName)
  const dispatch = useDispatch()

  useEffect(() => {
    setName(userName)
  }, [userName])

  const changeName = (e) => {
    setName(e.target.value)
  }

  const finishChangeName = () => {
    if (!name) return

    dispatch(userProfileUpdate({ name }))
  }

  return (
    <div className={s.nameWrapper}>
      <input
        type='text'
        name='name'
        className={s.name}
        defaultValue={name === null ? '' : name}
        placeholder="Твоє ім'я"
        contentEditable={true}
        onChange={changeName}
        onBlur={finishChangeName}
      />
    </div>
  )
}

export default InputNameProfile