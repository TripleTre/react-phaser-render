import React from 'react'
import PhaserRender from '../PhaserRender'
import 'pixi'
import 'p2'
import * as Phaser from 'phaser-ce'
window['Phaser'] = Phaser
export default class Game extends React.Component<ReactPhaser.GameProps, any> {
  mountNode: any
  game: Phaser.Game

  componentDidMount () {
    const {width, height, renderer = 0, assets } = this.props
    const _this = this
    this.game = new Phaser.Game(width, height, renderer, 'app', {
      preload: function () {
        const game: Phaser.Game = this.game
        Object.keys(assets).forEach(type => {
          assets[type].forEach(({path, key, file}: ReactPhaser.AssetItem) => {
            game.load.crossOrigin = true
            game.load.path = path
            game.load[type](key, file)
          })
        })
      },
      create: function () {
        PhaserRender.updateContainer(_this.props.children, _this.mountNode, _this)
      }
    })
    // this.game.world = new Phaser.World(this.game)
    this.mountNode = PhaserRender.createContainer(this.game)
  }

  componentDidUpdate (prevProps, prevState) {
    PhaserRender.updateContainer(this.props.children, this.mountNode, this)
  }

  componentWillUnmount() {
    // PhaserRender.updateContainer(null, this.mountNode, this);
  }

  render () {
    return <game {...this.props}></game>
  }
}
