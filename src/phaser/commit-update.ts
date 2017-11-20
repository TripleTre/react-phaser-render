function isInternalPropKey (key: string) {
  return key === 'children' || key === 'key' || key === 'ref'
}

export default {
  image: (instance: Phaser.Image, updatePayload, oldProps, newProps) => {
    for (let i = 0; i < updatePayload.length; i += 2) {
      const key = updatePayload[i]
      const value = updatePayload[i + 1]
      if (!isInternalPropKey(key)) {
        instance[key] = value
      }
    }
  }
}
