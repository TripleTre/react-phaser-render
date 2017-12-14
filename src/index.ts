/// <reference path="../typings/index.d.ts" />

import PhaserRender from './PhaserRender'
console.log(PhaserRender)
let cont = null

export function render (element, container) {
  cont = PhaserRender.createContainer(container)
  console.log(cont)
  PhaserRender.updateContainer(element, cont, null)
}

export function unmount () {
  PhaserRender.updateContainer(null, cont, null)
}
