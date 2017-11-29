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
  static SPECIAL_UPDATE_PROPS =
    ['component']
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
        this.updateComponent(props.component)
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
    const spec = this.commitNormalProps(updatePayload, oldProps, newProps)
    for (let i = 0, len = spec.length; i < len; i += 2) {
      const key = spec[i]
      if (key === 'component') {
        this.updateComponent(newProps.component)
      }
    }
  }

  /**
   * 处理 <game /> component 属性变化
   */
  updateComponent (component) {
    const container = GameElement.PhaserRender.createContainer(this.instance)
    if (isString(component) || isFunction(component)) {
      component = createElement(component)
    }
    invariant(component.type === 'group', `<game /> component 属性必须以 <group /> 做为开始标签; 错误标签：<${component.type} />`)
    debugger
    GameElement.PhaserRender.updateContainer(component, container)
  }

  insertBefore (child: any, beforeChild: Element<any, any>) {
    this.appendChild(child)
  }
}
