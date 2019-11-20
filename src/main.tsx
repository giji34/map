import * as React from "react";
import { createRef, RefObject } from "react";
import { kLandmarksRightBottom, kLandmarksTopLeft, Point } from "./landmark";
import { kLandmarks } from "./landmark";
import { promiseLoadImage } from "./image";
import { clamp } from "./number";
import { kFileList } from "./imagelist";
import { CSSTransition } from "react-transition-group";
import { sprintf } from "sprintf";

type MainState = {
  center: Point;
  blocksPerPixel: number;
  isBillboardsVisible: boolean;
  billboardsVisibilityChangedTimestamp: number;
};

function createMainState(
  center: Point = new Point(0, 0),
  blocksPerPixel: number = 1,
  isBillboardsVisible: boolean = true,
  billboardsVisibilityChangedTimestamp: number = 0
) {
  return {
    center: center.clone(),
    blocksPerPixel,
    isBillboardsVisible,
    billboardsVisibilityChangedTimestamp
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
  event: MouseEvent;
  center: Point;
};

export class MainComponent extends React.Component<{}, MainState> {
  private readonly canvas: RefObject<HTMLCanvasElement>;
  private readonly xLabel: RefObject<HTMLDivElement>;
  private readonly zLabel: RefObject<HTMLDivElement>;
  private mipmaps = Array.from({ length: 1 }, v => new MipmapStorage());
  static readonly MIN_BLOCKS_PER_PIXEL = 0.25;
  static readonly MAX_BLOCKS_PER_PIXEL = 4;
  private isRedrawNeeded = true;
  private downEvent: DownEvent | undefined;
  private textMetricsCache = new Map<string, TextMetrics>();
  private fragmentUpdateTimer: number | undefined;

  constructor(props: {}) {
    super(props);
    this.canvas = createRef();
    this.xLabel = createRef();
    this.zLabel = createRef();
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
    canvas.addEventListener("mousedown", this.onMouseDown);
    canvas.addEventListener("mousemove", this.onMouseMove);
    canvas.addEventListener("mouseup", this.onMouseUp);
    canvas.addEventListener("mouseleave", this.onMouseLeave);
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
    const client = new Point(ev.clientX, ev.clientY);
    const state = this.state;
    if (!state) {
      return;
    }
    const pivot = this.clientToWorld(state, client);
    const nextBlocksPerPixel = clamp(
      state.blocksPerPixel + ev.deltaY * 0.003,
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
  };

  private readonly onMouseDown = (ev: MouseEvent) => {
    this.downEvent = { event: ev, center: this.state.center.clone() };
  };

  private readonly onMouseMove = (ev: MouseEvent) => {
    const world = this.clientToWorld(
      this.state,
      new Point(ev.clientX, ev.clientY)
    );
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
    const dx = down.event.clientX - ev.clientX;
    const dy = down.event.clientY - ev.clientY;
    const blocksPerPixel = this.state.blocksPerPixel;
    const x = down.center.x + dx * blocksPerPixel;
    const z = down.center.z + dy * blocksPerPixel;
    this.setState(mergeMainState(this.state, { center: new Point(x, z) }));
  };

  private readonly onMouseUp = (ev: MouseEvent) => {
    if (this.downEvent === void 0) {
      return;
    }
    const down = new Point(this.downEvent.event.x, this.downEvent.event.y);
    this.downEvent = void 0;
    const click = new Point(ev.x, ev.y);
    const distance = Point.distance(down, click);
    if (distance > 5) {
      return;
    }
    this.setState(
      mergeMainState(this.state, {
        isBillboardsVisible: !this.state.isBillboardsVisible,
        billboardsVisibilityChangedTimestamp: Date.now()
      })
    );
  };

  private readonly onMouseLeave = (ev: MouseEvent) => {
    this.downEvent = void 0;
  };

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return (
      <>
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
        <div className="menu">
          <div className="menuItem">minecraft: giji34.world</div>
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
        <div className="billboardsLegendContainer">
          <div className="billboardsLegendSpacer" />
          <CSSTransition
            timeout={300}
            unmountOnExit={true}
            in={this.state.isBillboardsVisible}
            classNames={"billboardsLegend"}
          >
            <div className="billboardsLegend">
              <div
                className="billboardsLegendCell"
                style={{ fontWeight: "bold" }}
              >
                凡例
              </div>
              <div className="billboardsLegendCell" style={{ display: "flex" }}>
                <div
                  className="billboardsLegendColor"
                  style={{
                    backgroundColor: "#acf2bd"
                  }}
                />
                <div>再現作業完了</div>
              </div>
              <div className="billboardsLegendCell" style={{ display: "flex" }}>
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
      </>
    );
  }
}
