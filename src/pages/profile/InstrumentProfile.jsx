import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileUpdate } from '../../actions/user'
import s from './InstrumentProfile.module.css'
import { selectUserRole } from '../../slice/user'


const instruments = {
  drums  : 'Барабани',
  pandora: 'Бандура',
  bas    : 'Бас-гітара',
  guitar : 'Гітара',
  voice  : 'Вокал',
  sax    : 'Саксофон',
  trumpet: 'Труба',
  violin : 'Скрипка',
  piano  : 'Клавішні'
}

const InstrumentProfile = () => {
  const userRole = useSelector(selectUserRole)
  const dispatch = useDispatch()

  const chooseInstrument = (e) => {
    if (e.target.checked) {
      dispatch(userProfileUpdate({role: e.target.value}))
    }
  }

  return (
    <div className={s.instrumentsListWrapper}>
      {
        Object.keys(instruments).map((item) => {
            return (
              <div
                key={item}
                className={s.instWrapper}
              >
                <input
                  type="radio"
                  id={item}
                  value={item}
                  checked={item === userRole}
                  className={s.instrument}
                  onChange={chooseInstrument}
                />
                <label
                  htmlFor={item}
                  className={s.label}
                >
                  {instruments[item]}
                </label>
              </div>
            )
          }
        )
      }
    </div>
  )
}


export default InstrumentProfile
