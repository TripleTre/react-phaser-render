namespace JSX {
  interface PIXIDisplayObjectAttributes {
    alpha?: number;
    cacheAsBitMap?: boolean;
    pivot?: Phaser.Point;
    renderable?: boolean;
    rotation?: number;
    scale?: Phaser.Point;
    visible?: boolean;
    x: number;
    y: number;
  }

  interface PIXIDisplayObjectContainerAttributes extends PIXIDisplayObjectAttributes {
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
    DisplayObjectAsChild {
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
    DisplayObjectAsChild {
      assetKey: string;
    }

  interface PhaserGroupAttributes extends
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
    DisplayObjectAsChild {
      health?: number;
      maxHealth?: number;
      x?: number;
      y?: number;
    }

  interface DisplayObjectAsChild {
    /** If true the child will not dispatch the onAddedToGroup event. */
    slient?: boolean;
    /** The index within the group to insert the child to. Where 0 is the bottom of the Group. */
    index?: number;
  }

  interface PhaserAnimationAttributes {
    delay?: number;
    enableUpdate?: boolean;
    frame?: number;
    isFinished?: boolean;
    isPaused?: boolean;
    isPlaying?: boolean;
    isReversed?: boolean;
    killOnComplete?: boolean;
    loop?: boolean;
    loopCount?: number;
    name?: string;
    onComplete?: () => any;
    onLoop?: () => any;
    onStart?: () => any;
    onUpdate?: () => any;
    paused?: boolean;
    reversed?: boolean;
    speed?: number;
    play?: boolean;
    frameRate?: number;
    /** 
     * An array of numbers/strings that correspond to the frames to add to
     * this animation and in which order. 
     * e.g. [1, 2, 3] or ['run0', 'run1', run2]). 
     * If null then all frames will be used. */
    frames?: number[] | string[];
    /** Are the given frames using numeric indexes (default) or strings? */
    useNumericIndex?: boolean;
  }

  interface IntrinsicElements {
    game: any;
    image: PhaserImageAttributes;
    sprite: PhaserSpriteAttributes;
    group: PhaserGroupAttributes;
    animation: PhaserAnimationAttributes;
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
