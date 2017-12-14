import { isFunction } from 'lodash'

export const delay = (num?: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, num || 16)
})

export const withTestHook = (hook, warped) => {
  return class extends warped {
    componentWillMount () {
      isFunction(hook.componentWillMount) && hook.componentWillMount.call(null, this)
      isFunction(super.componentWillMount) && super.componentWillMount()
    }

    componentWillUpdate () {
      isFunction(hook.componentWillMount) && hook.componentWillMount.call(null, this)
      isFunction(super.componentWillUpdate) && super.componentWillUpdate()
    }

    componentDidMount () {
      isFunction(hook.componentDidMount) && hook.componentDidMount.call(null, this)
      isFunction(super.componentDidMount) && super.componentDidMount()
    }

    componentDidUpdate () {
      isFunction(hook.componentDidUpdate) && hook.componentDidUpdate.call(null, this)
      isFunction(super.componentDidUpdate) && super.componentDidUpdate()
    }
  }
}
