import Element from './Element'
import { PhaserGroupAttributes } from './inherit'

/** todo props 
   * components
   * cropRect
   * events
   * hitArea
   * mask
   * shader
   * */
export default class GroupElement extends Element<Phaser.Group, JSX.PhaserGroupAttributes> {
  public instance: Phaser.Group

  constructor (game: Phaser.Game, public props: JSX.PhaserGroupAttributes) {
    super(props)
    this.instance = new Phaser.Group(game, undefined, props.name)
    this.propsToInstance(props, PhaserGroupAttributes)
  }

  appendChild (child: Element<any, any>) {
    const instance = child.instance
    let slient, index
    if (instance.data) {
      slient = instance.data.__asGroupChild.slient
      index = instance.data.__asGroupChild.index
    }
    this.instance.add(instance, slient, index)
  }

  prepareUpdate (
    oldProps: JSX.PhaserGroupAttributes,
    newProps: JSX.PhaserGroupAttributes
  ) {
    return this.diffProps(oldProps, newProps)
  }

  commitUpdate (
    updatePayload: any[],
    oldProps: JSX.PhaserGroupAttributes,
    newProps: JSX.PhaserGroupAttributes) {
      this.commitNormalProps(updatePayload, oldProps, newProps)
  }

  insertBefore (child: Element<any, any>, beforeChild: Element<any, any>) {
    const beforeInstance = beforeChild.instance
    const gorupInstance = this.instance
    const index = gorupInstance.children.indexOf(beforeInstance)
    this.instance.addAt(child.instance, index)
  }
}
