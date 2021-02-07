export const SECOND = 1000
export const MINUTE = SECOND * 60
export const HOUR = MINUTE * 60

export function addHours(date, hours) {
  return new Date(new Date(date).getTime() + (hours * HOUR))
}

export function trimTime(date) {
  date = new Date(date)

  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(0)
  date.setHours(0)

  return date
}