import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { filterDate } from '../../../actions/filterActions'
import DayPicker, { DateUtils } from 'react-day-picker'
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

class FilterInternalCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      from: undefined,
      to  : undefined,
    }
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state)
    this.setState(range)
  }

  handleResetClick() {
    this.setState(this.getInitialState())
  }

  componentDidUpdate() {
    this.props.dispatch(filterDate(this.state.from, this.state.to))
  }

  render() {
    const { from, to } = this.state
    const modifiers = { start: from, end: to };
    return (
      <div className="RangeExample">
        <DayPicker
          className="Selectable"
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          months={MONTHS['ua']}
          weekdaysShort={WEEKDAYS_SHORT['ua']}
          firstDayOfWeek={FIRST_DAY_OF_WEEK['ua']}
          onDayClick={this.handleDayClick}
        />
        <Helmet>
          <style>{`
          .RangeExample {
            display: flex;
            justify-content: center;
          }
          .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
            background-color: #CBF6FF !important;
            color: #6384EB;
          }
          .Selectable .DayPicker-Day {
            border-radius: 0 !important;
          }
          .Selectable .DayPicker-Day--start {
            border-top-left-radius: 50% !important;
            border-bottom-left-radius: 50% !important;
          }
          .Selectable .DayPicker-Day--end {
            border-top-right-radius: 50% !important;
            border-bottom-right-radius: 50% !important;
          }
`}</style>
        </Helmet>
      </div>
    )
  }
}


export default connect(undefined)(FilterInternalCalendar)

