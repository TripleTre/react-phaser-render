import { expect } from 'chai'
import {
  GameElement,
  StateElement
} from '../../../src/phaser-element'
import { delay } from '../../help'


let gameElement
let preload = false
let create = false
let update = false

const gameConf = {
  width: 1800,
  height: 1600,
  renderer: Phaser.AUTO,
  antialias: true,
  preload: () => {
    preload = true
  },
  create: () => { create = true},
  update: () => { update = true}
}

declare var before, after
describe('GameElment', () => {
  before(() => {
    gameElement = new GameElement(null, gameConf)
  })

  after(() => {
    gameElement.instance.destroy()
    gameElement = null
    document.getElementById('app').innerHTML = ''
  })

  it('GameElment instance 属性是否正确', async () => {
    await delay()
    const game = gameElement.instance
    expect(game).to.be.instanceof(Phaser.Game)
    expect(game.width).to.be.equal(1800)
    expect(game.height).to.be.equal(1600)
    expect(game.antialias).to.be.true
  })
  it('Phaser.Game 生命周期函数是否调用', async () => {
    await delay()
    expect(preload).to.be.true
    expect(create).to.be.true
    expect(update).to.be.true
  })
  it('GameElement.appendChild: GameElment 是否只能添加 state 子元素', () => {
    expect(() => {
      gameElement.appendChild({})
    }).to.throw('game 元素只能包含 state 子元素')
  })
  it('GameElement.appendChild: 添加 state 子元素后，Phaser.Game 是否有相应的 state', async () => {
    const firstState = new StateElement(null, {name: 'first', default: true})
    const secondState = new StateElement(null, {name: 'second'})
    gameElement.appendChild(firstState)
    gameElement.appendChild(secondState)
    await delay()
    const game = gameElement.instance
    expect(game.state.current).to.be.equal('first')
    expect(game.state.states).to.haveOwnProperty('first')
    expect(game.state.states).to.haveOwnProperty('second')
  })
  it('GameElement.commitUpdate: 是否能响应 props 的变化', async () => {
    // @mark: width 和 height 只会在窗口大小变化后实际应用到 canvas 上
    const update = ['width', 800, 'height', 600]
    gameElement.commitUpdate(update, null, null)
    await delay()
    const game = gameElement.instance
    expect(game.width).to.be.equal(800)
    expect(game.height).to.be.equal(600)
  })
  it('GameElement.insertBefore: 是否能动态添加 state', async () => {
    const newState = new StateElement(null, {name: 'new'})
    gameElement.insertBefore(newState, null)
    await delay()
    const game = gameElement.instance
    expect(game.state.states).to.haveOwnProperty('new')
  })
  it('isGameElement', () => {
    const game = new GameElement(document.createElement('div'), {})
    const alias = GameElement
    const gameAlias = new alias(document.createElement('div'), {})
    const other = {}
    expect(GameElement.isGameElement(game)).to.be.true
    expect(GameElement.isGameElement(gameAlias)).to.be.true
    expect(GameElement.isGameElement(other)).to.be.false
  })
})
