import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { deleteDayOff, getDaysOff, setDayOff } from '../../actions/user'
import { selectWorkDays } from '../../slice/user'


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
    const daysOff = dates.map(item => item.date)

    loaded && setSelectedDays(daysOff)
  }, [dates, loaded])

  const dispatchSetDayOff = day => {
    dispatch(setDayOff({ date: day }))
  }

  const dispatchDeleteDayOff = day => {
    const { _id } = dates.find(item => item.date === day)
    dispatch(deleteDayOff(_id))
  }

  const handleDayClick = (day, { selected }) => {
    day = day.toISOString()
    if (selected) {
      setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day))
      dispatchDeleteDayOff(day)
    } else {
      setSelectedDays([...selectedDays, day])
      dispatchSetDayOff(day)
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

