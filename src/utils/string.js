/**
 * @param {String} arg
 * @returns {Boolean}
 */
const notEmpty = arg => arg && !!arg.trim()
const trim = arg => typeof arg === 'string' ? arg.trim() : arg
const toLowerCase = value => typeof value === 'string' ? value.toLowerCase() : ''
const toSentenceCase = str => str.charAt(0).toUpperCase() + str.slice(1)

const nullifyEmpty = arg => {
  if (typeof arg === 'string') {
    return notEmpty(arg) ? arg : null
  }

  return arg
}

module.exports = { notEmpty, trim, toLowerCase, toSentenceCase, nullifyEmpty }