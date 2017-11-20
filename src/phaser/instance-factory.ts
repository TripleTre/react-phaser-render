import { isNil } from 'lodash'
import {
  PhaserImageAttributes,
  PhaserSpriteProps
} from './inherit'

/**
 * 添加 Group.add 方法需要的可选参数到 instance 的 data 属性中
 * @param instance Phaser Display Object
 * @param props props
 */
function mixinGroupChildProps (instance: any, props: any) {
  if (isNil(instance.data)) {
    instance.data = Object.create(null)
  }
  Object.defineProperty(instance.data, '__asGroupChild', {
    value: {
      slient: props.slient,
      index: props.index
    },
    enumerable: false,
    configurable: false,
    writable: false
  })
}

/**
 * 设置 Phaser 对象的属性
 * @param instance 
 * @param props 
 * @param PROPS_CONFIG 
 */
function setPropsDirectly (instance, props, PROPS_CONFIG) {
  PROPS_CONFIG.forEach(key => {
    const value = props[key]
    if (!isNil(props[key])) {
      instance[key] = value
    }
  })
}

// function handleDisplayObjectProps () {
//   ['alpha', 'cacheAsBitmap', 'pivot', ]
// }

export default {
  /** todo props 
   * mask -> should be a child
   * animation -> should be a child
   * hitArea -> should be a child
   * cropRect -> must call updateCrop after it's value changed
   * shader -> undo
   * */
  image: (props: JSX.PhaserImageAttributes, internalInstanceHandle: Phaser.Game) => {
    let instance = new Phaser.Image(internalInstanceHandle, props.x, props.y, props.assetKey)
    setPropsDirectly(instance, props, PhaserImageAttributes)
    mixinGroupChildProps(instance, props)
    window['__instance'] = instance
    return instance
  },

  /** todo props 
   * mask -> should be a child
   * animation -> should be a child
   * hitArea -> should be a child
   * cropRect -> must call updateCrop after it's value changed
   * shader -> undo
   * */
  sprite: (props: any, internalInstanceHandle: Phaser.Game) => {
    let instance = new Phaser.Sprite(internalInstanceHandle, props.x, props.y, props.assetKey, props.frame)
    setPropsDirectly(instance, props, PhaserSpriteProps)
    mixinGroupChildProps(instance, props)
    return instance
  },

  /** todo props 
   * components
   * cropRect
   * events
   * hitArea
   * mask
   * shader
   * */
  group: (props: any, internalInstanceHandle: Phaser.Game) => {
    // todo handle remaining options arguments
    let instance = new Phaser.Group(internalInstanceHandle, undefined, props.name)
    mixinGroupChildProps(instance, props)
    window[`__group${props.name}`] = instance
    return instance
  },

  animation: (props: any, internalInstanceHandle: Phaser.Game) => {
    return {
      phaserType: 'animation',
      props
    }
  }
}
