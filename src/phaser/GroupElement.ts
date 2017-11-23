import { PhaserGroupAttributes } from './inherit'
import invariant from 'fbjs/lib/invariant'
import Element from './Element';

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
    window[`__group_${props.name}`] = this.instance
  }

  appendChild (child: Element<any, any>) {
    const instance = child.instance
    invariant(instance, `group 不支持${typeof child}类型子元素`)
    this.instance.add(instance, this.slient, child.index)
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
