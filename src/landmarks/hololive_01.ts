import { Point, Point3 } from "../point";
import { createLandmark, Dimension, Landmark, Railway } from "../landmark";

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
  return createLandmark({ ...params, world: "hololive_01" });
}

export const kHololive01Landmarks: Landmark[] = [
  make({
    name: "ホロハウス",
    yomi: "ほろはうす",
    location: new Point3(268, 68, -204),
    markerLocation: new Point(257, -230),
    wikiIndex: 1,
    finished: true
  }),
  make({
    name: "しけ村",
    yomi: "しけむら",
    location: new Point3(356, 64, -304),
    markerLocation: new Point(366, -406),
    wikiIndex: 3,
    finished: true
  }),
  make({
    name: "仮海賊船",
    yomi: "かりかいぞくせん",
    location: new Point3(206, 67, -254),
    markerLocation: new Point(199, -262),
    wikiIndex: 4,
    finished: true
  }),
  make({
    name: "赤井ホテル",
    yomi: "あかいほてる",
    location: new Point3(-4757, 64, -856),
    markerLocation: new Point(-4751, -889),
    wikiIndex: 45,
    finished: true
  }),
  make({
    name: "資材ゲート",
    yomi: "しざいげーと",
    location: new Point3(209, 68, -296),
    markerLocation: new Point(200, -303),
    wikiIndex: 60,
    finished: true
  })
];
