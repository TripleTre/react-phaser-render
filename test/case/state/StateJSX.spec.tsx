import React from 'react'
import { expect } from 'chai'
import { render, unmount } from '../../../src'
import { delay } from '../../help'
import GameElement from '../../../src/phaser-element/GameElement'

describe('<state />', () => {
  it('render correct state', () => {
    class App extends React.Component<any, any> {
      refs: {
        game: GameElement
      }

      componentDidMount = async () => {
        const game = this.refs.game.instance
        await delay(60)
        expect(game.state.states).to.be.haveOwnProperty('first')
        expect(game.state.states).to.be.haveOwnProperty('second')
        expect(game.state.current).to.be.equal('first')
        unmount()
      }

      render () {
        return <game ref='game'>
          <state name='first' component={null} default/>
          <state name='second' component={null} />
        </game>
      }
    }

    render(<App />, document.getElementById('app'))
  })
})
