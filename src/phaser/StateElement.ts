import { createElement } from 'react'
import Element from './Element'
import PhaserRender from '../PhaserRender'

export default class StateElement extends Element<any, any>{
  static isStateElement(obj: any): obj is StateElement {
    return obj.constructor === StateElement
  }
  
  // reactRoot: any
  instance: any

  constructor (reactRoot: any, props: any) {
    super(props)
    // this.reactRoot = reactRoot
    this.instance = this.createState(props)
  }

  appendChild (child) {}

  appendInitialChild (child: Element<any, any>) {
    this.appendChild(child)
  }

  commitUpdate () {}

  createState (props) {
    return class extends Phaser.State {
      preload () {
        props.preload && props.preload.call(null, this)
      }

      create () {
        props.create && props.create.call(null, this)
        if (props.component) {
          const container = PhaserRender.createContainer(this.game)
          const childVDOM = createElement(props.component)
          PhaserRender.updateContainer(childVDOM, container)
        }
      }

      update () {
        props.update && props.update.call(null, this)
      }

      loadUpdate () {
        props.loadUpdate && props.loadUpdate.call(null, this)
      }

      loadRender () {
        props.loadRender && props.loadRender.call(null, this)
      }

      preRender () {
        props.preRender && props.preRender.call(null, this)
      }

      render () {
        props.render && props.render.call(null, this)
      }

      paused () {
        props.paused && props.paused.call(null, this)
        
      }

      pauseUpdate () {
        props.pauseUpdate && props.pauseUpdate.call(null, this)
        
      }

      resumed () {
        props.resumed && props.resumed.call(null, this)
        
      }

      shutdown () {
        props.shutdown && props.shutdown.call(null, this)
      }
    }
  }

  insertBefore () {}
}
