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
}

type Landmark = { name: string; location: Point; finished?: boolean };

const kLandmarks: Landmark[] = [
  { name: "いちご大墳墓", location: new Point(325, 638) },
  { name: "みんなの家", location: new Point(185, 30) },
  { name: "さんばか城", location: new Point(-271, 767) },
  { name: "サクラダ・ファミリア", location: new Point(86, 17) },
  { name: "世界", location: new Point(78, -84) },
  { name: "しばと凛月のおうち", location: new Point(158, -110) },
  { name: "弓道場", location: new Point(106, -149) },
  { name: "桜第一惑星", location: new Point(128, -147) },
  { name: "紅白アホアホハウス", location: new Point(101, -247) },
  { name: "叶の家", location: new Point(206, -83) },
  { name: "Kyoko's_seacret_house", location: new Point(243, -120) },
  { name: "✞黒の要塞✞", location: new Point(242, -41) },
  { name: "神社", location: new Point(245, 31) },
  { name: "舞元の家", location: new Point(322, -11) },
  { name: "ドラひまハウス", location: new Point(383, 9) },
  { name: "ド葛本社", location: new Point(382, 46) },
  { name: "アズカバン", location: new Point(387, 71) },
  { name: "教会", location: new Point(310, 73) },
  { name: "BLハウス", location: new Point(271, 82) },
  { name: "森中温泉", location: new Point(278, 112) },
  { name: "カリン塔", location: new Point(308, 130) },
  { name: "くまさんランド", location: new Point(305, 169) },
  { name: "猫カフェ", location: new Point(352, 166) },
  { name: "陰キャ帝国", location: new Point(407, 203) },
  { name: "山田太郎", location: new Point(405, 202) },
  { name: "ラトナ・プティの家", location: new Point(455, 344) },
  { name: "一期生ハウス", location: new Point(597, 302) },
  { name: "夕陽リリの家", location: new Point(749, -3) },
  { name: "しずくしま神社", location: new Point(880, 41) },
  { name: "静凛の家", location: new Point(838, 71) },
  { name: "しばハウス2", location: new Point(197, 127) },
  { name: "たけし", location: new Point(176, 74) },
  { name: "さわるな危険", location: new Point(169, 70) },
  { name: "リリかざハウス", location: new Point(206, 66) },
  { name: "舞ハウス", location: new Point(80, 179) },
  { name: "モルパレス", location: new Point(78, 75) },
  { name: "アキくんはし", location: new Point(33, 16) },
  { name: "理想のおうち", location: new Point(9, 27) },
  { name: "狂犬ズハウス", location: new Point(-89, 19) },
  { name: "黒井神社", location: new Point(-86, 3) },
  { name: "物述有栖の家", location: new Point(-139, 15) },
  { name: "メイドカフェ", location: new Point(-159, 20) },
  { name: "セーフハウス", location: new Point(-172, 16) },
  { name: "夢追翔のライブハウス", location: new Point(-183, 29) },
  { name: "DERAS_HOUSE", location: new Point(-184, 73) },
  { name: "セブンイレブン", location: new Point(-185, 100) },
  { name: "しば城", location: new Point(-130, 72) },
  { name: "競馬場予定地", location: new Point(-270, -35) },
  { name: "立ち退き反対ハウス", location: new Point(-326, -21) },
  { name: "ハジメ村", location: new Point(-383, 18) },
  { name: "鈴谷アキの仮拠点", location: new Point(-266, 217) },
  { name: "キャンプ場テント", location: new Point(-300, 431) },
  { name: "キリトの剣取らないで", location: new Point(-467, 543) },
  { name: "夕陽リリの塔跡地", location: new Point(-570, 456) },
  { name: "トニー・スタークのおうち", location: new Point(-184, 145) },
  { name: "学校", location: new Point(-229, 680) },
  { name: "第2秘密基地", location: new Point(-238, 909) },
  { name: "にじさんじランド", location: new Point(-1400, 1412) },
  { name: "駅", location: new Point(194, -4) },
  { name: "森中ランド", location: new Point(-47, 507) },
  { name: "✿ンボ村", location: new Point(-4792, 4860) },
  { name: "偽JK組ハウス", location: new Point(-30011, -20195) },
  { name: "アパホテルの水", location: new Point(-30023, -20170) },
  { name: "ボートレース場", location: new Point(-4681, 4796) },
  { name: "✿ンボ宮殿", location: new Point(-4792, 4891) },
  { name: "舞元さん化石耐久配信現場", location: new Point(-383, -504) },
  { name: "しずりんの村", location: new Point(1621, 292) },
  { name: "葛葉さん海底神殿遭難跡地", location: new Point(-298, 1076) },
  { name: "ベルさん海底神殿攻略拠点", location: new Point(597, 7875) },
  { name: "静凛サンゴ礁仮拠点", location: new Point(0, 5418) },
  { name: "エンド要塞(静凛)", location: new Point(5870, 5746) },
  { name: "しずりんの洋館", location: new Point(4319, 5423) },
  { name: "ちーかざちーハウス", location: new Point(15, -86) },
  { name: "骨バイオーム", location: new Point(24, 190) },
  { name: "神田笑一の家", location: new Point(4, 315) },
  { name: "マジックツリーハウス", location: new Point(53, 489) },
  { name: "液", location: new Point(253, 309) },
  { name: "BIG_WOOD_HAYAMA_HOUSE", location: new Point(352, 185) },
  { name: "笹木咲の水族館(跡地)", location: new Point(371, 212) },
  { name: "マンション", location: new Point(117, 73) },
  { name: "うい覇道", location: new Point(-736, 347) },
  { name: "神田ロード", location: new Point(8, 428) },
  { name: "chima_kakurega", location: new Point(-107, -156) },
  { name: "うさぎの像(作者不明)", location: new Point(-920, -1496) },
  { name: "う◯ち", location: new Point(227, 19) },
  { name: "ハロウィンの館", location: new Point(-4973, 4915) }
];

