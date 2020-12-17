import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { filterInstruments } from '../../../actions/filterActions'
import s from './InnerFilterInstrument.module.css'


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

const InnerFilterInstrument = ({ dispatch }) => {
  const [instrument, setInstrument] = useState([])
  const isMounted = useRef(false)

  const chooseInstrument = (e, newInst) => {
    if (e.target.checked) {
      setInstrument(prevArray => [...prevArray, newInst])
    } else if (!e.target.checked) {
      setInstrument(instrument.filter(inst => inst !== newInst))
    }
  }

  useEffect(() => {
    if (isMounted.current) {
      dispatch(filterInstruments(instrument))
    } else {
      isMounted.current = true
    }
  }, [dispatch, instrument])

  return (
    <div className={s.instrumentsWrapper}>
      {
        Object.keys(instruments).map((item) => {
            return (
              <div key={item} className={s.instWrapper}>
                <input
                  type="checkbox"
                  id={item}
                  className={s.instrument}
                  onClick={(e) => chooseInstrument(e, item)}
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

export default connect(undefined)(InnerFilterInstrument)