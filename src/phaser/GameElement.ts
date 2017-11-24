import Element from './Element'
import StateElement from './StateElement'
import invariant from 'fbjs/lib/invariant'

export default class GameElement extends Element<Phaser.Game, any> {
  static isGameElement(obj: any): obj is GameElement {
    return obj.constructor === GameElement
  }

  reactRoot: any;
  instance: Phaser.Game;

  constructor (container: any, props: any) {
    super(props)
    const { width, height } = props
    this.instance = new Phaser.Game(width, height)
    this.reactRoot = container
  }

  appendInitialChild (child: any) {
    this.appendChild(child)
  }

  appendChild (child) {
    invariant(StateElement.isStateElement(child), 'game 元素只能包含 state 子元素')
    this.instance.state.add(child.props.name, child.instance)
    if (child.props.default) {
      this.instance.state.start(child.props.name)
    }
  }

  commitUpdate (updatePayload: any[], oldProps, newProps) {
    debugger
  }

  insertBefore (child: Element<any, any>, beforeChild: Element<any, any>) {
    debugger
  }
}
