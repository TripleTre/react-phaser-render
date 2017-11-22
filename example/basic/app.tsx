import React from 'react'
import ReactDOM from 'react-dom'
// import { Game } from 'react-phaser'
import PhaserRender from '../../src/PhaserRender'
import 'pixi'
import 'p2'
import * as Phaser from 'phaser-ce'
import GroupElement from 'src/phaser/GroupElement';
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
  scale?: Phaser.Point;
  anchor?: Phaser.Point;
  show?: boolean;
  play?: boolean;
  texts?: JSX.Element[];
}

class Game extends React.Component<ReactPhaser.GameProps, AppState> {
  refs: {
    group: GroupElement
  }

  constructor () {
    super();
    this.state = {
      scale: new Phaser.Point(2, 1),
      anchor: new Phaser.Point(0, 0),
      play: true,
      show: false
    }
    this.walkStartHandle = this.walkStartHandle.bind(this)
  }

  componentWillMount () {
    document.addEventListener('click', () => {
      this.setState(Object.assign(this.state, {
        scale: this.state.scale.invert(),
        anchor: this.state.anchor.invert(),
        play: !this.state.play,
        show: true
      }))
      console.log(this.state)
    })
    window['__app__'] = this
  }

  render () {
    const { scale, anchor } = this.state
    return <group name='outter' ref='group'>
      <text x={32} y={32} style={{ fill: 'red' }}>
        text for
      </text>
      <sprite x={20} y={36} scale={new Phaser.Point(4, 4)}
          smoothed={false} assetKey={'mummy'}>
          <animation ref={'ani'} play={this.state.play} frameRate={4}
            loop={true} onStart={this.walkStartHandle} name={'walk'}>
          </animation>
        </sprite>
      <group name='inner' index={0}>
        <image x={0} y={-400} scale={scale} anchor={anchor} assetKey={'thorn_lazur'}></image>
        { this.state.show && 
          <sprite x={100} y={360} scale={new Phaser.Point(4, 4)}
            smoothed={false} assetKey={'mummy'}>
              <animation play={true} frameRate={4} loop={true} 
                onStart={this.walkStartHandle}
                name={'walk'}>
              </animation>
        </sprite>
        }
        <sprite x={200} y={360} scale={new Phaser.Point(4, 4)}
          smoothed={false} assetKey={'mummy'}>
          <animation ref={'ani'} play={this.state.play} frameRate={4}
            loop={true} onStart={this.walkStartHandle} name={'walk'}>
          </animation>
        </sprite>
        {this.state.texts}
      </group>
    </group>
  }

  walkStartHandle () {
    this.setState({
      texts: [
        <sprite x={100} y={60} scale={new Phaser.Point(4, 4)} key={'0'}
        smoothed={false} assetKey={'mummy'}>
          <animation play={true} frameRate={4} loop={true} 
            onStart={this.walkStartHandle}
            name={'walk'}>
          </animation>
    </sprite>
      ]
    })
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
        game.add.plugin(Phaser.Plugin['Debug'])
        // const text = game.add.text(32, 32, 'Animation startedAnimation startedAnimation startedAnimation startedAnimation startedAnimation startedAnimation startedAnimation startedAnimation startedAnimation startedAnimation started', { fill: 'white' })
        // text.addColor('#aaccdd', 6)
        // window['__text__'] = text
      }
    })
    window['__game'] = game
  }
}
r.render(
  <Game
    width={800}
    height={600}
    assets={assets}/>, document.getElementById('app'))

class G extends React.Component<any, any> {
  componentDidMount () {
    // r.render(
    //   <Game
    //     width={800}
    //     height={600}
    //     assets={assets}/>, document.getElementById('app'))
  }

  render () {
    return null
  }
}

class Foo extends React.Component<any, any> {
  constructor () {
    super()
    this.state = {
      foo: 'foo'
    }
  }

  render () {
    return (
      <div onClick={this.click}>
        <div>
          <div>{this.props.children}</div>
        </div>
      </div>
    )
  }

  click = () => {
    this.setState({
      foo: Math.random()
    })
  }
}

ReactDOM.render(<Foo><G /></Foo>, document.getElementById('foo'))
