import Element from './Element'

export default class WordElement extends Element<Phaser.Text, JSX.PhaserWorldAttributes> {
  static isWorldElement (obj: any): obj is WordElement {
    return obj.constructor === WordElement
  }
  
  instance: Phaser.Text;

  constructor (game: Phaser.Game, props: JSX.PhaserWorldAttributes) {
    super(props)
  }

  appendChild () {
    debugger
    // todo 文本作为子元素
  }

  commitUpdate (updatePayload: any[], oldProps: JSX.PhaserWorldAttributes, newProps: JSX.PhaserWorldAttributes) {
    debugger
  }

  insertBefore (child: Element<any, any>, beforeChild: Element<any, any>) {
    // world 只可能存在字符串做为子元素
    debugger
  }

  setInstance (i: Phaser.Text) {
    this.instance = i
  }
}
