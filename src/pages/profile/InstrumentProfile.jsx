import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { userProfileUpdate } from '../../actions/user'
import s from './InstrumentProfile.module.css'


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

const InstrumentProfile = ({ defaultInstrument }) => {
  const [instrument, setInstrument] = useState(defaultInstrument)
  const instrumentChosen = useRef(false)
  const dispatch = useDispatch()

  console.log('main render')

  // useEffect(() => {
  //   setInstrument(defaultInstrument)
  // }, [])

  useEffect(() => {
    if(!instrumentChosen.current) return
      dispatch(userProfileUpdate({role: instrument}))
  }, [instrument])

  const chooseInstrument = (e) => {
    if (e.target.checked) {
      setInstrument(e.target.value)
      instrumentChosen.current = true
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
                  checked={item === defaultInstrument}
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
