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
  return createLandmark({ ...params, world: "2434_world06" });
}

export const k2434World06Landmarks: Landmark[] = [
  make({
    name: "新規ワールドゲート",
    yomi: "しんきわーるどげーと",
    location: new Point3(161, 80, -174),
    wikiIndex: 269,
    finished: true,
  }),
  make({
    name: "ひよこハウス",
    yomi: "ひよこはうす",
    location: new Point3(214, 79, -51),
    wikiIndex: 293,
    finished: true,
  }),
  make({
    name: "弦月藤士郎の風車小屋",
    yomi: "げんつきとうしろうのふうしゃごや",
    location: new Point3(57, 78, 2),
    wikiIndex: 295,
    finished: false,
  }),
];
