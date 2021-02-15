import React, { useEffect, useRef, useState } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { getDaysOff, setDaysOff } from '../../actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { selectWorkDays } from '../../slice/user'
import { addHours, trimTime } from '../../utils/date'
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
  const [selectedDays, setSelectedDays] = useState([])
  const dispatch = useDispatch()
  const ref = useRef(workdays)

  useEffect(() => {
    if (!ref.current.dates.length) {
      dispatch(getDaysOff())
    }
  }, [])

  useEffect(() => {
    workdays?.status === 'success' && setSelectedDays(workdays.dates)
  }, [workdays])

  const makeDispatch = (day, type) => {
    dispatch(setDaysOff({ dates: day, dayOff: type }))
  }

  const handleDayClick = (day, { selected }) => {
    day = addHours(trimTime(day), 2).toISOString()
    if (selected) {
      setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day))
      makeDispatch([day], false)
    } else {
      setSelectedDays([...selectedDays, day])
      makeDispatch([day], true)
    }
  }

  return (
    <div className={s.calendarWrapper}>
      <DayPicker
        selectedDays={selectedDays.map(day => new Date(day))}
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

