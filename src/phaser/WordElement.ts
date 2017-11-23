import Element from './Element'
import TextElement from './TextElement';
import { isString } from 'lodash'

export default class WordElement extends Element<Phaser.Text, JSX.PhaserWorldAttributes> {
  static isWorldElement (obj: any): obj is WordElement {
    return obj.constructor === WordElement
  }
  
  instance: Phaser.Text;
  parent: TextElement;

  constructor (game: Phaser.Game, props: JSX.PhaserWorldAttributes) {
    super(props)
  }

  appendChild (child) {
    this.props = Object.assign({}, this.props, {
      children: this.props.children + '' + child
    })
  }

  commitUpdate (updatePayload: any[], oldProps: JSX.PhaserWorldAttributes, newProps: JSX.PhaserWorldAttributes) {
    this.props = newProps
    this.parent && this.parent.rebuild()
  }

  insertBefore (child: Element<any, any>, beforeChild: Element<any, any>) {
    //
  }

  length () {
    return this.textFromChild().length
  }

  setParent (i: TextElement) {
    this.parent = i
  }

  textFromChild () {
    const children = this.props.children
    if (Array.isArray(children)) {
      return children.reduce((a, b) => {
        return a + b
      }, '')
    } else if (isString(children)) {
      return children
    }
    return ''
  }
}
