import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { getDaysOff, setDaysOff } from '../../actions/user'
import { selectWorkDays } from '../../slice/user'
import { addHours, trimTime } from '../../utils/date'


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

const SinglePickCalendar = ({ styles }) => {
  const { loaded, dates } = useSelector(selectWorkDays)
  const [selectedDays, setSelectedDays] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loaded) {
      dispatch(getDaysOff())
    }
  }, [])

  useEffect(() => {
    loaded && setSelectedDays(dates)
  }, [selectedDays, dates, loaded])

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
    <div className={styles.calendarWrapper}>
      <DayPicker
        selectedDays={selectedDays.map(day => new Date(day))}
        onDayClick={handleDayClick}
        months={MONTHS.ua}
        weekdaysShort={WEEKDAYS_SHORT.ua}
        firstDayOfWeek={FIRST_DAY_OF_WEEK.ua}
        className={styles.calendarContainer}
      />
    </div>
  )
}

export default SinglePickCalendar

