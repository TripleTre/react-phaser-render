import TextElement from './TextElement'

export default class InternalText {
  static isInternalText (obj: any): obj is InternalText {
    return obj.constructor === InternalText
  }

  parent: TextElement;

  constructor (public text: string) {

  }

  textFromChild () {
    return this.text
  }

  setParent (i: TextElement) {
    this.parent = i
  }
}
