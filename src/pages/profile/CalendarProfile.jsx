import React, { useCallback, useEffect, useRef, useState } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { getDaysOff, setDaysOff } from '../../actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { addFreeDays, selectWorkDays } from '../../slice/user'
import { debounce } from 'lodash'
import s from './CalendarProfile.module.css'


const WEEKDAYS_SHORT = {
  ua: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
}

const MONTHS = {
  ua: [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ]
}

const FIRST_DAY_OF_WEEK = {
  ua: 1,
}

const CalendarProfile = () => {
  let workdays = useSelector(selectWorkDays)
  const [dateChosen, setDateChosen] = useState(false)
  const dispatch = useDispatch()

  const makeDispatch = days => {
    dispatch(setDaysOff({ dates: [...days], dayOff: true }))
  }

  const debouncedDispatch = useCallback(debounce(days => makeDispatch(days), 5000), [])

  useEffect(() => {
    dispatch(getDaysOff())
  }, [])

  useEffect(() => {
    if (dateChosen) {
      debouncedDispatch(workdays)
      setDateChosen(false)
    }
  }, [dateChosen])


  const handleDayClick = (day, { selected }) => {
    if(selected) {
      dispatch(addFreeDays({ day, type: 'remove' }))
    } else {
      dispatch(addFreeDays({ day}))
    }

    // debouncedDispatch(workdays)
    setDateChosen(true)
  }

  return (
    <div className={s.calendarWrapper}>
      <DayPicker
        selectedDays={workdays.map(day => new Date(day))}
        onDayClick={handleDayClick}
        months={MONTHS.ua}
        weekdaysShort={WEEKDAYS_SHORT.ua}
        firstDayOfWeek={FIRST_DAY_OF_WEEK.ua}
        className={s.calendarContainer}
      />
    </div>
  )
}


export default CalendarProfile

