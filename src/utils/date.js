const SECOND = exports.SECOND = 1000
const MINUTE = exports.MINUTE = SECOND * 60
const HOUR = exports.HOUR = MINUTE * 60
const DAY = exports.DAY = HOUR * 24

const isLeapYear = year =>
  ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)

const WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

exports.getWeekDay = date => WEEK_DAYS[new Date(date).getDay()]

exports.getMinutes = date => {
  date = date instanceof Date ? date : new Date(date)

  return date.getHours() * 60 + date.getMinutes()
}

const getDaysInMonth = (year, month) =>
  [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]

exports.addMinutes = (date, minutes) => new Date(new Date(date).getTime() + (minutes * MINUTE))

exports.addHours = (date, hours) => new Date(new Date(date).getTime() + (hours * HOUR))

exports.addDays = (date, days) => new Date(new Date(date).getTime() + (days * DAY))

exports.addMonths = (date, months) => {
  date = new Date(date)

  const n = date.getDate()

  date.setDate(1)
  date.setMonth(date.getMonth() + months)
  date.setDate(Math.min(n, getDaysInMonth(date.getFullYear(), date.getMonth())))

  return date
}

exports.trimMilliseconds = date => {
  date = new Date(date)

  date.setMilliseconds(0)

  return date
}

exports.trimTime = date => {
  date = new Date(date)

  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(0)
  date.setHours(0)

  return date
}

exports.trimDate = date => {
  date = new Date(date)

  date.setMonth(0, 1)

  date = exports.trimTime(date)

  return date
}

/**
 *
 * @param {Date|String} date
 * @param {Number} timezoneOffset
 * @returns {Date}
 */
exports.setTimezoneOffset = (date, timezoneOffset) => {
  const targetDate = new Date(date)

  const timezoneDifference = timezoneOffset * 60 + targetDate.getTimezoneOffset()

  return exports.addMinutes(targetDate, timezoneDifference)
}