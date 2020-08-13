import * as Hammer from "hammerjs";
import * as React from "react";
import { createRef, RefObject } from "react";
import { CSSTransition } from "react-transition-group";
import { sprintf } from "sprintf";

import { promiseLoadImage } from "./image";
import { kFileList as kFileList2434Main } from "./imagelists/2434_main";
import { kFileList as kFileList2434World06 } from "./imagelists/2434_world06";
import { kFileList as kFileListHololive01 } from "./imagelists/hololive_01";
import { Dimension, World } from "./landmark";
import {
  kLandmarks,
  kLandmarksRightBottom,
  kLandmarksTopLeft
} from "./landmarks/const";
import { clamp } from "./number";
import { OverScroller } from "./scroller";
import { Point } from "./point";

const kFileList = new Map<World, string[]>([
  ["2434_main", kFileList2434Main],
  ["2434_world06", kFileList2434World06],
  ["hololive_01", kFileListHololive01]
]);

type Menu = "jumpTo";

type MainState = {
  center: Point;
  blocksPerPixel: number;
  isBillboardsVisible: boolean;
  billboardsVisibilityChangedTimestamp: number;
  activeMenu: Menu | undefined;
  attensionPopupVisible: boolean;
  coordinateLabelVisible: boolean;
  dimension: Dimension;
  world: World;
};

function createMainState(
  center: Point = new Point(0, 0),
  blocksPerPixel: number = 1,
  isBillboardsVisible: boolean = true,
  billboardsVisibilityChangedTimestamp: number = 0,
  activeMenu: Menu | undefined = void 0,
  attensionPopupVisible: boolean = true,
  coordinateLabelVisible: boolean = true,
  dimension: Dimension = Dimension.Overworld,
  world: World = "2434_main"
): MainState {
  return {
    center: center.clone(),
    blocksPerPixel,
    isBillboardsVisible,
    billboardsVisibilityChangedTimestamp,
    activeMenu,
    attensionPopupVisible,
    coordinateLabelVisible,
    dimension,
    world
  };
}

function mergeMainState(
  current: MainState,
  update: Partial<MainState>
): MainState {
  let dimension = update.dimension;
  if (dimension !== void 0) {
    if (
      dimension !== Dimension.Overworld &&
      dimension !== Dimension.TheNether &&
      dimension !== Dimension.TheEnd
    ) {
      delete update.dimension;
    }
  }
  dimension = update.dimension || current.dimension;
  const world: World = update.world || current.world;
  if (
    update.center ||
    world !== current.world ||
    dimension !== current.dimension
  ) {
    let center = update.center || current.center;
    const topLeft = kLandmarksTopLeft.get(world)!.get(dimension)!;
    const rightBottom = kLandmarksRightBottom.get(world)!.get(dimension)!;
    update.center = new Point(
      clamp(center.x, topLeft.x, rightBottom.x),
      clamp(center.z, topLeft.z, rightBottom.z)
    );
  }
  let blocksPerPixel = update.blocksPerPixel;
  if (blocksPerPixel) {
    update.blocksPerPixel = clamp(
      blocksPerPixel,
      MainComponent.MIN_BLOCKS_PER_PIXEL,
      MainComponent.MAX_BLOCKS_PER_PIXEL
    );
  }
  return Object.assign({}, current, update);
}

class Tile {
  constructor(
    readonly image: HTMLImageElement,
    readonly loadedUnixTime: number
  ) {}
}

class TextureStorage {
  private readonly storage = new Map<string, Tile | null>();
  private readonly queued = new Set<string>();
  private _dimension: Dimension = Dimension.Overworld;
  private _world: World = "2434_main";
  setDimension(d: Dimension) {
    if (this._dimension === d) {
      return;
    }
    this._dimension = d;
    this.clear();
  }
  setWorld(w: World) {
    if (this._world === w) {
      return;
    }
    this._world = w;
    this.clear();
  }

