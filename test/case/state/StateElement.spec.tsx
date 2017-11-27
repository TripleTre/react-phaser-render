import React from 'react'
import { expect } from 'chai'
import {
  StateElement,
  GameElement
} from '../../../src/phaser-element'
import { delay } from '../../help'


describe('StateElement', () => {
  it('StateElement.commitUpdate: 是否能响应 component props 更改', async () => {
    const componentA = <group name='componentA'></group>
    const componentB = <group name='componentB'></group>
    const game = new GameElement(null, {})
    const state = new StateElement(null, {
      name: 'state',
      default: true,
      component: componentA
    })
    game.appendChild(state)
    await delay(300)
    expect(game.instance.state.states).to.be.haveOwnProperty('state')
    expect(game.instance.state.states.state.world.children[0].name).to.be.equal('componentA')

    state.commitUpdate(
      ['component', componentB], 
      {component: componentA, name: 'state'},
      {component: componentA, name: 'state'})
      // expect(game.instance.state.states.state.children[0].name).to.be.equal('componentB')
  })
})
