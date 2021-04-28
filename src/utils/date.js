export const SECOND = 1000
export const MINUTE = SECOND * 60
export const HOUR = MINUTE * 60
export const DAY = HOUR * 24
export const WEEK = DAY * 7
export const MONTH = WEEK * 30

export function addHours(date, hours) {
  return new Date(new Date(date).getTime() + (hours * HOUR))
}

export function addDays(date, days) {
  return new Date(new Date(date).getTime() + (days * DAY))
}

export function trimTime(date) {
  date = new Date(date)

  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(0)
  date.setHours(0)

  return date
}

const sameDateFormatter = date => {
  const diff = Date.now() - date.getTime()

  if (diff < MINUTE) {
    return Math.floor((diff / SECOND)) + ' сек. тому'
  } else if (diff < HOUR) {
    return Math.floor((diff / MINUTE)) + ' хв. тому'
  } else {
    return Math.floor((diff / HOUR)) + ' год. тому'
  }
}

const yesterdayDateFormatter = time => {
  const hours = time.getHours()
  const min = time.getMinutes()

  return `вчора о ${hours}:${min}`
}

const beforeYesterdayDateFormatter = date => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

const isSameDate = date => trimTime(date).getTime() === trimTime(Date.now()).getTime()

const isYesterdayDate = date => trimTime(date).getTime() === trimTime(addDays(Date.now(), -1)).getTime()

const isBeforeYesterdayDate = date => !isSameDate(date) && !isYesterdayDate(date)

const TIME_MARKERS = [
  {
    criteria : isSameDate,
    formatter: sameDateFormatter
  },
  {
    criteria : isYesterdayDate,
    formatter: yesterdayDateFormatter
  },
  {
    criteria : isBeforeYesterdayDate,
    formatter: beforeYesterdayDateFormatter
  }
]

export const dateFormatter = date => {
  const wrappedDate = new Date(date)
  const marker = TIME_MARKERS.find(m => m.criteria(wrappedDate))

  return marker.formatter(wrappedDate)
}