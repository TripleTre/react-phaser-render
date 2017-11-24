import PhaserRender from './PhaserRender'

export function render (element, container) {
  // const game = window['__game'] = new Phaser.Game(800, 600, container, 'app', {
  //   create: function () {
  //     const m = PhaserRender.createContainer(game)
  //     PhaserRender.updateContainer(element, m, null)
  //   }
  // })
  const m = PhaserRender.createContainer(element)
  PhaserRender.updateContainer(element, m, null)
}
