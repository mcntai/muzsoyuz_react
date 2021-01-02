import React, { useState, useEffect, useRef } from 'react'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import * as swalAlert from '../common/Alerts'
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
  const isMounted = useRef(true)
  const [instrument, setInstrument] = useState(defaultInstrument)
  const [instrumentChanged, setInstrumentChanged] = useState(false)
  const [checkedOption, setCheckedOption] = useState('')
  const [defaultOption, setDefaultOption] = useState('')

  useEffect(() => {
    setDefaultOption(defaultInstrument.role)
  }, [defaultInstrument.role])

  useEffect(() => {
    async function setInstrument() {
      if (!isMounted.current) {
        try {
          await MuzSoyuzRequest.makeProfileUpdate(instrument)
        }
        catch (e) {
          swalAlert.error(e.message, 'Сталася помилка при оновленні профілю')
        }
      } else {
        isMounted.current = false
      }
    }

    setInstrument()
  }, [instrument, instrumentChanged])

  const chooseInstrument = (e) => {
    if (e.target.checked) {
      setInstrument({ ...instrument, role: e.target.value })
      setInstrumentChanged(!instrumentChanged)

      setCheckedOption(e.target.value)
      setDefaultOption('')
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
                  checked={item === defaultOption || checkedOption === item}
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
