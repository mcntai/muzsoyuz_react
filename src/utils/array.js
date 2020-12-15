import { values, pick, get } from './object'

exports.toArray = value => Array.isArray(value) ? value : [value]

/**
 * Creates an array of unique values that are included in both arrays
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 */
exports.intersection = (a, b) => {
  return a.filter(item => b.indexOf(item) !== -1)
}

/**
 * Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons.
 * The order and references of result values are determined by the first array.
 * @param {Array} a The array to inspect.
 * @param {Array} b The values to exclude.
 * @returns {Array} the new array of filtered values.
 */
exports.difference = (a, b) => {
  return a.filter(item => b.indexOf(item) === -1)
}

/**
 * Sum all elements of array
 * @param {Array} array
 * @returns {Number}
 */
exports.sum = array => {
  return array.reduce((sum, element) => sum + element, 0)
}

/**
 * This method is like sum except that it accepts iteratee which is invoked for each element in array
 * to generate the value to be summed. The iteratee is invoked with one argument: (value)
 *
 * @param {Array} array
 * @param {Function|String} iteratee
 * @returns {Number}
 */
exports.sumBy = (array, iteratee) => {
  if (typeof iteratee === 'string') {
    const { get } = require('./object')
    const path = iteratee

    iteratee = item => get(item, path)
  }

  return array.reduce((sum, element) => sum + iteratee(element), 0)
}

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 * @param {Array.<Object>} array
 * @param {Function|String} iteratee
 * @returns {Object}
 */
exports.groupBy = (array, iteratee) => {
  const result = {}

  if (typeof iteratee === 'string') {
    const { get } = require('./object')
    const path = iteratee

    iteratee = item => get(item, path)
  }

  array.forEach((item, i) => {
    const key = iteratee(item, i)

    result[key] = result[key] || []
    result[key].push(item)
  })

  return result
}

exports.groupToBuckets = (array, bucketSize) => {
  if (!bucketSize) {
    throw new Error('[bucketSize] is required')
  }

  return values(exports.groupBy(array, (item, i) => Math.floor(i / bucketSize)))
}

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 * The corresponding value of each key is the last element responsible for generating the key.
 * The iteratee is invoked with one argument: (value).
 *
 * @param {Array.<Object>} array
 * @param {Function|String} iteratee
 * @returns {Object}
 */
exports.keyBy = (array, iteratee) => {
  const result = {}

  if (typeof iteratee === 'string') {
    const { get } = require('./object')
    const path = iteratee

    iteratee = item => get(item, path)
  }

  array.forEach((item, i) => {
    result[iteratee(item, i)] = item
  })

  return result
}

exports.sortBy = (array, prop, direction = 'asc') => {
  const singlePropComparer = prop => (a, b) => {
    if (a[prop] < b[prop]) {
      return -1
    }

    if (a[prop] > b[prop]) {
      return 1
    }

    return 0
  }

  const multiPropComparer = props => (a, b) => {
    let result

    for (const prop of props) {
      result = singlePropComparer(prop)(a, b)

      if (result !== 0) {
        break
      }
    }

    return result
  }

  const comparer = Array.isArray(prop) ? multiPropComparer(prop) : singlePropComparer(prop)

  const result = array.sort(comparer)

  if (direction === 'desc') {
    return result.reverse()
  }

  return result
}

/**
 * Checks if predicate returns truthy for all elements of array.
 * Iteration is stopped once predicate returns falsey.
 * The predicate is invoked with three arguments: (value, index|key, array).
 *
 * @param {Array} array
 * @param {Function} predicate
 * @returns {Boolean}
 */
exports.every = (array, predicate) => {
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i], i, array)) {
      return false
    }
  }

  return true
}

const _identity = exports.identity = value => value

exports.arraysEqual = (a, b, iteratee = _identity) => {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; ++i) {
    if (iteratee(a[i]) !== iteratee(b[i])) {
      return false
    }
  }

  return true
}

exports.union = (...args) => {
  return [...new Set(args.reduce((memo = [], array = []) => [...memo, ...array], []), [])]
}

/**
 * @param {String[]} array
 * @returns {String[]}
 */
exports.uniq = array => [...new Set(array)]

exports.uniqBy = (array, iteratee = _identity) => {
  const result = []
  const addedIds = []

  if (typeof iteratee === 'string') {
    const prop = iteratee

    iteratee = item => get(item, prop)
  }

  for (const item of array) {
    const itemId = iteratee(item)

    if (!addedIds.includes(itemId)) {
      result.push(item)
      addedIds.push(itemId)
    }
  }

  return result
}

exports.pluck = (array, iteratee = _identity) => {
  if (typeof iteratee === 'string') {
    const prop = iteratee

    iteratee = item => get(item, prop)
  }

  if (Array.isArray(iteratee)) {
    const props = iteratee

    iteratee = item => pick(item, props)
  }

  return array.map(iteratee)
}

/**
 * Flattens array a single level deep.
 *
 * @param {Array} arr The array to flatten
 * @returns {Array} Returns the new flattened array.
 */
exports.flatten = arr => [].concat.apply([], arr)

/**
 * Creates an array excluding all given values
 *
 * @param {Array} arr
 * @param {Array} values
 * @returns {Array}
 */
exports.without = (arr, values) => {
  return arr.filter(value => !values.includes(value))
}

/**
 * Creates an array with all falsey values removed.
 * The values false, null, 0, "" and undefined are falsey.
 * @param {Array} arr
 * @returns {Array}
 */
exports.compact = arr => arr.filter(item => !!item)

const buildComparisonStep = (attrOrFunction, opts) => {
  const reversed = (opts && opts.reversed)
  const nullsLast = (opts && opts.nullsLast)

  const comparatorFunction = (firstItem, secondItem) => {
    let comparisonValueOfFirstItem
    let comparisonValueOfSecondItem
    let result

    if (typeof attrOrFunction === 'function') {
      comparisonValueOfFirstItem = attrOrFunction(firstItem)
      comparisonValueOfSecondItem = attrOrFunction(secondItem)
    } else {
      comparisonValueOfFirstItem = firstItem[attrOrFunction]
      comparisonValueOfSecondItem = secondItem[attrOrFunction]
    }

    if (comparisonValueOfFirstItem > comparisonValueOfSecondItem) {
      if (reversed) {
        result = -1
      } else {
        result = 1
      }
    } else if (comparisonValueOfFirstItem < comparisonValueOfSecondItem) {
      if (reversed) {
        result = 1
      } else {
        result = -1
      }
    } else if (comparisonValueOfFirstItem === null && comparisonValueOfSecondItem !== null) {
      result = nullsLast ? 1 : -1
    } else if (comparisonValueOfFirstItem !== null && comparisonValueOfSecondItem === null) {
      result = nullsLast ? -1 : 1
    } else {
      if (comparatorFunction.nextStep != null) {
        result = comparatorFunction.nextStep(firstItem, secondItem)
      } else {
        result = 0
      }
    }

    return result
  }

  let lastStepInComparisonChain = comparatorFunction

  comparatorFunction.thenComparing = function(attrOrFunction, opts) {
    lastStepInComparisonChain = lastStepInComparisonChain.nextStep = buildComparisonStep(attrOrFunction, opts)

    return this
  }

  return comparatorFunction
}

exports.comparing = (attrOrFunction, opts) => buildComparisonStep(attrOrFunction, opts)