type MainState = { center: Point; blocksPerPixel: number };

function createMainState(
  center: Point = new Point(0, 0),
  blocksPerPixel: number = 1
) {
  return { center: center.clone(), blocksPerPixel };
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

    ctx.globalAlpha = 1;
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
      const metrics = ctx.measureText(landmark.name);
      const ascent = fontSize;
      const tan = Math.tan(40 * Math.PI / 180);

      const path = new Path2D();
      path.moveTo(pixel.x, pixel.z);
      path.lineTo(pixel.x - stemHeight * tan, pixel.z - stemHeight);
      path.lineTo(pixel.x - metrics.width / 2 - padding, pixel.z - stemHeight);
      path.lineTo(pixel.x - metrics.width / 2 - padding, pixel.z - stemHeight - ascent - padding);
      path.lineTo(pixel.x + metrics.width / 2 + padding, pixel.z - stemHeight - ascent - padding);
      path.lineTo(pixel.x + metrics.width / 2 + padding, pixel.z - stemHeight);
      path.lineTo(pixel.x + stemHeight * tan, pixel.z - stemHeight);
      path.closePath();

      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.stroke(path);

      ctx.fillStyle = "white";
      ctx.fill(path);

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillText(
        landmark.name,
        pixel.x - metrics.width / 2,
        pixel.z - stemHeight - padding
      );
    });

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
      createMainState(
        new Point(state.center.x - dx, state.center.z - dz),
        nextBlocksPerPixel
      )
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
    this.setState(createMainState(new Point(x, z), blocksPerPixel));
  };

  private readonly onMouseUp = (ev: MouseEvent) => {
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
          <div className="coordinateValue" ref={this.xLabel} />
          <div className="coordinateValue" ref={this.zLabel} />
        </div>
      </>
    );
  }
}
