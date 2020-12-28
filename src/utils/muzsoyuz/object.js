export function pickChanges(prevObj, curObj, attributes = []) {
  const newObj = {}

  const arrayOfAttributes = attributes.length
                            ? attributes
                            : Object.keys(curObj)

  arrayOfAttributes.forEach((key) => {
    if (prevObj[key] !== curObj[key])
      newObj[key] = curObj[key]
  })

  return newObj
}
