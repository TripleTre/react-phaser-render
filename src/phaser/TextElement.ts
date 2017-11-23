import Element from "./Element";
import WordElement from './WordElement';
import { PhaserTextAttributes } from './inherit';
import InternalText from './InternalText'
import { isFunction } from 'lodash'

export default class TextElement extends Element<Phaser.Text, JSX.PhaserTextAtrributes> {
  static isTextElement (obj): obj is TextElement {
    return obj.constructor === TextElement
  }

  children: (InternalText | WordElement)[]
  instance: Phaser.Text;

  constructor (game: Phaser.Game, props: JSX.PhaserTextAtrributes) {
    super(props)
    let text = ''
    const { x, y, children, style } = props
    if (!Array.isArray(children)) {
      text = children
    }
    this.children = []
    this.instance = new Phaser.Text(game, x, y, text, style)
    this.propsToInstance(props, PhaserTextAttributes)
  }

  appendChild (child) {
    if (WordElement.isWorldElement(child) ||
        InternalText.isInternalText(child)) {
          child.setParent(this)
    }
    this.children.push(child)
    this.rebuild()
  }

  commitUpdate (
    updatePayload: any[],
    oldProps: JSX.PhaserTextAtrributes,
    newProps: JSX.PhaserTextAtrributes) {
      this.commitNormalProps(updatePayload, oldProps, newProps)
  }

  insertBefore (child, beforeChild) {
    const { children } = this
    const index = children.indexOf(beforeChild)
    const before = children.slice(0, index)
    const after = children.slice(index)
    this.children = before.concat(child, after)
    this.rebuild()
  }

  rebuild () {
    const phaserText = this.instance
    phaserText.clearColors()
    phaserText.clearFontValues()
    phaserText.text = this.textFromChild()
    let currentIndex = 0
    this.children.forEach(v => {
      if (WordElement.isWorldElement(v)) {
        const { fontStyle, fontWeight, color, strokeColor } = v.props
        fontStyle && phaserText.addFontStyle(fontStyle, currentIndex)
        fontWeight && phaserText.addFontWeight(fontWeight, currentIndex)
        strokeColor && phaserText.addStrokeColor(strokeColor, currentIndex)
        color && phaserText.addColor(color, currentIndex)
        currentIndex += v.length()
      } else if (InternalText.isInternalText(v)) {
        phaserText.addFontStyle(phaserText.fontStyle, currentIndex)
        phaserText.addFontWeight(phaserText.fontWeight as any, currentIndex)
        phaserText.addStrokeColor(phaserText.stroke, currentIndex)
        phaserText.addColor(phaserText.fill, currentIndex)
        currentIndex += v.text.length
      }
    })
  }

  textFromChild (): any {
    return this.children.reduce((a: string, b) => {
      if (isFunction(b.textFromChild)) {
        return a + b.textFromChild()
      }
      return a
    }, '')
  }
}
