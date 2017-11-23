namespace JSX {
  interface InernalAttributes {
    children?: any[];
    key?: any;
    ref?: any;
  }

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
    DisplayObjectAsChild,
    InernalAttributes {
      assetKey: ReactPhaser.AssetKey;
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
    DisplayObjectAsChild,
    InernalAttributes {
      assetKey: ReactPhaser.AssetKey;
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
    DisplayObjectAsChild,
    InernalAttributes {
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

  interface PhaserAnimationAttributes extends 
    InernalAttributes,
    DisplayObjectAsChild {
      /** 以下属性用于直接给实例相应的属性赋值 */
      delay?: number;
      enableUpdate?: boolean;
      frame?: number;
      killOnComplete?: boolean;
      loop?: boolean;
      loopCount?: number;
      name?: string;
      paused?: boolean;
      reversed?: boolean;
      speed?: number;

      /** 以下属性用于构造函数，或其他特殊情况 */
      play?: boolean;
      frameRate?: number;
      onComplete?: ((sprite, animation) => any) | {once: (sprite, animation) => any};
      onLoop?: ((sprite, animation) => any) | {once: (sprite, animation) => any};
      onStart?: ((sprite, animation) => any) | {once: (sprite, animation) => any};
      onUpdate?: ((sprite, animation) => any) | {once: (sprite, animation) => any};
      /** 
       * An array of numbers/strings that correspond to the frames to add to
       * this animation and in which order. 
       * e.g. [1, 2, 3] or ['run0', 'run1', run2]). 
       * If null then all frames will be used. */
      frames?: number[] | string[];
      /** Are the given frames using numeric indexes (default) or strings? */
      useNumericIndex?: boolean;
  }

  interface PhaserTextAtrributes extends PhaserSpriteAttributes, InernalAttributes {
    align?: string;
    autoRound?: boolean;
    boundsAlignH?: 'left' | 'center' | 'right';
    boundsAlignV?: 'top' | 'middle' | 'bottom';
    characterLimitSize?: number;
    characterLimitSuffix?: string;
    fill?: string;
    font?: string;
    fontSize?: number | string;
    fontStyle?: string;
    fontVariant?: 'normal' | 'small-caps';
    fontWeight?: 'normal' | 'bold' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    height?: number;
    lineSpacing?: number;
    padding?: Phaser.Point;
    resolution?: number;
    shadowBlur?: number;
    shadowColor?: string;
    shadowFill?: boolean;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowStroke?: boolean;
    splitRegExp?: RegExp;
    stroke?: string;
    strokeThickness?: number;
    tabs?: number | number[];
    text?: string;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    assetKey?: undefined;
    style?: {
      font?: string;
      fontStyle?: string;
      fontVariant?: string;
      fontWeight?: string;
      fontSize?: number;
      backgroundColor?: string;
      fill?: string;
      align?: string;
      boundsAlignH?: string;
      boundsAlignV?: string;
      stroke?: string;
      strokeThickness?: number;
      wordWrap?: boolean;
      wordWrapWidth?: number;
      maxLines?: number;
      tabs?: number;
    }
  }

  interface PhaserWorldAttributes extends DisplayObjectAsChild, InernalAttributes {
    color?: string;
    fontStyle?: string;
    fontWeight?: string;
    strokeColor?: string;
    children?: any;
  }

  interface IntrinsicElements {
    game: any;
    image: PhaserImageAttributes;
    sprite: PhaserSpriteAttributes;
    group: PhaserGroupAttributes;
    animation: PhaserAnimationAttributes;
    word: PhaserWorldAttributes;
    text: PhaserTextAtrributes;
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

  type AssetKey =
    string |
    Phaser.RenderTexture |
    Phaser.BitmapData |
    PIXI.Texture

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

  declare class Element<T, P> {
    instance: T;
    slient: boolean;
    index: number;

    appendChild(child: any): any;
    commitUpdate(updatePayload: any[], oldProps: P, newProps: P): any;
    insertBefore(child: Element<any, any>, beforeChild: Element<any, any>): any;
    prepareUpdate(oldProps: P, newProps: P): any;
    protected propsToInstance(props: P, propsConf: any): void;
    protected isNormalPropKey(key: string): boolean;
    protected diffProps(oldProps: p, newProps: P): any;
    protected commitNormalProps(updatePayload: any[], oldProps: P, newProps: P): string[];
  }

  declare class GroupElement extends Element<Phaser.Group, JSX.PhaserGroupAttributes> {}
}
