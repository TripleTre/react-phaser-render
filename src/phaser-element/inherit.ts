export const PIXIDisplayObjectAttributes =
  ['alpha', 'cacheAsBitmap', 'pivot',
   'renderable', 'rotation', 'scale',
   'visible', 'x', 'y']

export const PIXIDisplayObjectContainerAttributes =
  ['anchor', 'blendMode', 'exists', 'tint', 'ignoreChildInput']

export const PhaserComponentInWorld =
  ['checkWorldBounds', 'outOfBoundsKill', 'outOfCameraBoundsKill']

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

export const PhaserSpriteAttributes =
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

export const PhaserGroupAttributes =
  [].concat(
    PIXIDisplayObjectContainerAttributes,
    PhaserComponentAngleAttributes,
    PhaserComponentAutoCullAttributes,
    PhaserComponentBoundsAttributes,
    PhaserComponentFixedToCameraAttributes,
    PhaserComponentCoreAttributes,
    PhaserComponentLoadTextureAttributes,
    PhaserComponentInputEnabledAttributes,
    PhaserComponentLifeSpanAttributes,
    PhaserComponentInWorld,
    PhaserComponentScaleMinMaxAttributes,
    PhaserComponentSmoothedAttributes,
    'health',
    'maxHealth'
  )

export const PhaserAnimationAttributes =
  ['delay', 'enableUpdate', 'frame', 'killOnComplete',
   'loop', 'loopCount', 'name', 'paused', 'reversed',
   'speed']

export const PhaserTextAttributes =
  ['align', 'autoRound', 'boundsAlignH', 'boundsAlignV',
   'characterLimitSize', 'characterLimitSuffix',
   'fill', 'font', 'fontSize', 'fontStyle', 'fontVariant',
   'fontWeight', 'height', 'lineSpacing', 'padding',
   'resolution', 'shadowBlur', 'shadowColor', 'shadowFill',
   'shadowOffsetX', 'shadowOffsetY', 'shadowStroke',
   'splitRegExp', 'stroke', 'strokeThickness', 'tabs',
   'text', 'wordWrap', 'wordWrapWidth']
