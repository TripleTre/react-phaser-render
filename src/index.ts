import PhaserRender from './PhaserRender'

function loadAssets (game: Phaser.Game, assetsConf) {
  game.load.crossOrigin = true
  assetsConf.image.forEach(({path, key, file}) => {
    // todo 是否每次都更改 path
    game.load.path = path
    game.load.image(key, file)
  })
  assetsConf.spritesheet.forEach(({path, key, file,
    frameWidth, frameHeight, frameMax}) => {
      game.load.path = path
      game.load.spritesheet(key, file, frameWidth, frameHeight, frameMax)
  })
}

export function render (element, container) {
  const game = window['__game'] = new Phaser.Game(800, 600, container, 'app', {
    preload: function () {
      loadAssets(game, element.props.assets)
    },
    create: function () {
      const m = PhaserRender.createContainer(game)
      PhaserRender.updateContainer(element, m, null)
      game.add.plugin(Phaser.Plugin['Debug'])
    }
  })
}
