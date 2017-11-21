import Element from './Element'

export default class AnimationElement extends Element<Phaser.Animation, JSX.PhaserAnimationAttributes>{
  static SPECIAL_UPDATE_PROPS =
    ['play']

  static isAnimationElement (obj: any): obj is AnimationElement {
    return obj.constructor === AnimationElement
  }

  public props: JSX.PhaserAnimationAttributes
  public instance: Phaser.Animation

  constructor (game: Phaser.Game, props: JSX.PhaserAnimationAttributes) {
    super(props)
  }

  addEventListener = (listener: (() => any) | {once: () => any}) => {
    if (listener) {
      if (typeof listener === 'function') {
        this.instance.onStart.add(listener)
      } else {
        this.instance.onStart.addOnce(listener.once)
      }
    }
  }

  appendChild () {}

  install (target: Phaser.Sprite) {
    const {name, frames, frameRate, killOnComplete,
      loop, useNumericIndex, play } = this.props
    this.instance = target.animations.add(name, frames, frameRate, loop, useNumericIndex)
    if (play === true) {
      this.instance.play(frameRate, loop, killOnComplete)
    }
    ['onStart', 'onComplete', 'onLoop', 'onUpdate']
      .map(v => this.props[v])
      .forEach(this.addEventListener)
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
        if (key === 'play') {
          if (value === true) {
            this.instance.play(this.props.frameRate, this.props.loop, this.props.killOnComplete)
          } else if (value === false) {
            this.instance.complete()
          }
        }
      }
  }

  insertBefore (child: Element<any, any>, beforeChild: Element<any, any>) {

  }
}
