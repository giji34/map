import { romanize } from "./romanize";
import { Point, Point3 } from "./point";
import { k2434MainLandmarks, k2434MainRailways } from "./landmarks/2434_main";

export enum Dimension {
  TheNether = -1,
  Overworld = 0,
  TheEnd = 1
}

export type World = "2434_main";

export type Landmark = {
  name: string;
  yomi: string | string[]; // name のローマ字表記. 別名がある場合は配列にする
  location: Point3; // tp コマンドで移動する時に使用する位置
  corners?: Point[]; // 曲がり角の座標リスト(線路や道路などのの構造物の場合)
  markerLocation: Point; // 地図アプリに billboard を表示する位置
  xOffset?: number; // 地図アプリに billboard を表示する時の, フキダシのオフセット量(block単位)
  finished: boolean; // 再現作業が完了しているかどうか
  world: World; // ワールド名. 2434_main, 2434_world06, hololive_01 など
  dimension: Dimension;
  wikiIndex: number; // 非公式 wiki「施設一覧」で番号
  debug?: number;
};

export type Railway = {
  name: string;
  corners: Point[];
  dimension: Dimension;
  world: World;
};

export function createLandmark(params: {
  name: string;
  yomi: string | string[];
  location: Point3;
  corners?: Point[];
  markerLocation?: Point;
  xOffset?: number;
  finished: boolean;
  world: World;
  dimension?: Dimension;
  wikiIndex?: number;
  debug?: number;
}): Landmark {
  const dimension =
    params.dimension === void 0 ? Dimension.Overworld : params.dimension;
  const markerLocation =
    params.markerLocation || new Point(params.location.x, params.location.z);
  const wikiIndex = params.wikiIndex || -1;
  delete params.dimension;
  delete params.markerLocation;
  delete params.wikiIndex;
  return { ...params, dimension, markerLocation, wikiIndex };
}

export const kLandmarks = [...k2434MainLandmarks];
const kRailways = [...k2434MainRailways];

const landmarks: { dimension: Dimension; position: Point }[] = [];
if (landmarks.length === 0) {
  kLandmarks.forEach(l => {
    landmarks.push({ dimension: l.dimension, position: l.markerLocation });
  });
  kRailways.forEach(r => {
    r.corners.forEach(position => {
      landmarks.push({ dimension: r.dimension, position });
    });
  });
}

export const kLandmarksTopLeft: Map<Dimension, Point> = new Map();
export const kLandmarksRightBottom: Map<Dimension, Point> = new Map();
[Dimension.Overworld, Dimension.TheNether, Dimension.TheEnd].forEach(
  dimension => {
    const dimensionLandmarks = landmarks.filter(
      it => it.dimension === dimension
    );
    const minX = dimensionLandmarks.reduce(
      (accum, current) => Math.min(accum, current.position.x),
      0
    );
    const maxX = dimensionLandmarks.reduce(
      (accum, current) => Math.max(accum, current.position.x),
      0
    );
    const minZ = dimensionLandmarks.reduce(
      (accum, current) => Math.min(accum, current.position.z),
      0
    );
    const maxZ = dimensionLandmarks.reduce(
      (accum, current) => Math.max(accum, current.position.z),
      0
    );
    kLandmarksTopLeft.set(dimension, new Point(minX, minZ));
    kLandmarksRightBottom.set(dimension, new Point(maxX, maxZ));
  }
);

function bresenham(
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  plot: (x, y) => void
) {
  const deltax = x1 - x0;
  const deltay = y1 - y0;
  let error = 0;
  const deltaerr = Math.abs(deltay / deltax);
  let y = y0;
  const sign = Math.sign(deltax);
  for (let i = 0; i < Math.abs(deltax); i++) {
    const x = x0 + sign * i;
    plot(x, y);
    error = error + deltaerr;
    if (error >= 0.5) {
      y = y + 1;
      error = error - 1.0;
    }
  }
}

function explodeYomi(landmark: Landmark): string[] {
  let base: string[];
  if (typeof landmark.yomi === "string") {
    base = [landmark.yomi];
  } else {
    base = landmark.yomi;
  }
  const result = new Set<string>(base);
  result.add(landmark.name);
  for (const b of base) {
    romanize(b).forEach(r => {
      result.add(r);
    });
  }
  if (landmark.wikiIndex > 0) {
    result.add(`${landmark.wikiIndex}-${landmark.name}`);
  }
  return [...result];
}

if (require.main === module) {
  const argv = [...process.argv];
  argv.shift();
  argv.shift();
  const type = argv[0];
  const world = argv[1];
  if (type === "mca2png") {
    const railways = [...kRailways];
    kLandmarks.forEach(landmark => {
      if (landmark.world !== world) {
        return;
      }
      console.log(
        `${landmark.dimension}\t${landmark.markerLocation.x}\t${landmark.markerLocation.z}`
      );
      if (landmark.corners) {
        railways.push({
          world: landmark.world,
          name: landmark.name,
          dimension: landmark.dimension,
          corners: landmark.corners
        });
      }
    });
    railways.forEach(railway => {
      if (railway.world !== world) {
        return;
      }
      for (let i = 1; i < railway.corners.length; i++) {
        const c0 = railway.corners[i - 1];
        const c1 = railway.corners[i];
        if (c0.x !== c1.x && c0.z !== c1.z) {
          bresenham(c0.x, c1.x, c0.z, c1.z, (x, z) => {
            console.log(`${railway.dimension}\t${x}\t${z}`);
          });
        } else {
          const dx = c1.x - c0.x;
          const dz = c1.z - c0.z;
          const length = Math.max(Math.abs(dx), Math.abs(dz));
          const direction = new Point(Math.sign(dx), Math.sign(dz));
          for (let j = 0; j < length; j++) {
            const x = c0.x + j * direction.x;
            const z = c0.z + j * direction.z;
            console.log(`${railway.dimension}\t${x}\t${z}`);
          }
        }
      }
    });
  } else if (type === "server") {
    const worldUIDOverworld = argv[2];
    const worldUIDNether = argv[3];
    const worldUIDTheEnd = argv[4];
    kLandmarks.forEach(landmark => {
      if (landmark.world !== world) {
        return;
      }
      const name = landmark.name.replace(/ /g, "_");
      const { x, y, z } = landmark.location;
      let dimension: string;
      switch (landmark.dimension) {
        case Dimension.Overworld:
          dimension = worldUIDOverworld;
          break;
        case Dimension.TheEnd:
          dimension = worldUIDTheEnd;
          break;
        case Dimension.TheNether:
          dimension = worldUIDNether;
          break;
      }
      const yomiList = explodeYomi(landmark);
      yomiList.forEach(yo => {
        console.log(`${name}\t${yo}\t${x}\t${y}\t${z}\t${dimension}`);
      });
    });
  }
}
