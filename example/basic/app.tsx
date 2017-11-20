import React from 'react'
// import ReactDOM from 'react-dom'
// import { Game } from 'react-phaser'
import PhaserRender from '../../src/PhaserRender'
import 'pixi'
import 'p2'
import * as Phaser from 'phaser-ce'
window['Phaser'] = Phaser

const assets = {
  image: [
    {
      path: 'https://examples.phaser.io/assets/pics/',
      file: 'thorn_lazur.png',
      key: 'thorn_lazur'
    }
  ],
  spritesheet: [
    {
      path: 'https://examples.phaser.io/assets/sprites/',
      file: 'metalslug_mummy37x45.png',
      key: 'mummy',
      frameWidth: 37,
      frameHeight: 45,
      frameMax: 18
    }
  ]
}

interface AppState {
  scale: Phaser.Point;
  anchor: Phaser.Point;
  show: boolean;
}

class Game extends React.Component<ReactPhaser.GameProps, AppState> {
  constructor () {
    super();
    this.state = {
      scale: new Phaser.Point(2, 2),
      anchor: new Phaser.Point(0, 0),
      show: true
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    document.addEventListener('click', () => {
      this.setState(Object.assign(this.state, {
        scale: this.state.scale.invert(),
        anchor: this.state.anchor.invert()
      }))
    })
  }

  render () {
    const { scale, anchor } = this.state
    return <group>
        <image
          x={0}
          y={-400}
          scale={scale}
          anchor={anchor}
          assetKey={'thorn_lazur'}>
        </image>
        <sprite x={200}
          y={360}
          scale={new Phaser.Point(4, 4)}
          smoothed={false}
          assetKey={'mummy'}>
          <animation
            play={true}
            frameRate={40}
            loop={true}
            name={'walk'}></animation>
        </sprite>
      </group>
  }
}

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

const r = {
  render (element, container) {
    const game = new Phaser.Game(800, 600, container, 'app', {
      preload: function () {
        loadAssets(game, assets)
        game.load.spritesheet('mummyy', 'https://examples.phaser.io/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
      },
      create: function () {
        const m = PhaserRender.createContainer(game)
        PhaserRender.updateContainer(element, m, null)
      }
    })
  }
}
r.render(
  <Game
    width={800}
    height={600}
    assets={assets}/>, document.getElementById('app'))
