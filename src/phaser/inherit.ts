export const PIXIDisplayObjectAttributes =
  ['alpha', 'cacheAsBitmap', 'pivot',
   'renderable', 'rotation', 'scale',
   'visible', 'worldAlpha', 'worldScale',
   'worldTransform', 'worldRotation', 'worldVisible',
   'x', 'y']

export const PIXIDisplayObjectContainerAttributes =
  ['anchor', 'blendMode', 'exists', 'tint', 'ignoreChildInput']

export const PhaserComponentCoreAttributes =
  ['data', 'debug', 'exists',
   'name', 'pendingDestroy', 'world']

export const PhaserComponentAngleAttributes =
  ['angle']

export const PhaserComponentAutoCullAttributes =
  ['autoCull']

export const PhaserComponentBoundsAttributes =
  ['bottom', 'left', 'right', 'top']

export const PhaserComponentFixedToCameraAttributes =
  ['cameraOffset', 'fixedToCamera']

export const PhaserComponentInputEnabledAttributes =
  ['inputEnabled']

export const PhaserComponentLifeSpanAttributes =
  ['alive', 'lifespan']

export const PhaserComponentLoadTextureAttributes =
  ['frame', 'frameName']

export const PhaserComponentScaleMinMaxAttributes =
  ['scaleMax', 'scaleMin', 'transformCallback']

export const PhaserComponentSmoothedAttributes =
  ['smoothed']

export const PhaserImageAttributes =
  [].concat(
    PhaserComponentCoreAttributes,
    PhaserComponentAngleAttributes,
    PhaserComponentAutoCullAttributes,
    PhaserComponentBoundsAttributes,
    PhaserComponentFixedToCameraAttributes,
    PhaserComponentInputEnabledAttributes,
    PhaserComponentLifeSpanAttributes,
    PhaserComponentLoadTextureAttributes,
    PhaserComponentScaleMinMaxAttributes,
    PhaserComponentSmoothedAttributes,
    PIXIDisplayObjectContainerAttributes,
    PIXIDisplayObjectAttributes
  )

export const PhaserSpriteProps =
  [].concat(
    PhaserComponentCoreAttributes,
    PhaserComponentAngleAttributes,
    PhaserComponentAutoCullAttributes,
    PhaserComponentBoundsAttributes,
    PhaserComponentFixedToCameraAttributes,
    PhaserComponentInputEnabledAttributes,
    PhaserComponentLifeSpanAttributes,
    PhaserComponentLoadTextureAttributes,
    PhaserComponentScaleMinMaxAttributes,
    PhaserComponentSmoothedAttributes,
    PIXIDisplayObjectContainerAttributes,
    PIXIDisplayObjectAttributes
  )
