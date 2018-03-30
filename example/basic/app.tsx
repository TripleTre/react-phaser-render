import React from 'react'
import { render } from '../../src/index'
import 'pixi'
import 'p2'
import * as PhaserCE from 'phaser-ce'
import First from './first'

window['Phaser'] = PhaserCE

const AssetsConf = {
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

function loadAssets (game: Phaser.Game | Phaser.State, assetsConf) {
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

function firstPreload (state: Phaser.State) {
  loadAssets(state, AssetsConf)
}

function firstCreate (state: Phaser.State) {
  console.log(state)
}

class App extends React.Component<any, any> {
  render () {
    return (
      <game
        width={800}
        height={600}>
          <state
            name='first'
            preload={firstPreload}
            create={firstCreate} component={First} default/>
      </game>
    ) 
  }
}

render(
  <App />, document.getElementById('app'))
