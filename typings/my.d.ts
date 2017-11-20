namespace JSX {
  interface PIXIDisplayObjectAttributes {
    alpha?: number;
    cacheAsBitMap?: boolean;
    pivot?: Phaser.Point;
    renderable?: boolean;
    rotation?: number;
    scale?: Phaser.Point;
    visible?: boolean;
    worldAlpha?: number;
    worldScale?: Phaser.Point;
    worldTransform?: Phaser.Matrix;
    worldRotation?: number;
    worldVisible?: boolean;
    x: number;
    y: number;
  }

  interface PIXIDisplayObjectContainerAttributes {
    anchor?: Phaser.Point;
    blendMode?: number;
    exists?: boolean;
    tint?: number;
    ignoreChildInput?: boolean;
  }

  interface PhaserComponentCoreAttributes {
    data?: any;
    debug?: boolean;
    exists?: boolean;
    name?: string;
    pendingDestroy?: boolean;
    world?: Phaser.Point;
  }

  interface PhaserComponentAnglePAttributes {
    angle?: number;
  }

  interface PhaserComponentAutoCullAttributes {
    autoCull?: boolean;
  }

  interface PhaserComponentBoundsAttributes {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  }

  interface PhaserComponentFixedToCameraAttributes {
    cameraOffset?: Phaser.Point;
    fixedToCamera?: boolean;
  }

  interface PhaserComponentInputEnabledAttributes {
    inputEnabled?: boolean;
  }

  interface PhaserComponentLifeSpanAttributes {
    alive?: boolean;
    lifespan?: number;
  }

  interface PhaserComponentLoadTextureAttributes {
    frame?: number;
    frameName?: string;
  }

  interface PhaserComponentScaleMinMaxAttributes {
    scaleMax?: Phaser.Point;
    scaleMin?: Phaser.Point;
    transformCallback?:() => any;
  }

  interface PhaserComponentSmoothedAttributes {
    smoothed?: boolean;
  }

  interface PhaserImageAttributes extends
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
    PIXIDisplayObjectAttributes {
      assetKey: string;
    }

  interface PhaserSpriteAttributes extends
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
    PIXIDisplayObjectAttributes {
      assetKey: string;
    }

  interface DisplayObjectAsChild {
    /** If true the child will not dispatch the onAddedToGroup event. */
    slient?: boolean;
    /** The index within the group to insert the child to. Where 0 is the bottom of the Group. */
    index?: number;
  }

  interface IntrinsicElements {
    game: any;
    image: PhaserImageAttributes;
    sprite: PhaserSpriteAttributes;
    group: any;
    animation: any;
  }
}

namespace ReactPhaser {
  type AssetItem = {
    path: string;
    file: string;
    key: string;
  }

  interface AssetsConf {
    image: Array<AssetItem>;
  }

  interface GameProps {
    width: number | string;
    height: number | string;
    assets?: AssetsConf;
    renderer?: number;
    parent?: string | HTMLElement;
    state?: any;
    transparent?: boolean;
    antialias?: boolean;
    physicsConfig?: any;
  }
}