  get(v: Point, loadIfNotExists: boolean = true): Tile | undefined {
    const key = v.toString();
    const image = this.storage.get(key);
    if (image === null) {
      return void 0;
    }
    if (image !== void 0) {
      return image;
    }
    if (this.queued.has(key)) {
      return void 0;
    }
    this.queued.add(key);
    const url = this.getImageFilePath(v);
    const list = kFileList.get(this._world);
    if (!list?.includes(url)) {
      this.storage.set(key, null);
      this.queued.delete(key);
      return;
    }
    const d = this._dimension;
    promiseLoadImage(url)
      .then(image => {
        if (d !== this._dimension) {
          return;
        }
        this.storage.set(key, image ? new Tile(image, Date.now()) : null);
        this.queued.delete(key);
      })
      .catch(e => {
        if (d !== this._dimension) {
          return;
        }
        this.storage.set(key, null);
        this.queued.delete(key);
      });
  }

  private getImageFilePath(v: Point): string {
    let c = "o";
    switch (this._dimension) {
      case Dimension.Overworld:
        c = "o";
        break;
      case Dimension.TheNether:
        c = "n";
        break;
      case Dimension.TheEnd:
        c = "e";
        break;
    }

    return `images/${this._world}/${c}/r.${v.x}.${v.z}.png`;
  }

  delete(v: Point) {
    this.storage.delete(v.toString());
  }

  clear() {
    this.storage.clear();
  }
}

type DownEvent = {
  client: Point;
  center: Point;
};

export class MainComponent extends React.Component<{}, MainState> {
  private readonly canvas: RefObject<HTMLCanvasElement> = createRef();
  private readonly xLabel: RefObject<HTMLDivElement> = createRef();
  private readonly zLabel: RefObject<HTMLDivElement> = createRef();
  private readonly menu: RefObject<HTMLDivElement> = createRef();
  private readonly reticule: RefObject<HTMLDivElement> = createRef();
  private readonly coordinateLabel: RefObject<HTMLDivElement> = createRef();
  private textures = new TextureStorage();
  static readonly MIN_BLOCKS_PER_PIXEL = 0.125;
  static readonly MAX_BLOCKS_PER_PIXEL = 32;
  private isRedrawNeeded = true;
  private downEvent: DownEvent | undefined;
  private pinchStartBlocksPerPixel: number = 1;
  private pinchEventDeltaTime: number = Number.MAX_VALUE;
  private textMetricsCache = new Map<string, TextMetrics>();
  private fragmentUpdateTimer: number | undefined;
  private touchEventDetected: boolean = false;
  private readonly scroller = new OverScroller();

  constructor(props: {}) {
    super(props);
    this.state = createMainState();
    window.addEventListener("resize", () => {
      this.setState(this.state);
    });
  }

  private scheduleRender(ctx: CanvasRenderingContext2D) {
    let updateAndRender = () => {};
    updateAndRender = () => {
      if (this.scroller.computeScrollOffset()) {
        const x = this.scroller.getCurrX();
        const y = this.scroller.getCurrY();
        if (this.scroller.isFinished()) {
          const center = new Point(x, y);
          this.setState(mergeMainState(this.state, { center }));
        }
        this.isRedrawNeeded = true;
      }
      if (this.isRedrawNeeded) {
        this.draw(ctx);
      }
      requestAnimationFrame(updateAndRender);
    };
    requestAnimationFrame(updateAndRender);
  }

  private draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const scale = window.devicePixelRatio;
    ctx.scale(scale, scale);

