import * as React from "react";
import { createRef, RefObject } from "react";
import { kLandmarksRightBottom, kLandmarksTopLeft, Point } from "./landmark";
import { kLandmarks } from "./landmark";
import { promiseLoadImage } from "./image";
import { clamp } from "./number";
import { kFileList } from "./imagelist";
import { CSSTransition } from "react-transition-group";
import { sprintf } from "sprintf";
import * as Hammer from "hammerjs";

type Menu = "jumpTo";

type MainState = {
  center: Point;
  blocksPerPixel: number;
  isBillboardsVisible: boolean;
  billboardsVisibilityChangedTimestamp: number;
  activeMenu: Menu | undefined;
  attensionPopupVisible: boolean;
};

function createMainState(
  center: Point = new Point(0, 0),
  blocksPerPixel: number = 1,
  isBillboardsVisible: boolean = true,
  billboardsVisibilityChangedTimestamp: number = 0,
  activeMenu: Menu | undefined = void 0,
  attensionPopupVisible: boolean = true
): MainState {
  return {
    center: center.clone(),
    blocksPerPixel,
    isBillboardsVisible,
    billboardsVisibilityChangedTimestamp,
    activeMenu,
    attensionPopupVisible
  };
}

function mergeMainState(
  current: MainState,
  update: Partial<MainState>
): MainState {
  let center = update.center;
  if (center) {
    update.center = new Point(
      clamp(center.x, kLandmarksTopLeft.x, kLandmarksRightBottom.x),
      clamp(center.z, kLandmarksTopLeft.z, kLandmarksRightBottom.z)
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

class MipmapStorage {
  private readonly storage = new Map<string, Tile | null>();
  private readonly queued = new Set<string>();
  private readonly level: number = 0;

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
    if (!kFileList.includes(url)) {
      this.storage.set(key, null);
      this.queued.delete(key);
      return;
    }
    promiseLoadImage(url)
      .then(image => {
        this.storage.set(key, image ? new Tile(image, Date.now()) : null);
        this.queued.delete(key);
      })
      .catch(e => {
        this.storage.set(key, null);
        this.queued.delete(key);
      });
  }

  private getImageFilePath(v: Point): string {
    return `images/${this.level}/r.${v.x}.${v.z}.png`;
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
  private readonly canvas: RefObject<HTMLCanvasElement>;
  private readonly xLabel: RefObject<HTMLDivElement>;
  private readonly zLabel: RefObject<HTMLDivElement>;
  private readonly menu: RefObject<HTMLDivElement>;
  private mipmaps = Array.from({ length: 1 }, v => new MipmapStorage());
  static readonly MIN_BLOCKS_PER_PIXEL = 0.25;
  static readonly MAX_BLOCKS_PER_PIXEL = 4;
  private isRedrawNeeded = true;
  private downEvent: DownEvent | undefined;
  private pinchStartBlocksPerPixel: number = 1;
  private pinchEventDeltaTime: number = Number.MAX_VALUE;
  private textMetricsCache = new Map<string, TextMetrics>();
  private fragmentUpdateTimer: number | undefined;
  private gestureRecognizer: any;

  constructor(props: {}) {
    super(props);
    this.canvas = createRef();
    this.xLabel = createRef();
    this.zLabel = createRef();
    this.menu = createRef();
    this.state = createMainState();
    window.addEventListener("resize", () => {
      this.setState(this.state);
    });
  }

  private scheduleRender(ctx: CanvasRenderingContext2D) {
    let updateAndRender = () => {};
    updateAndRender = () => {
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
    const cx = this.state.center.x;
    const cz = this.state.center.z;
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
    for (let x = minMipmapX; x <= maxMipmapX; x++) {
      for (let z = minMipmapZ; z <= maxMipmapZ; z++) {
        const tile = this.mipmaps[0].get(new Point(x, z));
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
        const location = landmark.location;
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

  componentDidMount() {
    const canvas = this.canvas?.current;
    if (!canvas) {
      return;
    }
    canvas.addEventListener("wheel", this.onWheelEvent);
    canvas.addEventListener("contextmenu", this.onContextMenu);
    this.gestureRecognizer = new Hammer(canvas);
    this.gestureRecognizer.get("pinch").set({ enable: true });
    this.gestureRecognizer.on("pan", ev => {
      if (this.downEvent === void 0) {
        this.downEvent = {
          client: new Point(ev.center.x, ev.center.y),
          center: this.state.center.clone()
        };
      }
      this.onPan(new Point(ev.center.x, ev.center.y));
      if (ev.isFinal) {
        this.downEvent = void 0;
      }
    });
    this.gestureRecognizer.on("pinch", ev => {
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
    this.gestureRecognizer.on("tap", () => {
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
      }
    });
    this.pinchStartBlocksPerPixel = blocksPerPixel;
    this.setState(
      mergeMainState(this.state, { center: new Point(x, z), blocksPerPixel })
    );
    this.fragmentUpdateTimer = window.setInterval(() => {
      const hash = sprintf(
        "#x=%.1f&z=%.1f&scale=%.2f",
        this.state.center.x,
        this.state.center.z,
        this.state.blocksPerPixel
      );
      window.history.replaceState(void 0, "", hash);
    }, 500);
    window.addEventListener("wheel", this.wheelDisabledHandler, {
      passive: false
    });
    this.menu.current!.addEventListener("wheel", this.wheelDisabledHandler, {
      passive: false
    });
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<MainState>,
    snapshot?: any
  ): void {
    this.isRedrawNeeded = true;
  }

  private clientToWorld(state: MainState, client: Point): Point {
    const blocksPerPixel = state.blocksPerPixel;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = client.x - cx;
    const dy = client.z - cy;
    const bx = state.center.x + dx * blocksPerPixel;
    const bz = state.center.z + dy * blocksPerPixel;
    return new Point(bx, bz);
  }

  private worldToClient(state: MainState, world: Point): Point {
    const blocksPerPixel = state.blocksPerPixel;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const px = (world.x - state.center.x) / blocksPerPixel + cx;
    const py = (world.z - state.center.z) / blocksPerPixel + cy;
    return new Point(px, py);
  }

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
    const world = this.clientToWorld(this.state, pos);
    if (this.xLabel.current) {
      this.xLabel.current.innerHTML = `X: ${Math.floor(world.x)}`;
    }
    if (this.zLabel.current) {
      this.zLabel.current.innerHTML = `Z: ${Math.floor(world.z)}`;
    }
    const down = this.downEvent;
    if (!down) {
      return;
    }
    const dx = down.client.x - pos.x;
    const dy = down.client.z - pos.z;
    const blocksPerPixel = this.state.blocksPerPixel;
    const x = down.center.x + dx * blocksPerPixel;
    const z = down.center.z + dy * blocksPerPixel;
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
    const moveTo = (point: Point) => {
      return () => {
        this.setState(
          mergeMainState(this.state, {
            center: point,
            activeMenu: void 0
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
      console.log(1);
      window.removeEventListener("wheel", this.wheelDisabledHandler);
      this.setState(
        mergeMainState(this.state, { attensionPopupVisible: false })
      );
    };
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
          width={width}
          height={height}
        />
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
                <div className="menuItem menuItemBorder">
                  <div
                    className="menuItemContent"
                    onClick={moveTo(new Point(179, 24))}
                  >
                    中央都市
                  </div>
                </div>
                <div className="menuItem menuItemBorder">
                  <div
                    className="menuItemContent"
                    onClick={moveTo(new Point(-1496, 1395))}
                  >
                    にじさんじランド
                  </div>
                </div>
                <div className="menuItem menuItemBorder">
                  <div
                    className="menuItemContent"
                    onClick={moveTo(new Point(-30022, -20180))}
                  >
                    新天地
                  </div>
                </div>
                <div className="menuItem menuItemBorder">
                  <div
                    className="menuItemContent"
                    onClick={moveTo(new Point(-4781, 4843))}
                  >
                    🌸ンボ村
                  </div>
                </div>
                <div className="menuItem">
                  <div
                    className="menuItemContent"
                    onClick={moveTo(new Point(-2448, 3408))}
                  >
                    ひまぐまんち(・ヮ・)
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="hspacer" />
          <div className="coordinateLabel">
            <div className="coordinateValue" ref={this.xLabel}>
              X:{" "}
            </div>
            <div className="coordinateValue" ref={this.zLabel}>
              Z:{" "}
            </div>
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
