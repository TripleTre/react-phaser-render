import Element from './Element'
import { isNil } from 'lodash'


export default abstract class DisplayElement<T extends {data: any}, P extends JSX.DisplayObjectAsChild> extends Element<T, P> {
  mixinGroupChildProps (props: P) {
    if (isNil(this.instance.data)) {
      this.instance.data = Object.create(null)
    }
    Object.defineProperty(this.instance.data, '__asGroupChild', {
      value: {
        slient: props.slient,
        index: props.index
      },
      enumerable: false,
      configurable: false,
      writable: false
    })
  }
}
