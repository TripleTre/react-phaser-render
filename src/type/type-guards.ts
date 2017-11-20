export function isPhaserGame(obj: any): obj is Phaser.Game {
  return obj.constructor === Phaser.Game
}

export function isPhaserGroup(obj: any): obj is Phaser.Group {
  return obj.constructor === Phaser.Group
}

export function isPhaserSprite(obj: any): obj is Phaser.Sprite {
  return obj.constructor === Phaser.Sprite
}
