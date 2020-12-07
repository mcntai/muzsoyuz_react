import React from 'react'
import { connect } from 'react-redux'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import s from './Questionary.module.css'


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
    calendar: state.questReducer.showCalendar,
    text    : state.questReducer.showText
  }
}

const showHideElementQuestionary = (showCal, showText) => ({
  type: 'SHOW_HIDE_ELEMENT',
  showCal,
  showText
})

const moveFinishButton = () => ({
  type     : 'MOVE_FINISH_BUTTON',
  finishBtn: true
})

const saveSelectedDays = (selectedDays) => ({
  type: 'SAVE_SELECTED_DAYS',
  selectedDays,
})

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleShowCalendar = this.handleShowCalendar.bind(this)
    this.state = {
      selectedDays: [],
      showBtn     : '',
    }
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

    this.props.dispatch(saveSelectedDays([...this.state.selectedDays]))
  }

  handleShowCalendar() {
    const button = this.state.showBtn === '' ? s.showBtn : ''
    const calendar = this.props.calendar
    const text = this.props.text

    this.setState({ showBtn: button })

    this.props.dispatch(showHideElementQuestionary(!calendar, !text))
    this.props.dispatch(moveFinishButton())
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

