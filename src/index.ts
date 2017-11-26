import PhaserRender from './PhaserRender'

export function render (element, container) {
  const m = PhaserRender.createContainer(element)
  PhaserRender.updateContainer(element, m, null)
}

export function unmount () {
  PhaserRender.updateContainer(null, PhaserRender.createContainer(null), null)
}
