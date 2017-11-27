import React from 'react'
import { expect } from 'chai'
import { render, unmount } from '../../../src/index'
import { delay } from '../../help'

describe('<game />', () => {
  it('render 单个 <game /> 是否会初始化游戏', async () => {
    const app = document.getElementById('app')
    render(<game
        width={1800}
        height={1600}
        renderer={Phaser.AUTO}
        antialias={true}/>, app)
    await delay()
    expect(app.children[0].tagName).to.be.equal('CANVAS')
    unmount()
  })

  it('render <game /> with out <state />', async () => {
    let _game

    const preload = (game: Phaser.Game) => {
      _game = game
      game.load.crossOrigin = true
      game.load.image('thorn_lazur', 'https://examples.phaser.io/assets/pics/thorn_lazur.png')
    }

    const component = <group name='component'>
      {/* <image x={0} y={-400} scale={new Phaser.Point(2, 2)} assetKey={'thorn_lazur'} smoothed={false} /> */}
      <image x={0} y={-400} scale={new Phaser.Point(2, 2)} assetKey={'thorn_lazur'} smoothed={false} />
    </group>
    const G = () => {
      return <game width={800} height={600} preload={preload}
        component={component} />
    }
    const app = document.getElementById('app')
    render(<G />, app)
    await delay(30)
    const group = _game.world.children[0] as Phaser.Group
    const image = group.children[0]
    expect(image).to.be.an.instanceof(Phaser.Image)
    unmount()
  })
})
