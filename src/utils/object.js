import { trim } from './string.js'
export const isObject = obj => obj === Object(obj)

/**
 * Creates an object composed of the picked object properties.
 *
 * @param {Object} object
 * @param {Array.<String>} props
 * @returns {Object}
 */
export const pick = (object, props) => {
  //support for functional programming
  if (!props && object instanceof Array) {
    props = object

    return object => pick(object, props)
  }

  const result = {}

  props.forEach(prop => {
    result[prop] = object[prop]
  })

  return result
}

/**
 * Assigns own and inherited enumerable string keyed properties of source objects to the destination object
 * for all destination properties that resolve to undefined.
 *
 * @param {Object} object
 * @param {Object} defaults
 * @returns {Object}
 */
export const defaults = (object, defaults) => {
  Object.keys(defaults).forEach(key => {
    if (object[key] === undefined) {
      object[key] = defaults[key]
    }
  })

  return object
}

/**
 * The opposite of `pick` this method creates an object composed of the own and inherited enumerable
 * properties of `object` that are not omitted
 *
 * @param {Object} object
 * @param {String[]} props The properties to omit
 * @returns {Object}
 */
export const omit = (object, props) => {
  return omitBy(object, (value, prop) => props.includes(prop))
}

/**
 * This method creates an object composed of the own and inherited enumerable string keyed properties
 * of object that predicate doesn't return truthy for.
 * The predicate is invoked with two arguments: (value, key).
 *
 * @param {Object} object
 * @param {Function} predicate
 * @returns {Object}
 */
export const omitBy = (
  object,
  predicate = this.predicates.isNil,
) => {
  const result = {}

  for (const prop in object) {
    if (!predicate(object[prop], prop)) {
      result[prop] = object[prop]
    }
  }

  return result
}

export const predicates = {
  isUndefined: value => value === undefined,

  //Checks if `value` is `null` or `undefined`.
  isNil: value => value == null,

  isPrimitive: value => value !== Object(value),

  isEmptyString: value => typeof value === 'string' && value === '',

  isEmptyRange: value => isObject(value) && value.from === null && value.to === null,

  isNilRange: value => isObject(value) && value.from === 0 && value.to === 0,

  isEmptyArray: value => Array.isArray(value) && !value.length
}

export const values = object => Object.keys(object).map(key => object[key])

/**
 * Checks if two objects are equal by certain properties
 *
 * @param {Object} obj
 * @param {Object} anotherObj
 * @param {Array} properties names list
 * @returns {Boolean}
 */
export const isEqualBy = (obj, anotherObj, properties) => {
  return properties.reduce((memo, propertyName) => {
    return memo && obj[propertyName] === anotherObj[propertyName]
  }, true)
}

/**
 *
 * @param {Object} obj
 * @returns {Object}
 */
export const clone = obj => {
  if (Array.isArray(obj)) {
    return obj.concat()
  }

  if (isObject(obj)) {
    return Object.assign({}, obj)
  }

  return obj
}

export const cloneDeep = obj => {
  if (Array.isArray(obj)) {
    return obj.map(cloneDeep)
  }

  if (isObject(obj)) {
    const result = clone(obj)

    Object.keys(obj).forEach(key => {
      result[key] = cloneDeep(obj[key])
    })

    return result
  }

  return obj
}

/**
 * Flattens an object
 *
 * @param {Object} data
 * @param {Object} [into]
 * @param {String} [prefix]
 * @returns {Object}
 *
 * @example
 *
 * makeFlat ({
 *   name: 'Bob',
 *   address: {
 *     street: 'StreetName',
 *     zip: 1234
 *   }
 * })
 *
 * // => {
 *  name: 'Bob',
 *  address.street: 'StreetName',
 *  address.zip: 1234
 * }
 **/
export const makeFlat = function(data, into, prefix) {
  into = into || {}
  prefix = prefix || ''

  for (const key in data) {
    const val = data[key]

    if (!!val && Array.isArray(val)) {
      val.forEach(val, function(item, index) {
        makeFlat(item, into, prefix + key + '.' + index + '.')
      })
    } else if (!!val && isObject(val)) {
      makeFlat(val, into, prefix + key + '.')
    } else {
      into[prefix + key] = val
    }
  }

  return into
}

export const get = (object, path) => {
  path = Array.isArray(path) ? path : path.split('.')

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[path[index++]]
  }

  return (index && index === length) ? object : undefined
}

export const set = (object, path, value) => {
  path = Array.isArray(path) ? path : path.split('.')

  for (let i = 0; i < path.length; i++) {
    const pathElement = path[i]

    if (i === path.length - 1) {
      object[pathElement] = value
    } else {
      object = object[pathElement] = object[pathElement] || {}
    }
  }
}

export const sortKeys = obj => {
  const result = {}

  Object.keys(obj).sort().forEach(key => {
    result[key] = obj[key]
  })

  return result
}

export const decoratePrototype = (object, decorator) => {
  const methods = Object.getOwnPropertyNames(object.prototype)

  methods.forEach(method => {
    if (method !== 'constructor') {
      object.prototype[method] = decorator(object.prototype[method])
    }
  })

  return object
}

/**
 * Returns a copy of the object where the keys have become the values and the values the keys
 *
 * @param {Object} object
 * @returns {Object}
 */
export const invert = object => {
  return Object.keys(object).reduce((resultObject, key) => ({
    ...resultObject,
    [object[key]]: key,
  }), {})
}

/**
 * Creates an object with the same keys as object and values generated by running
 * each own enumerable property of object through the callback.
 *
 * The predicate is invoked with three arguments; (value, key, object).
 *
 * @param {Object} object
 * @param {Function} iteratee
 * @returns {Object}
 */
export const mapValues = (object, iteratee) => {
  const result = {}

  for (const property of object) {
    result[property] = iteratee(object[property], property, object)
  }

  return result
}

/**
 *
 * @param {Object} object
 * @param {String} property
 * @returns {Boolean}
 */
export const hasOwnProperty = (object, property) => {
  return Object.prototype.hasOwnProperty.call(object, property)
}

export const trimStringValues = object => Object.keys(object).reduce(
  (result, key) => Object.assign(result, { [key]: trim(object[key]) }),
  {},
)

export const equals = (a, b) => a === b || JSON.stringify(a) === JSON.stringify(b)

export const compare = (a, b, attributes) => {
  if (!attributes) {
    attributes = Object.keys(a)
  }

  return attributes.filter(attr => !equals(a[attr], b[attr]))
}