import * as React from "react";
import { createRef, RefObject } from "react";

class Point {
  readonly x: number;
  readonly z: number;

  constructor(x: number, z: number) {
    this.x = x;
    this.z = z;
  }

  toString() {
    return `[${this.x},${this.z}]`;
  }
}

class MainState {
  readonly center: Point;
  readonly blocksPerPixel: number;

  constructor(center: Point = new Point(0, 0), blocksPerPixel: number = 1) {
    this.center = center;
    this.blocksPerPixel = blocksPerPixel;
  }
}

function promiseLoadImage(url: string): Promise<HTMLImageElement | undefined> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = e => {
      resolve(void 0);
    };
    image.src = url;
  });
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

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export class Main extends React.Component<{}, MainState> {
  private readonly canvas: RefObject<HTMLCanvasElement>;
  private mipmaps = Array.from({ length: 1 }, v => new MipmapStorage());
  private readonly MIN_BLOCKS_PER_PIXEL = 0.125;
  private readonly MAX_BLOCKS_PER_PIXEL = 8;

  constructor(props: {}) {
    super(props);
    this.canvas = createRef();
    this.state = new MainState();
    window.addEventListener("resize", () => {
      this.setState(this.state);
    });
  }

  private scheduleRender(ctx: CanvasRenderingContext2D) {
    let updateAndRender = () => {};
    updateAndRender = () => {
      this.draw(ctx);
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
    ctx.imageSmoothingEnabled = blocksPerPixel > 2;
    ctx.imageSmoothingQuality = "high";
    for (let x = minMipmapX; x <= maxMipmapX; x++) {
      for (let z = minMipmapZ; z <= maxMipmapZ; z++) {
        const tile = this.mipmaps[0].get(new Point(x, z));
        if (!tile) {
          continue;
        }
        const px = (x * mipmapBlockWidth - minBlockX) / blocksPerPixel;
        const py = (z * mipmapBlockHeight - minBlockZ) / blocksPerPixel;
        const elapsed = (now - tile.loadedUnixTime) / 1000;
        const alpha = clamp(elapsed / fadeInSeconds, 0, 1);
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
    ctx.restore();
  }

  private mipmapLevel(scale: number) {
    //TODO
    return 0;
  }

  componentDidMount() {
    const canvas = this.canvas?.current;
    if (!canvas) {
      return;
    }
    canvas.addEventListener("wheel", this.onWheelEvent);
    const ctx = canvas.getContext("2d")!;
    this.scheduleRender(ctx);
  }

  private readonly onWheelEvent = (ev: WheelEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.deltaMode !== ev.DOM_DELTA_PIXEL) {
      return;
    }
    const state = this.state;
    const nextBlocksPerPixel = clamp(
      state.blocksPerPixel + ev.deltaY * 0.003,
      this.MIN_BLOCKS_PER_PIXEL,
      this.MAX_BLOCKS_PER_PIXEL
    );
    this.setState(new MainState(state.center, nextBlocksPerPixel));
  };

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return (
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
    );
  }
}
