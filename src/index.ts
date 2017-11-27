import PhaserRender from './PhaserRender'

let cont = null

export function render (element, container) {
  cont = PhaserRender.createContainer(container)
  PhaserRender.updateContainer(element, cont, null)
}

export function unmount () {
  PhaserRender.updateContainer(null, cont, null)
}
