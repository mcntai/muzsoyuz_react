import React, { useState, useEffect } from 'react'
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
}

const InnerFilterInstrument = (props) => {
  const [instrument, setInstrument] = useState([])

  const chooseInstrument = (newInst) => {
    setInstrument(prevArray => [...prevArray, newInst])
  }

  useEffect(() => {
    if(instrument.length) {
      props.dispatch(filterInstruments(instrument))
    }
  }, [instrument])

  return (
    <div className={s.instrumentWrapper}>
      <ul>
        {
          Object.keys(instruments).map((item) =>
            <li
              key={item}
              className={s.instrument}
              onClick={() => chooseInstrument(item)}
            >
              {instruments[item]}
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default connect(undefined)(InnerFilterInstrument)