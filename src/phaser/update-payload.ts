import { isEqual } from 'lodash'

function equal (a, b) {
  if (a.constructor !== void 0
      && a.constructor === b.constructor
      && typeof a.equals === 'function') {
      return a.equals(b)
  }
  return isEqual(a, b)
}

function updatePayload (oldProps, newProps) {
  let updatePayload = []
  for (const key in newProps) {
    if (newProps.hasOwnProperty(key)) {
      const lastProp = oldProps[key]
      const nextProp = newProps[key]
      if (!equal(lastProp, nextProp)) {
        updatePayload.push(key, nextProp)
      }
    }
  }
  return updatePayload
}

export default {
  image: (oldProps, newProps) => {
    return updatePayload(oldProps, newProps)
  }
}
