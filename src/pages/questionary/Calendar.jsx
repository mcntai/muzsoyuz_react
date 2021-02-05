import React from 'react'
import { connect } from 'react-redux'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { setDaysOff } from '../../actions/user'
import { debounce } from 'lodash'
import { moveFinishBtnCalendarQuest, toggleElement } from '../../slice/general'
import s from './ChooseFreeDaysPage.module.css'


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

const mapStateToProps = state => {
  return {
    calendar: state.general.showCalendar,
    text    : state.general.showText
  }
}

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleShowCalendar = this.handleShowCalendar.bind(this)
    this.makeDispatch = debounce(this.makeDispatch, 5000)
    this.state = {
      selectedDays: [],
      showBtn     : '',
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.makeDispatch()
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      )
      selectedDays.splice(selectedIndex, 1)
    } else {
      selectedDays.push(day)
    }
    this.setState({ selectedDays })
  }

  makeDispatch() {
    this.props.dispatch(setDaysOff({ dates: [...this.state.selectedDays], dayOff: true }))
  }

  handleShowCalendar() {
    const button = this.state.showBtn === '' ? s.showBtn : ''
    this.setState({ showBtn: button })

    this.props.dispatch(toggleElement())
    this.props.dispatch(moveFinishBtnCalendarQuest())
  }

  render() {
    const showCal = this.props.calendar
    const showBtn = this.state.showBtn

    return (
      <div>
        <button className={[showBtn, s.calendarBtn].join(' ')} onClick={this.handleShowCalendar}>Календар</button>
        {
          showCal
          ?
          <DayPicker
            selectedDays={this.state.selectedDays}
            onDayClick={this.handleDayClick}
            months={MONTHS['ua']}
            weekdaysShort={WEEKDAYS_SHORT['ua']}
            firstDayOfWeek={FIRST_DAY_OF_WEEK['ua']}
            className={s.calendarContainer}
          />
          : null
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Calendar)

