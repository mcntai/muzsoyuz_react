/**
 * @param {*} value
 * @returns {Boolean}
 */
const isNumber = value => value !== null && !isNaN(value)

/**
 * @param {Number} number
 * @param {Number} accuracy
 * @returns {Number}
 */
const round = (number, accuracy = 10) => {
  const decimal = isNumber(accuracy) ? accuracy * 10 : 1

  return isNumber(number) ? Math.round(number * decimal) / decimal : 0
}

module.exports = { isNumber, round }