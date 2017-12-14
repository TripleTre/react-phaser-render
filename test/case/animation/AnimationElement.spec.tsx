import { 
  render,
  // unmount
} from '../../../src'
import React from 'react'
import { expect } from 'chai';
import { withTestHook } from '../../help'

class Group extends React.Component<any, any> {
  render () {
    return (
      <group name='group'>
        <sprite assetKey={'test'} x={0} y={0}>
          <animation {...this.props} ref='anim'>
          </animation>
        </sprite>
      </group>
    )}
}

describe('<animation />', () => {
  it('是否能正确创建 Phaser.Animation', (done) => {
    const GroupIT: any = withTestHook({
      componentDidMount (instance) {
        const anim = instance.refs.anim.instance
        expect(anim.enableUpdate).to.be.true
        expect(anim.frame).to.be.equal(1)
        expect(anim.loop).to.be.true
        expect(anim.reversed).to.be.true
        // @remark: speed 和构造函数参数 frameRate 都依赖于 delay
        expect(anim.delay).to.be.equal(50)
        expect(anim.killOnComplete).to.be.true
        expect(anim.name).to.be.equal('anim')
        // unmount()
        done()
      }
    }, Group)
    class Test extends React.Component<any, any> {
      render () {
        return <game
          ref='game'
          preload={this.preload}
          component={<GroupIT
            name='anim'
            killOnComplete={true}
            frameRate={20}
            reversed={true}
            loop={true}
            frame={1}
            enableUpdate={true}
            />}>
        </game>
      }

      preload (game: Phaser.Game) {
        game.load.crossOrigin = true
        game.load.spritesheet('test', 'https://examples.phaser.io/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18)
      }
    }

    render(<Test />, document.getElementById('app'))
  })

  // it('是否能响应 prpos 变化', (done) => {
  //   class Group extends React.Component<any, any> {
  //     refs: {
  //       anim: any
  //     }

  //     constructor () {
  //       super()
  //       this.state = {
  //         name: 'start',
  //         killOnComplete: true,
  //         frameRate: 20,
  //         reversed: true,
  //         loop: true,
  //         frame: 1,
  //         enableUpdate: true,
  //         state: 'play'
  //       }
  //     }

  //     componentDidMount () {
  //       setTimeout(() => {
  //         this.setState({
  //           name: 'mount',
  //           killOnComplete: false,
  //           frameRate: 10,
  //           reversed: false,
  //           loop: false,
  //           frame: 2,
  //           enableUpdate: false
  //         })
  //       }, 500)
  //     }

  //     componentDidUpdate () {
  //       const anim: Phaser.Animation = this.refs.anim.instance
  //       expect(anim.enableUpdate, 'enableUpdate').to.be.false
  //       expect(anim.frame, 'frame').to.be.equal(2)
  //       expect(anim.loop, 'loop').to.be.false
  //       expect(anim.reversed, 'reversed').to.be.false
  //       // @remark: speed 和构造函数参数 frameRate 都依赖于 delay
  //       expect(anim.delay, 'delay').to.be.equal(100)
  //       expect(anim.killOnComplete, 'killOnComplete').to.be.false
  //       expect(anim.name, 'name').to.be.equal('mount')
  //       unmount()
  //       done()
  //     }

  //     render () {
  //       return <group name='group'>
  //         <sprite assetKey={'test'} x={10} y={10}>
  //           <animation
  //             ref='anim' {...this.state}>
  //           </animation>
  //         </sprite>
  //       </group>
  //     }
  //   }

  //   class Test extends React.Component<any, any> {
  //     render () {
  //       return <game
  //         ref='game'
  //         preload={this.preload}
  //         component={<Group {...this.state}/>}>
  //       </game>
  //     }

  //     preload (game: Phaser.Game) {
  //       game.load.crossOrigin = true
  //       game.load.spritesheet('test', 'https://examples.phaser.io/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18)
  //     }
  //   }

  //   render(<Test />, document.getElementById('app'))
  // })
})