    const { x: cx, z: cz } = this.center;
    const blocksPerPixel = this.state.blocksPerPixel;
    const width = window.innerWidth * blocksPerPixel;
    const height = window.innerHeight * blocksPerPixel;
    const minBlockX = cx - width / 2; // = left: 0 px
    const minBlockZ = cz - height / 2; // = top: 0 px
    const maxBlockX = cx + width / 2;
    const maxBlockz = cz + height / 2;
    const mipmapBlockWidth = 512;
    const mipmapBlockHeight = 512;
    const minMipmapX = Math.floor(minBlockX / mipmapBlockWidth);
    const maxMipmapX = Math.ceil(maxBlockX / mipmapBlockWidth);
    const minMipmapZ = Math.floor(minBlockZ / mipmapBlockHeight);
    const maxMipmapZ = Math.ceil(maxBlockz / mipmapBlockHeight);
    const now = Date.now();
    const fadeInSeconds = 0.3;
    ctx.imageSmoothingEnabled = blocksPerPixel > 1;
    ctx.imageSmoothingQuality = "high";
    let loadingInProgress = false;
    this.textures.setDimension(this.state.dimension);
    this.textures.setWorld(this.state.world);
    for (let x = minMipmapX; x <= maxMipmapX; x++) {
      for (let z = minMipmapZ; z <= maxMipmapZ; z++) {
        const tile = this.textures.get(new Point(x, z));
        if (!tile) {
          loadingInProgress = true;
          continue;
        }
        const px = (x * mipmapBlockWidth - minBlockX) / blocksPerPixel;
        const py = (z * mipmapBlockHeight - minBlockZ) / blocksPerPixel;
        const elapsed = (now - tile.loadedUnixTime) / 1000;
        const alpha = clamp(elapsed / fadeInSeconds, 0, 1);
        if (alpha < 1) {
          loadingInProgress = true;
        }
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          tile.image,
          px,
          py,
          mipmapBlockWidth / blocksPerPixel,
          mipmapBlockHeight / blocksPerPixel
        );
      }
    }

    const elapsed =
      (Date.now() - this.state.billboardsVisibilityChangedTimestamp) / 1000;
    let alpha = 1;
    if (this.state.isBillboardsVisible) {
      alpha = clamp(elapsed / fadeInSeconds, 0, 1);
    } else {
      alpha = 1 - clamp(elapsed / fadeInSeconds, 0, 1);
    }
    loadingInProgress = loadingInProgress || alpha < 1;
    ctx.globalAlpha = alpha;
    if (this.state.isBillboardsVisible || elapsed < fadeInSeconds) {
      kLandmarks.forEach(landmark => {
        if (landmark.world !== this.state.world) {
          return;
        }
        if (landmark.dimension !== this.state.dimension) {
          return;
        }
        const location = landmark.markerLocation;
        if (
          location.x < minBlockX ||
          maxBlockX < location.x ||
          location.z < minBlockZ ||
          maxBlockz < location.z
        ) {
          return;
        }
        const pixel = this.worldToClient(this.state, location);
        const fontSize = 16;
        const padding = 5;
        const stemHeight = 6;
        ctx.font = `${fontSize}px 'YuGothic', sans-serif`;
        let metrics = this.textMetricsCache.get(landmark.name);
        if (metrics === void 0) {
          metrics = ctx.measureText(landmark.name);
          this.textMetricsCache.set(landmark.name, metrics);
        }
        const ascent = fontSize;
        const tan = Math.tan((40 * Math.PI) / 180);
        const left = pixel.x - metrics.width / 2 - padding;
        const right = pixel.x + metrics.width / 2 + padding;
        const top = pixel.z - stemHeight - ascent - 2 * padding;
        const bottom = pixel.z - stemHeight;
        const minXOffset = pixel.x + stemHeight * tan - right;
        const maxXOffset = pixel.x - stemHeight * tan - left;
        const xOffset = Math.min(
          Math.max(landmark.xOffset || 0, minXOffset),
          maxXOffset
        );

        const path = new Path2D();
        path.moveTo(pixel.x, pixel.z);
        path.lineTo(pixel.x - stemHeight * tan, bottom);
        path.lineTo(left + xOffset, bottom);
        path.lineTo(left + xOffset, top);
        path.lineTo(right + xOffset, top);
        path.lineTo(right + xOffset, bottom);
        path.lineTo(pixel.x + stemHeight * tan, bottom);
        path.closePath();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke(path);

        let color: string;
        if (landmark.finished === void 0) {
          color = "red";
        } else if (landmark.finished) {
          color = "#acf2bd";
        } else {
          color = "#fdb8c0";
        }
        ctx.fillStyle = color;
        ctx.fill(path);

        ctx.beginPath();
        ctx.textBaseline = "bottom";
        ctx.fillStyle = "black";
        ctx.fillText(
          landmark.name,
          pixel.x - metrics.width / 2 + xOffset,
          pixel.z - stemHeight - padding
        );
      });
    }

    ctx.restore();
    if (!loadingInProgress) {
      this.isRedrawNeeded = false;
    }
  }

  private abortScroller() {
    if (this.scroller.isFinished()) {
      return;
    }
    this.scroller.computeScrollOffset();
    const x = this.scroller.getCurrX();
    const z = this.scroller.getCurrY();
    this.scroller.forceFinished(true);
    this.setState(mergeMainState(this.state, { center: new Point(x, z) }));
  }

  componentDidMount() {
    const canvas = this.canvas?.current;
    if (!canvas) {
      return;
    }
    canvas.addEventListener("wheel", this.onWheelEvent);
    canvas.addEventListener("contextmenu", this.onContextMenu);
    canvas.addEventListener("mousemove", this.onMouseMove);
    canvas.addEventListener("touchmove", () => {
      this.touchEventDetected = true;
    });
    const canvasGestureRecognizer = new Hammer(canvas);
    canvasGestureRecognizer.get("pinch").set({ enable: true });
    canvasGestureRecognizer.get("doubletap").set({ enable: false });
    canvasGestureRecognizer.get("press").set({ enable: false });
    canvasGestureRecognizer.get("swipe").set({ enable: false });
    canvasGestureRecognizer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    canvasGestureRecognizer.on("pan", ev => {
      if (this.downEvent === void 0) {
        this.abortScroller();
        this.downEvent = {
          client: new Point(ev.center.x, ev.center.y),
          center: this.state.center.clone()
        };
      }
      this.onPan(new Point(ev.center.x, ev.center.y));
      if (ev.isFinal) {
        this.downEvent = void 0;
        const millisecondsPerSecond = 1000;
        const scale = millisecondsPerSecond * this.state.blocksPerPixel;
        const { x, z } = this.state.center;
        const topLeft = kLandmarksTopLeft
          .get(this.state.world)!
          .get(this.state.dimension)!;
        const rightBottom = kLandmarksRightBottom
          .get(this.state.world)!
          .get(this.state.dimension)!;
        this.scroller.fling(
          x,
          z,
          -ev.velocityX * scale,
          -ev.velocityY * scale,
          topLeft.x,
          rightBottom.x,
          topLeft.z,
          rightBottom.z
        );
      }
    });
    canvasGestureRecognizer.on("pinch", ev => {
      this.abortScroller();
      if (this.pinchEventDeltaTime > ev.deltaTime) {
        this.pinchStartBlocksPerPixel = this.state.blocksPerPixel;
      }
      this.pinchEventDeltaTime = ev.deltaTime;
      this.onScaleEvent(
        ev.center.x,
        ev.center.y,
        this.pinchStartBlocksPerPixel / ev.scale
      );
    });
    canvasGestureRecognizer.on("tap", () => {
      this.setState(
        mergeMainState(this.state, {
          isBillboardsVisible: !this.state.isBillboardsVisible,
          billboardsVisibilityChangedTimestamp: Date.now()
        })
      );
    });
    const ctx = canvas.getContext("2d")!;
    this.scheduleRender(ctx);
    const params = window.location.hash.split("&");
    let x = this.state.center.x;
    let z = this.state.center.z;
    let blocksPerPixel = this.state.blocksPerPixel;
    let dimension = this.state.dimension;
    params.forEach(param => {
      if (param.startsWith("#")) {
        param = param.substr(1);
      }
      const keyAndValue = param.split("=");
      if (keyAndValue.length !== 2) {
        return;
      }
      const key = keyAndValue[0];
      const value = parseFloat(keyAndValue[1]);
      if (isNaN(value)) {
        return;
      }
      if (key === "x") {
        x = value;
      } else if (key === "z") {
        z = value;
      } else if (key === "scale") {
        blocksPerPixel = clamp(
          value,
          MainComponent.MIN_BLOCKS_PER_PIXEL,
          MainComponent.MAX_BLOCKS_PER_PIXEL
        );
      } else if (key === "dimension") {
        switch (value) {
          case 0:
            dimension = Dimension.Overworld;
            break;
          case 1:
            dimension = Dimension.TheEnd;
            break;
          case -1:
            dimension = Dimension.TheNether;
            break;
        }
      }
    });
    this.pinchStartBlocksPerPixel = blocksPerPixel;
    this.setState(
      mergeMainState(this.state, {
        center: new Point(x, z),
        blocksPerPixel,
        dimension
      })
    );
    this.fragmentUpdateTimer = window.setInterval(() => {
      const hash = sprintf(
        "#world=%s&x=%.1f&z=%.1f&scale=%.2f&dimension=%d",
        this.state.world,
        this.state.center.x,
        this.state.center.z,
        this.state.blocksPerPixel,
        this.state.dimension
      );
      if (hash !== window.location.hash) {
        window.history.replaceState(void 0, "", hash);
      }
    }, 500);
    window.addEventListener("wheel", this.wheelDisabledHandler, {
      passive: false
    });
    this.menu.current!.addEventListener("wheel", this.wheelDisabledHandler, {
      passive: false
    });
    const menuGestureRecognizer = new Hammer(this.coordinateLabel.current!);
    menuGestureRecognizer.on("tap", () => {
      this.setState(
        mergeMainState(this.state, {
          coordinateLabelVisible: !this.state.coordinateLabelVisible
        })
      );
    });
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<MainState>,
    snapshot?: any
  ): void {
    this.isRedrawNeeded = true;
    const center = this.center;
    if (this.xLabel.current) {
      this.xLabel.current.innerHTML = `X: ${Math.floor(center.x)}`;
    }
    if (this.zLabel.current) {
      this.zLabel.current.innerHTML = `Z: ${Math.floor(center.z)}`;
    }
  }

  private get center(): Point {
    if (this.scroller.isFinished()) {
      return this.state.center;
    } else {
      return new Point(this.scroller.getCurrX(), this.scroller.getCurrY());
    }
  }

  private clientToWorld(state: MainState, client: Point): Point {
    const center = this.center;
    const blocksPerPixel = state.blocksPerPixel;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = client.x - cx;
    const dy = client.z - cy;
    const bx = center.x + dx * blocksPerPixel;
    const bz = center.z + dy * blocksPerPixel;
    return new Point(bx, bz);
  }

  private worldToClient(state: MainState, world: Point): Point {
    const center = this.center;
    const blocksPerPixel = state.blocksPerPixel;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const px = (world.x - center.x) / blocksPerPixel + cx;
    const py = (world.z - center.z) / blocksPerPixel + cy;
    return new Point(px, py);
  }

  private readonly onMouseMove = (ev: MouseEvent) => {
    const world = this.clientToWorld(
      this.state,
      new Point(ev.clientX, ev.clientY)
    );
    if (!this.touchEventDetected) {
      if (this.xLabel.current) {
        this.xLabel.current.innerHTML = `X: ${Math.floor(world.x)}`;
      }
      if (this.zLabel.current) {
        this.zLabel.current.innerHTML = `Z: ${Math.floor(world.z)}`;
      }
    }
  };

  private readonly onWheelEvent = (ev: WheelEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.deltaMode !== ev.DOM_DELTA_PIXEL) {
      return;
    }
    const scale = this.state.blocksPerPixel + ev.deltaY * 0.003;
    this.onScaleEvent(ev.clientX, ev.clientY, scale);
  };

  private onScaleEvent(x: number, y: number, scale: number) {
    const client = new Point(x, y);
    const state = this.state;
    if (!state) {
      return;
    }
    const pivot = this.clientToWorld(state, client);
    const nextBlocksPerPixel = clamp(
      scale,
      MainComponent.MIN_BLOCKS_PER_PIXEL,
      MainComponent.MAX_BLOCKS_PER_PIXEL
    );
    const draft = createMainState(state.center, nextBlocksPerPixel);
    const pivotOfDraft = this.clientToWorld(draft, client);
    const dx = pivotOfDraft.x - pivot.x;
    const dz = pivotOfDraft.z - pivot.z;
    this.setState(
      mergeMainState(this.state, {
        center: new Point(state.center.x - dx, state.center.z - dz),
        blocksPerPixel: nextBlocksPerPixel
      })
    );
  }

  private onPan(pos: Point) {
    const down = this.downEvent;
    if (!down) {
      return;
    }
    const dx = down.client.x - pos.x;
    const dy = down.client.z - pos.z;
    const blocksPerPixel = this.state.blocksPerPixel;
    const x = down.center.x + dx * blocksPerPixel;
    const z = down.center.z + dy * blocksPerPixel;
    if (this.xLabel.current) {
      this.xLabel.current.innerHTML = `X: ${Math.floor(x)}`;
    }
    if (this.zLabel.current) {
      this.zLabel.current.innerHTML = `Z: ${Math.floor(z)}`;
    }
    this.setState(mergeMainState(this.state, { center: new Point(x, z) }));
  }

  private readonly onContextMenu = (ev: MouseEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  private readonly wheelDisabledHandler = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const moveTo = (world: World, point: Point, dimension: Dimension) => {
      return () => {
        this.setState(
          mergeMainState(this.state, {
            center: point,
            dimension,
            activeMenu: void 0,
            world
          })
        );
      };
    };
    const onClickJumpTo = () => {
      if (this.state.activeMenu === "jumpTo") {
        this.setState(mergeMainState(this.state, { activeMenu: void 0 }));
      } else {
        this.setState(mergeMainState(this.state, { activeMenu: "jumpTo" }));
      }
    };
    const dismissAttentionPopup = () => {
      window.removeEventListener("wheel", this.wheelDisabledHandler);
      this.setState(
        mergeMainState(this.state, { attensionPopupVisible: false })
      );
    };
    const buttons: {
      world: World;
      location: Point;
      label: string;
      dimension: Dimension;
    }[] = [
      {
        world: "2434_main",
        location: new Point(179, 24),
        dimension: Dimension.Overworld,
        label: "中央都市"
      },
      {
        world: "2434_main",
        location: new Point(-1496, 1395),
        dimension: Dimension.Overworld,
        label: "にじさんじランド"
      },
      {
        world: "2434_main",
        location: new Point(-30022, -20180),
        dimension: Dimension.Overworld,
        label: "新天地"
      },
      {
        world: "2434_main",
        location: new Point(-4781, 4843),
        dimension: Dimension.Overworld,
        label: "🌸ンボ村"
      },
      {
        world: "2434_main",
        location: new Point(-2448, 3408),
        dimension: Dimension.Overworld,
        label: "ひまぐまんち(・ヮ・)"
      },
      {
        world: "2434_main",
        location: new Point(0, 0),
        dimension: Dimension.TheNether,
        label: "ネザー"
      },
      {
        world: "2434_main",
        location: new Point(0, 0),
        dimension: Dimension.TheEnd,
        label: "ジ・エンド"
      },
      {
        world: "2434_world06",
        location: new Point(61, -174),
        dimension: Dimension.Overworld,
        label: "新規ワールド"
      },
      {
        world: "hololive_01",
        location: new Point(268, -204),
        dimension: Dimension.Overworld,
        label: "新ホロ鯖"
      }
    ];
    return (
      <>
        <CSSTransition
          timeout={300}
          unmountOnExit={true}
          in={this.state.attensionPopupVisible}
          classNames={"fade"}
        >
          <div className="attentionPopupBackground">
            <div className="warningMessage">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ textAlign: "center" }}>
                  この地図は、マインクラフトにじさんじサーバーの地図ではございません。
                </div>
                <div style={{ textAlign: "center" }}>
                  にじさんじサーバー再現プロジェクトの、再現状況を公表するための地図です。
                </div>
                <br />
                <div>ご注意</div>
                <div>
                  <ul>
                    <li>
                      この地図を見て、にじさんじ関係者（ライバーさんを含む）に問い合わせすることはおやめください。
                    </li>
                    <li>
                      この地図に関するコメント等を、ライバーさんの配信等のコメント欄に書き込むことはおやめください。
                    </li>
                  </ul>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    className="confirmButton clickable"
                    onClick={dismissAttentionPopup}
                  >
                    OK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
        <canvas
          className="canvas"
          ref={this.canvas}
          style={{
            width: `${width}px`,
            height: `${height}px`
          }}
          width={width * window.devicePixelRatio}
          height={height * window.devicePixelRatio}
        />
        <div
          className="reticule"
          ref={this.reticule}
          style={{
            opacity:
              this.state.coordinateLabelVisible && this.touchEventDetected
                ? 1
                : 0
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "calc(-1 * var(--reticule-size) - 1px)",
              left: "-1px",
              height: "calc(2 * var(--reticule-size) + 2px)",
              width: "3px",
              backgroundColor: "white"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-1px",
              left: "calc(-1 * var(--reticule-size) - 1px)",
              width: "calc(2 * var(--reticule-size) + 2px)",
              height: "3px",
              backgroundColor: "white"
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "calc(-1 * var(--reticule-size))",
              left: 0,
              height: "calc(2 * var(--reticule-size))",
              width: "1px",
              backgroundColor: "black"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "calc(-1 * var(--reticule-size))",
              width: "calc(2 * var(--reticule-size))",
              height: "1px",
              backgroundColor: "black"
            }}
          />
        </div>
        <div className="menu" ref={this.menu}>
          <div className="menuItem">
            <div className="menuItemContent">giji34.world</div>
          </div>
          <div style={{ width: "30px" }} />
          <div className="menuItem clickable">
            <div className="menuItemContent" onClick={onClickJumpTo}>
              Jump to
              <span className="pulldownMarker" />
            </div>
            {this.state.activeMenu === "jumpTo" && (
              <div className="dropdownMenu">
                {buttons.map(button => (
                  <div className="menuItem">
                    <div
                      className="menuItemContent menuItemBorder"
                      onClick={moveTo(
                        button.world,
                        button.location,
                        button.dimension
                      )}
                    >
                      {button.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="hspacer" />
          <div
            className="coordinateLabel"
            ref={this.coordinateLabel}
            style={{ opacity: this.state.coordinateLabelVisible ? 1 : 0 }}
          >
            <div className="coordinateValue" ref={this.xLabel} />
            <div className="coordinateValue" ref={this.zLabel} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "100%",
            minHeight: "100%",
            userSelect: "none",
            pointerEvents: "none"
          }}
        >
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }} />
            <CSSTransition
              timeout={300}
              unmountOnExit={true}
              in={this.state.isBillboardsVisible}
              classNames={"fade"}
            >
              <div className="billboardsLegend">
                <div
                  className="billboardsLegendCell"
                  style={{ fontWeight: "bold" }}
                >
                  凡例
                </div>
                <div
                  className="billboardsLegendCell"
                  style={{ display: "flex" }}
                >
                  <div
                    className="billboardsLegendColor"
                    style={{
                      backgroundColor: "#acf2bd"
                    }}
                  />
                  <div>再現作業完了</div>
                </div>
                <div
                  className="billboardsLegendCell"
                  style={{ display: "flex" }}
                >
                  <div
                    className="billboardsLegendColor"
                    style={{
                      backgroundColor: "#fdb8c0"
                    }}
                  />
                  <div>再現作業中</div>
                </div>
              </div>
            </CSSTransition>
          </div>
        </div>
      </>
    );
  }
}
