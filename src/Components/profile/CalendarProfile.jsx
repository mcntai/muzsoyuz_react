import React from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import * as swalAlert from '../common/Alerts'
import 'react-day-picker/lib/style.css'


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

class CalendarProfile extends React.Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.state = {
      selectedDays: [],
    }
  }

  async componentDidMount() {
    try {
      const response = await MuzSoyuzRequest.getDaysOff()

      this.setState({ selectedDays: response.map(day => new Date(day.date)) })
    }
    catch (e) {
      swalAlert.error(e.message, 'Упс!')
    }
  }

  async setDaysOff(day, dayOff) {
    try {
      await MuzSoyuzRequest.setDaysOff({
        dates: [day],
        dayOff,
      })
    }
    catch (e) {
      swalAlert.error(e.message, 'Упс!')
    }
  }

  async handleDayClick(day, { selected }) {
    let dayOff = false
    let { selectedDays } = this.state

    if (selected) {
      selectedDays = selectedDays.filter(selectedDay =>
        !DateUtils.isSameDay(selectedDay, day)
      )
    } else {
      selectedDays.push(day)
      dayOff = true
    }

    this.setState({ selectedDays })

    await this.setDaysOff(day, dayOff)
  }


  render() {
    return (
      <div>
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
          months={MONTHS['ua']}
          weekdaysShort={WEEKDAYS_SHORT['ua']}
          firstDayOfWeek={FIRST_DAY_OF_WEEK['ua']}
          // className={s.calendarContainer}
        />
      </div>
    )
  }
}

export default CalendarProfile

