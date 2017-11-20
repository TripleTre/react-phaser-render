export default {
  group: (group: Phaser.Group, child: any) => {
    const { slient, index } = child.data.__asGroupChild
    group.add(child, slient, index)
  },

  spriate: (sprite: Phaser.Sprite, child: any) => {
    const { phaserType } = child
    if (phaserType === 'animation') {
      const props: JSX.PhaserAnimationAttributes = child.props
      const {name, frames, frameRate, killOnComplete,
            loop, useNumericIndex, play} = props
      const anim = sprite.animations.add(name, frames, frameRate, loop, useNumericIndex)
      if (play === true) {
        anim.play(frameRate, loop, killOnComplete)
      }
    }
  }
}
