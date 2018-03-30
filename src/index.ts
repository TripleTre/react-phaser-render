/// <reference path="../typings/index.d.ts" />

import PhaserRender from './PhaserRender'
let cont = null

PhaserRender.injectIntoDevTools({
  bundleType: 1,
  version: '1.0.0.1',
  rendererPackageName: 'react-phaser-renderer',
})

export function render (element, container) {
  cont = PhaserRender.createContainer(container)
  PhaserRender.updateContainer(element, cont, null)
}

export function unmount () {
  PhaserRender.updateContainer(null, cont, null)
}
