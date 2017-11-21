import { PhaserImageAttributes } from './inherit'
import DisplayElement from './DisplayElement'
import Element from './Element'

/** todo props 
   * mask -> should be a child
   * animation -> should be a child
   * hitArea -> should be a child
   * cropRect -> must call updateCrop after it's value changed
   * shader -> undo
   * */
export default class ImageElement extends DisplayElement<Phaser.Image, JSX.PhaserImageAttributes> {
  static SPECIAL_UPDATE_PROPS = []

  instance: Phaser.Image;

  constructor (game: Phaser.Game, public props: JSX.PhaserImageAttributes) {
    super(props)
    const { x, y, assetKey, frame } = props
    this.instance = new Phaser.Image(game, x, y, assetKey, frame)
    this.propsToInstance(props, PhaserImageAttributes)
    this.mixinGroupChildProps(props)
  }

  appendChild (child: any) {
    debugger
  }

  prepareUpdate (
    oldProps: JSX.PhaserImageAttributes,
    newProps: JSX.PhaserImageAttributes
  ) {
    return this.diffProps(oldProps, newProps)
  }

  commitUpdate (
    updatePayload: any[],
    oldProps: JSX.PhaserImageAttributes,
    newProps: JSX.PhaserImageAttributes) {
      this.commitNormalProps(updatePayload, oldProps, newProps)
  }

  insertBefore (child: Element<any, any>, beforeChild: Element<any, any>) {
    
  }
}
