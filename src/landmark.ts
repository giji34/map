import { Point, Point3 } from "./point";

export enum Dimension {
  TheNether = -1,
  Overworld = 0,
  TheEnd = 1
}

export type World = "2434_main" | "2434_world06" | "hololive_01";

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
