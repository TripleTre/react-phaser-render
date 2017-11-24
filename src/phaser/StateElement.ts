import { createElement } from 'react'
import Element from './Element'
import PhaserRender from '../PhaserRender'

export default class StateElement extends Element<any, any>{
  static isStateElement(obj: any): obj is StateElement {
    return obj.constructor === StateElement
  }
  
  reactRoot: any
  instance: any

  constructor (reactRoot: any, props: any) {
    super(props)
    this.reactRoot = reactRoot
    this.instance = this.createState(props)
  }

  appendChild (child) {}

  appendInitialChild (child: Element<any, any>) {
    this.appendChild(child)
  }

  commitUpdate () {
    //
  }

  createState (props) {
    return class extends Phaser.State {
      preload () {
        props.preload.call(null, this)
      }

      create () {
        console.log('create')
        props.create.call(null, this)
        const container = PhaserRender.createContainer(this.game)
        const childVDOM = createElement(props.component)
        PhaserRender.updateContainer(childVDOM, container)
      }
    }
  }

  insertBefore () {
    debugger
  }
}
