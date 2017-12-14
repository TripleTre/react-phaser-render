import Element from './Element'
import { PhaserAnimationAttributes } from './inherit'

export default class AnimationElement extends Element<Phaser.Animation, JSX.PhaserAnimationAttributes>{
  static SPECIAL_UPDATE_PROPS =
    ['state', 'frameRate']

  static isAnimationElement (obj: any): obj is AnimationElement {
    return obj.constructor === AnimationElement
  }

  public instance: Phaser.Animation

  constructor (game: Phaser.Game, props: JSX.PhaserAnimationAttributes) {
    super(props)
  }

  addEventListener = ([type, listener]) => {
    if (listener) {
      if (typeof listener === 'function') {
        this.instance[type].add(listener)
      } else {
        this.instance[type].addOnce(listener.once)
      }
    }
  }

  appendChild () {}

  appendInitialChild () {}

  install (target: Phaser.Sprite) {
    const events = ['onStart', 'onComplete', 'onLoop', 'onUpdate']
    const {name, frames, frameRate,
      loop, useNumericIndex } = this.props
    this.instance = target.animations.add(name, frames, frameRate, loop, useNumericIndex)
    this.propsToInstance(this.props, PhaserAnimationAttributes)
    events
      .map(v => [v, this.props[v]])
      .forEach(this.addEventListener)
    this.stateHandle(this.props)
  }

  prepareUpdate (
    oldProps: JSX.PhaserAnimationAttributes,
    newProps: JSX.PhaserAnimationAttributes
  ) {
      return this.diffProps(oldProps, newProps)
  }

  commitUpdate (
    updatePayload: any[],
    oldProps: JSX.PhaserAnimationAttributes,
    newProps: JSX.PhaserAnimationAttributes) {
      const specUpdatePayload = this.commitNormalProps(updatePayload, oldProps, newProps)
      for (let i = 0, len = specUpdatePayload.length; i < len; i += 2) {
        const key = specUpdatePayload[i]
        const value = specUpdatePayload[i + 1]
        if (key === 'state') {
          this.stateHandle(newProps)
        } else if (key === 'frameRate') {
          this.instance.delay = 1000 / value
        }
      }
  }

  insertBefore (child: Element<any, any>, beforeChild: Element<any, any>) {}

  stateHandle (props) {
    const { state, frameRate, loop, killOnComplete } = props
    if (state === 'play') {
      this.instance.play(frameRate, loop, killOnComplete)
    } else if (state === 'done') {
      this.instance.complete()
    } else if (state === 'paused') {
      this.instance.paused = true
    }
  }
}

// todo 删除 animation 元素时，移除监听器
