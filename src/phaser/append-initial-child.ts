export default {
  group: (group: Phaser.Group, child: any) => {
    const { slient, index } = child.data.__asGroupChild
    group.add(child, slient, index)
  },

  spriate: (sprite: Phaser.Sprite, child: any) => {
    const { phaserType, props } = child
    if (phaserType === 'animation') {
      const anim = sprite.animations.add(props.name)
      if (props.play === true) {
        anim.play(props.frameRate, props.loop, props.killOnComplete)
      }
    }
  }
}
