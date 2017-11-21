import { PhaserSpriteAttributes } from './inherit'
import DisplayElement from './DisplayElement'
import AnimationElement from './AnimationElement'
import Element from './Element'

/** todo props 
   * mask -> should be a child
   * animation -> should be a child
   * hitArea -> should be a child
   * cropRect -> must call updateCrop after it's value changed
   * shader -> undo
   * */
export default class SpriteElement extends DisplayElement<Phaser.Sprite, JSX.PhaserSpriteAttributes> {
  instance: Phaser.Sprite;

  constructor (game: Phaser.Game, props: JSX.PhaserSpriteAttributes) {
    super(props)
    const { x, y, assetKey, frame } = props
    this.instance = new Phaser.Sprite(game, x, y, assetKey, frame)
    this.propsToInstance(props, PhaserSpriteAttributes)
    this.mixinGroupChildProps(props)
  }

  appendChild (child: any) {
    if (AnimationElement.isAnimationElement(child)) {
      this.appendAnimation(child)
      return
    }
    console.error(`Sprite 不支持 ${child} 类型子元素`)
  }

  appendAnimation (child: AnimationElement) {
    child.install(this.instance)
  }

  prepareUpdate (
    oldProps: JSX.PhaserSpriteAttributes,
    newProps: JSX.PhaserSpriteAttributes
  ) {
    return this.diffProps(oldProps, newProps)
  }

  commitUpdate (
    updatePayload: any[],
    oldProps: JSX.PhaserSpriteAttributes,
    newProps: JSX.PhaserSpriteAttributes) {
      this.commitNormalProps(updatePayload, oldProps, newProps)
  }

  insertBefore (child: Element<any, any>, beforeChild: Element<any, any>) {
    
  }
}
