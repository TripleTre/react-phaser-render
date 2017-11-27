import Element from './Element'
import { createElement } from 'react'
import StateElement from './StateElement'
import invariant from 'fbjs/lib/invariant'
// import PhaserRender from '../PhaserRender'
import {
  isString,
  isFunction
} from 'lodash'

function safeCal (fn, argment) {
  if (isFunction(fn)) {
    fn.call(null, argment)
  }
}

export default class GameElement extends Element<Phaser.Game, any> {
  private static PhaserRender: any
  static registerPhaserRender (render) {
    GameElement.PhaserRender = render
  }
  static isGameElement(obj: any): obj is GameElement {
    return obj.constructor === GameElement
  }

  // reactRoot: any;
  instance: Phaser.Game;

  constructor (container: any, props: JSX.PhaserGameAttributes) {
    super(props)
    const that = this
    let state = {
      preload: () => {
        safeCal(props.preload, that.instance)
      },
      update: () => {
        safeCal(props.update, that.instance)
      },
      loadUpdate: () => {
        safeCal(props.loadUpdate, that.instance)
      },
      loadRender: () => {
        safeCal(props.loadRender, that.instance)
      },
      preRender: () => {
        safeCal(props.preRender, that.instance)
      },
      render: () => {
        safeCal(props.render, that.instance)
      },
      paused: () => {
        safeCal(props.paused, that.instance)
      },
      pauseUpdate: () => {
        safeCal(props.pauseUpdate, that.instance)
      },
      resumed: () => {
        safeCal(props.resumed, that.instance)
      },
      shutdown: () => {
        safeCal(props.shutdown, that.instance)
      },
      create: () => {
        safeCal(props.create, that.instance)
        if (that.instance === undefined) {
          debugger
        }
        const container = GameElement.PhaserRender.createContainer(that.instance)
        let childVDOM = props.component
        if (isString(props.component) || isFunction(props.component)) {
          childVDOM = createElement(props.component)
        }
        GameElement.PhaserRender.updateContainer(childVDOM, container)
      }
    }
    this.instance = new Phaser.Game(
      props.width,
      props.height,
      props.renderer,
      container,
      state,
      props.transparent,
      props.physicsConfig
    )
  }

  appendInitialChild (child: any) {
    this.appendChild(child)
  }

  appendChild (child: StateElement) {
    invariant(StateElement.isStateElement(child), 'game 元素只能包含 state 子元素')
    child.setGame(this.instance)
    this.instance.state.add(child.props.name, child.instance)
    if (child.props.default) {
      this.instance.state.start(child.props.name)
    }
  }

  commitUpdate (updatePayload: any[], oldProps, newProps) {
    this.commitNormalProps(updatePayload, oldProps, newProps)
  }

  insertBefore (child: any, beforeChild: Element<any, any>) {
    this.appendChild(child)
  }
}
