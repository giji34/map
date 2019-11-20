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

  clone(): Point {
    return new Point(this.x, this.z);
  }

  static distance(a: Point, b: Point): number {
    return Math.hypot(a.x - b.x, a.z - b.z);
  }
}

type Landmark = {
  name: string;
  location: Point;
  xOffset?: number;
  finished?: boolean;
  debug?: number;
};

const kLandmarks: Landmark[] = [
  { name: "いちご大墳墓", location: new Point(323, 631), finished: true },
  { name: "みんなの家", location: new Point(175, 17), finished: true },
  { name: "さんばか城", location: new Point(-261, 758), finished: true },
  {
    name: "サクラダ・ファミリア",
    location: new Point(63, -7),
    finished: false,
    xOffset: 40
  },
  { name: "世界", location: new Point(62, -90), finished: true },
  {
    name: "しばと凛月のおうち",
    location: new Point(137, -118),
    finished: true
  },
  {
    name: "弓道場",
    location: new Point(107, -203),
    xOffset: 20,
    finished: true
  },
  {
    name: "桜第一惑星",
    location: new Point(128, -168),
    finished: true,
    xOffset: 40
  },
  { name: "紅白アホアホハウス", location: new Point(92, -260), finished: true },
  {
    name: "叶の家",
    location: new Point(208, -106),
    xOffset: -30,
    finished: true
  },
  {
    name: "Kyoko's seacret house",
    location: new Point(243, -120),
    finished: true,
    xOffset: 80
  },
  { name: "✞黒の要塞✞", location: new Point(242, -41), finished: true },
  { name: "神社", location: new Point(262, 23), finished: true },
  { name: "舞元の家", location: new Point(323, -42), finished: true },
  { name: "ドラひまハウス", location: new Point(382, -9), finished: true },
  { name: "ド葛本社", location: new Point(367, 37), finished: true },
  { name: "アズカバン", location: new Point(423, 63), finished: true },
  { name: "教会", location: new Point(323, 66), finished: true },
  {
    name: "BLハウス",
    location: new Point(271, 73),
    finished: true,
    xOffset: 40
  },
  { name: "森中温泉", location: new Point(274, 118), finished: false },
  { name: "カリン塔", location: new Point(308, 100), finished: true },
  { name: "くまさんランド", location: new Point(306, 171), finished: true },
  { name: "猫カフェ", location: new Point(357, 160), finished: true },
  { name: "陰キャ帝国", location: new Point(404, 223), finished: false },
  { name: "ヤマダタロウ", location: new Point(400, 198), finished: true },
  { name: "ラトナ・プティの家", location: new Point(455, 344), finished: true },
  { name: "一期生ハウス", location: new Point(603, 275), finished: true },
  { name: "夕陽リリの家", location: new Point(747, -37), finished: true },
  { name: "しずくしま神社", location: new Point(868, 26), finished: true },
  { name: "静凛の家", location: new Point(842, 72), finished: true },
  { name: "しばハウス2", location: new Point(206, 124), finished: true },
  { name: "たけし", location: new Point(177, 64), finished: true, xOffset: 60 },
  {
    name: "さわるな危険",
    location: new Point(167, 60),
    finished: true,
    xOffset: -60
  },
  { name: "リリかざハウス", location: new Point(214, 56), finished: false },
  { name: "舞ハウス", location: new Point(73, 162), finished: true },
  { name: "モルパレス", location: new Point(61, 78), finished: true },
  { name: "アキくんはし", location: new Point(24, 15), finished: true },
  {
    name: "理想のおうち",
    location: new Point(19, 47),
    finished: false,
    xOffset: 40
  },
  { name: "狂犬ズハウス", location: new Point(-89, 19), finished: false },
  { name: "黒井神社", location: new Point(-86, -29), finished: true },
  { name: "物述有栖の家", location: new Point(-140, 3), finished: true },
  { name: "メイドカフェ", location: new Point(-154, 25), finished: true },
  { name: "セーフハウス", location: new Point(-171, 8), finished: true },
  {
    name: "夢追翔のライブハウス",
    location: new Point(-195, 22),
    finished: false
  },
  { name: "DERAS HOUSE", location: new Point(-197, 55), finished: true },
  { name: "セブンイレブン", location: new Point(-190, 93), finished: true },
  { name: "しば城", location: new Point(-130, 72), finished: true },
  { name: "競馬場予定地", location: new Point(-288, -104), finished: false },
  {
    name: "立ち退き反対ハウス",
    location: new Point(-327, -54),
    finished: true
  },
  { name: "ハジメ村", location: new Point(-423, 17), finished: false },
  { name: "鈴谷アキの仮拠点", location: new Point(-270, 211), finished: true },
  { name: "キャンプ場テント", location: new Point(-303, 424), finished: true },
  {
    name: "キリトの剣取らないで",
    location: new Point(-465, 540),
    finished: true
  },
  {
    name: "夕陽リリさんの塔跡地",
    location: new Point(-570, 456),
    finished: true
  },
  {
    name: "トニー・スタークのおうち",
    location: new Point(-200, 143),
    finished: true
  },
  { name: "学校", location: new Point(-211, 654), finished: true },
  { name: "第2秘密基地", location: new Point(-227, 906), finished: false },
  {
    name: "にじさんじランド",
    location: new Point(-1496, 1395),
    finished: false
  },
  { name: "駅", location: new Point(196, -57), finished: true },
  { name: "森中ランド", location: new Point(-80, 489), finished: false },
  { name: "✿ンボ村", location: new Point(-4791, 4790), finished: false },
  { name: "偽JK組ハウス", location: new Point(-30011, -20195) },
  { name: "アパホテルの水", location: new Point(-30023, -20170) },
  { name: "ボートレース場", location: new Point(-4603, 4777), finished: true },
  { name: "✿ンボ宮殿", location: new Point(-4793, 4908), finished: true },
  {
    name: "舞元さん化石耐久配信現場",
    location: new Point(-383, -504),
    finished: false
  },
  { name: "しずりんの村", location: new Point(1620, 255), finished: false },
  { name: "葛葉さん遭難跡地", location: new Point(-298, 1071), finished: true },
  {
    name: "ベルさん海底神殿攻略拠点",
    location: new Point(591, 7863),
    finished: true
  },
  { name: "静凛サンゴ礁仮拠点", location: new Point(0, 5411), finished: true },
  { name: "エンド要塞(静凛)", location: new Point(5870, 5746), finished: true },
  { name: "しずりんの洋館", location: new Point(4282, 5398), finished: false },
  { name: "ちーかざちーハウス", location: new Point(-1, -98), finished: true },
  { name: "骨バイオーム", location: new Point(20, 176), finished: false },
  { name: "神田笑一の家", location: new Point(4, 315), finished: false },
  {
    name: "マジックツリーハウス",
    location: new Point(58, 476),
    finished: true
  },
  { name: "液", location: new Point(253, 301), finished: true },
  {
    name: "BIG WOOD HAYAMA HOUSE",
    location: new Point(380, 178),
    finished: false
  },
  {
    name: "笹木咲の水族館(跡地)",
    location: new Point(362, 213),
    finished: true
  },
  { name: "マンション", location: new Point(107, 73), finished: false },
  { name: "うい覇道", location: new Point(-735, -77), finished: true },
  {
    name: "神田ロード",
    location: new Point(13, 389),
    finished: false,
    xOffset: 100
  },
  { name: "chima kakurega", location: new Point(-117, -205), finished: false },
  {
    name: "うさぎの像(作者不明)",
    location: new Point(-928, -1502),
    finished: true
  },
  { name: "う◯ち", location: new Point(229, 6), finished: true },
  { name: "ハロウィンの館", location: new Point(-4964, 4917), finished: false },
  {
    name: "ヒモと財布ハウス",
    location: new Point(174, 302),
    finished: true,
    xOffset: -60
  },
  {
    name: "矢車監視事務局",
    location: new Point(187, 319),
    finished: true,
    xOffset: 60
  },
  { name: "お花見会場", location: new Point(151, 188), finished: false },
  { name: "世界地図", location: new Point(144, -9), finished: true },
  { name: "でびリオンハウス", location: new Point(124, -63), finished: false },
  { name: "太陽", location: new Point(194, -3), finished: true },
  { name: "月", location: new Point(135, 53), finished: true },
  { name: "魔界ノりりむの家", location: new Point(255, 102), finished: true },
  { name: "カリスマ三姉妹の像", location: new Point(260, 64), finished: true },
  {
    name: "シスター・クレアの仮家",
    location: new Point(344, 95),
    finished: true
  },
  { name: "山田トラップ", location: new Point(199, -131), finished: true }
].sort((a, b) => {
  if (a.location.z == b.location.z) {
    return a.location.x - b.location.z;
  } else {
    return a.location.z - b.location.z;
  }
});

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
  return Object.assign({}, current, update);
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

type DownEvent = {
  event: MouseEvent;
  center: Point;
};

export class Main extends React.Component<{}, MainState> {
  private readonly canvas: RefObject<HTMLCanvasElement>;
  private readonly xLabel: RefObject<HTMLDivElement>;
  private readonly zLabel: RefObject<HTMLDivElement>;
  private mipmaps = Array.from({ length: 1 }, v => new MipmapStorage());
  private readonly MIN_BLOCKS_PER_PIXEL = 0.25;
  private readonly MAX_BLOCKS_PER_PIXEL = 4;
  private isRedrawNeeded = true;
  private downEvent: DownEvent | undefined;
  private textMetricsCache = new Map<string, TextMetrics>();

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
      this.MIN_BLOCKS_PER_PIXEL,
      this.MAX_BLOCKS_PER_PIXEL
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
        <div className="coordinateLabel">
          <div className="coordinateValue" ref={this.xLabel}>
            X:{" "}
          </div>
          <div className="coordinateValue" ref={this.zLabel}>
            Z:{" "}
          </div>
        </div>
      </>
    );
  }
}
