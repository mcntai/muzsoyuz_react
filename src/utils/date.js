export const SECOND = 1000
export const MINUTE = SECOND * 60
export const HOUR = MINUTE * 60
export const DAY = HOUR * 24

const isLeapYear = year =>
  ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)

const WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export const getWeekDay = date => WEEK_DAYS[new Date(date).getDay()]

export const getMinutes = date => {
  date = date instanceof Date ? date : new Date(date)

  return date.getHours() * 60 + date.getMinutes()
}

const getDaysInMonth = (year, month) =>
  [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]

export const addMinutes = (date, minutes) => new Date(new Date(date).getTime() + (minutes * MINUTE))

export const addHours = (date, hours) => new Date(new Date(date).getTime() + (hours * HOUR))

export const addDays = (date, days) => new Date(new Date(date).getTime() + (days * DAY))

export const addMonths = (date, months) => {
  date = new Date(date)

  const n = date.getDate()

  date.setDate(1)
  date.setMonth(date.getMonth() + months)
  date.setDate(Math.min(n, getDaysInMonth(date.getFullYear(), date.getMonth())))

  return date
}

export const trimMilliseconds = date => {
  date = new Date(date)

  date.setMilliseconds(0)

  return date
}

export const trimTime = date => {
  date = new Date(date)

  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(0)
  date.setHours(0)

  return date
}

export const trimDate = date => {
  date = new Date(date)

  date.setMonth(0, 1)

  date = trimTime(date)

  return date
}

/**
 *
 * @param {Date|String} date
 * @param {Number} timezoneOffset
 * @returns {Date}
 */
export const setTimezoneOffset = (date, timezoneOffset) => {
  const targetDate = new Date(date)

  const timezoneDifference = timezoneOffset * 60 + targetDate.getTimezoneOffset()

  return addMinutes(targetDate, timezoneDifference)
}