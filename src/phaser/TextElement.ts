import Element from "./Element";
import { PhaserTextAttributes } from './inherit'

export default class TextElement extends Element<Phaser.Text, JSX.PhaserTextAtrributes> {
  static isTextElement (obj): obj is TextElement {
    return obj.constructor === TextElement
  }
  
  instance: Phaser.Text;

  constructor (game: Phaser.Game, props: JSX.PhaserTextAtrributes) {
    super(props)
    let text = ''
    const { x, y, children, style } = props
    if (!Array.isArray(children)) {
      text = children
    }
    this.instance = new Phaser.Text(game, x, y, text, style)
    this.propsToInstance(props, PhaserTextAttributes)
  }

  appendChild (child) {
    if (typeof child === 'string') {
      this.instance.text += child
    }
  }

  commitUpdate (
    updatePayload: any[],
    oldProps: JSX.PhaserTextAtrributes,
    newProps: JSX.PhaserTextAtrributes) {
      this.commitNormalProps(updatePayload, oldProps, newProps)
  }

  insertBefore () {
    debugger
  }
}
