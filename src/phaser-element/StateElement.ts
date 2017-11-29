import { createElement } from 'react'
import Element from './Element'
import { isString, isFunction } from 'lodash'

export default class StateElement extends Element<any, any>{
  private static PhaserRender: any
  static registerPhaserRender (render) {
    StateElement.PhaserRender = render
  }
  static isStateElement(obj: any): obj is StateElement {
    return obj.constructor === StateElement
  }
  
  instance: any
  game: Phaser.Game

  constructor (foo: any, props: JSX.PhaserStateAttributes) {
    super(props)
    this.instance = this.createState(props)
  }

  appendChild (child) {}

  appendInitialChild (child: Element<any, any>) {
    this.appendChild(child)
  }

  prepareUpdate () {
    return null
  }

  commitUpdate (
    updatePayload: any[],
    oldProps: JSX.PhaserStateAttributes,
    newProps: JSX.PhaserStateAttributes) {
  }

  createState (props) {
    return class extends Phaser.State {
      preload () {
        props.preload && props.preload.call(null, this)
      }

      create () {
        props.create && props.create.call(null, this)
        if (props.component) {
          const container = StateElement.PhaserRender.createContainer(this.game)
          let childVDOM = props.component
          if (isString(props.component) || isFunction(props.component)) {
            childVDOM = createElement(props.component)
          }
          StateElement.PhaserRender.updateContainer(childVDOM, container)
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

  setGame (g) {
    this.game = g
  }
}
