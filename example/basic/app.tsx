import React from 'react'
// import ReactDom from 'react-dom'
import { render } from 'react-phaser-render'
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

interface IGame {
  width?: number;
  height?: number;
  assets?: any;
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
  debugger
  loadAssets(state, AssetsConf)
}

function firstCreate (state: Phaser.State) {
  console.log(state)
}

function App({
  width = 800,
  height = 600,
  assets = AssetsConf
}: IGame) {
  return (
    <game
      width={800}
      height={600}
      assets={AssetsConf}>
        <state
          name='first'
          preload={firstPreload}
          create={firstCreate} component={First} default/>
        <state name='second' component={First} />
    </game>
  )
}

// const config = {
//   width: 800,
//   height: 600,
//   renderer: Phaser.AUTO,
//   antialias: true
// }

render(
  <App
    width={800}
    height={600}/>, document.getElementById('app'))
