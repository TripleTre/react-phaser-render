import * as React from 'react'

class Text extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      fontSize: '12px'
    }
  }

  clickHandle = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    this.setState({
      fontSize: '14px'
    })
  }

  render () {
    const { fontSize } = this.state
    const { text, size, color } = this.props
    return <div data-name='text.div'
      onClick={this.clickHandle}
      style={{
        fontSize: size,
        color
      }}
    >
      <span>{text}</span>
      immutable
      <span style={{fontSize, display: 'none'}} hidden={true}>immutable</span>
      <div style={{width: '100px', height: '100px', background: 'red'}}>
        div
      </div>
      <div style={{width: '100px', height: '100px', background: 'red'}}>
        div
      </div>
      <div style={{width: '100px', height: '100px', background: 'red'}}>
        div
      </div>
      <div style={{width: '100px', height: '100px', background: 'red'}}>
        div
      </div>
      <div style={{width: '100px', height: '100px', background: 'red'}}>
        div
      </div>
      <div style={{width: '100px', height: '100px', background: 'red'}}>
        div
      </div>
      <div style={{width: '100px', height: '100px', background: 'red'}}>
        div
      </div>
      <div style={{width: '100px', height: '100px', background: 'red'}}>
        div
      </div>
    </div>
  }
}

export default class Dom extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      color: 'red',
      size: '18px',
      text: 'text'
    }
  }

  render () {
    console.log('render')
    const { color, size, text } = this.state
    return <div onClick={this.clickHandle} id="dom">
      <Text
        color={color}
        size={size}
        text={text}
      />
    </div>
  }

  clickHandle = () => {
    // this.setState({
    //   color: 'blue',
    //   size: '12px',
    //   text: 'text-text'
    // })
  }
}
