import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { deleteDayOff, getDaysOff, setDayOff } from '../../actions/user'
import { selectDaysOff } from '../../slice/user'


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
  const { loaded, map, list } = useSelector(selectDaysOff)
  const [selectedDays, setSelectedDays] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loaded) {
      dispatch(getDaysOff())
    }
  }, [])


  useEffect(() => {
    const filteredDays = Object.keys(map)
      .filter(id => list.includes(id))
      .map(id => map[id].date)

    setSelectedDays(filteredDays)
  }, [map, list])

  const dispatchSetDayOff = day => {
    dispatch(setDayOff({ date: day }))
  }

  const dispatchDeleteDayOff = day => {
    const id = Object.keys(map).find(id => map[id].date === day)

    dispatch(deleteDayOff(id))
  }

  const handleDayClick = (day, { selected }) => {
    day = day.toISOString()
    if (selected) {
      dispatchDeleteDayOff(day)
    } else {
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

