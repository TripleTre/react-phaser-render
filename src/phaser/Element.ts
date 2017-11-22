import { isNil, isEqual } from 'lodash'

function equal (a, b) {
  if (a.constructor !== void 0
      && a.constructor === b.constructor
      && typeof a.equals === 'function') {
      return a.equals(b)
  }
  return isEqual(a, b)
}

export default abstract class Element<T, P extends JSX.DisplayObjectAsChild> {
  abstract instance: T;

  abstract appendChild(child: any): any;
  // abstract prepareUpdate(oldProps: P, newProps: P): any;
  abstract commitUpdate(updatePayload: any[], oldProps: P, newProps: P): any;
  abstract insertBefore(child: Element<any, any>, beforeChild: Element<any, any>): any;

  slient: boolean;
  index: number;

  constructor (public props: P) {
    this.slient = props.slient
    this.index = props.index
  }

  propsToInstance (props: P, propsConf: any) {
    propsConf.forEach(key => {
      const value = props[key]
      if (!isNil(props[key])) {
        this.instance[key] = value
      }
    })
  }

  isNormalPropKey (key: string) {
    const C: any = this.constructor
    return (key === 'children' || key === 'key' || key === 'ref') ||
      (C.SPECIAL_UPDATE_PROPS && C.SPECIAL_UPDATE_PROPS.indexOf(key) >= 0)
  }

  diffProps (oldProps: P, newProps: P) {
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

  commitNormalProps (
    updatePayload: any[],
    oldProps: P,
    newProps: P
  ) {
    let specialProps = []
    for (let i = 0; i < updatePayload.length; i += 2) {
      const key = updatePayload[i]
      const value = updatePayload[i + 1]
      if (!this.isNormalPropKey(key)) {
        this.instance[key] = value
      } else {
        specialProps.push(key, value)
      }
    }
    return specialProps
  }

  prepareUpdate (oldProps: P, newProps: P) {
    return this.diffProps(oldProps, newProps)
  }
}
