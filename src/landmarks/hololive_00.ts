import { Point, Point3 } from "../point";
import { createLandmark, Dimension, Landmark } from "../landmark";

function make(params: {
  name: string;
  yomi: string | string[];
  location: Point3;
  corners?: Point[];
  markerLocation?: Point;
  xOffset?: number;
  finished: boolean;
  dimension?: Dimension;
  wikiIndex?: number;
  debug?: number;
}): Landmark {
  return createLandmark({ ...params, world: "hololive_00" });
}

export const kHololive00Landmarks: Landmark[] = [
  make({
    name: "ホロライブレジスタンスアジト",
    yomi: "ほろらいぶれじすたんすあじと",
    location: new Point3(12, 63, -230),
    finished: false,
  }),
  make({
    name: "新宝島ステージ",
    yomi: "しんたからじますてーじ",
    location: new Point3(25, 63, -198),
    finished: true,
  }),
  make({
    name: "チェスト部屋",
    yomi: "ちぇすとべや",
    location: new Point3(-47, 64, -131),
    finished: false,
  }),
  make({
    name: "やけぐそ",
    yomi: "やけぐそ",
    location: new Point3(325, 71, -184),
    finished: false,
  }),
  make({
    name: "温泉",
    yomi: "おんせん",
    location: new Point3(-22, 63, -136),
    finished: false,
  }),
  make({
    name: "木口ビル(跡地)",
    yomi: ["きぐちびる"],
    location: new Point3(-155, 93, -113),
    finished: false,
  }),
];
