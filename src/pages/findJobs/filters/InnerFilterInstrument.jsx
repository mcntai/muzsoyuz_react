import React from 'react'
import { filterInstruments, selectInstrumentsList } from '../../../redux/slice/offers'
import { useDispatch, useSelector } from 'react-redux'
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

const InnerFilterInstrument = () => {
  const dispatch = useDispatch()
  const checkedInstrument = useSelector(selectInstrumentsList)

  const chooseInstrument = (e, instrument) => {
    dispatch(filterInstruments({ instrument, filter: e.target.checked ? 'add' : 'delete' }))
  }

  return (
    <div className={s.instrumentsWrapper}>
      {
        Object.keys(instruments).map((item) => {
            return (
              <div key={item} className={s.instWrapper}>
                <input
                  type="checkbox"
                  id={item}
                  checked={checkedInstrument.filter(el => el === item).join()}
                  className={s.instrumentCheckbox}
                  onChange={(e) => chooseInstrument(e, item)}
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

export default InnerFilterInstrument