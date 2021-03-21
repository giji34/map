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
];
