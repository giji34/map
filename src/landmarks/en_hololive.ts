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
  return createLandmark({ ...params, world: "en_hololive" });
}

export const kEnHololiveLandmarks: Landmark[] = [
  make({
    name: "Shelter",
    yomi: "shelter",
    location: new Point3(2306, 65, 104),
    finished: false,
  }),
  make({
    name: "Trident Farm",
    yomi: "trident farm",
    location: new Point3(682, 63, -835),
    finished: false,
  }),
  make({
    name: "Base",
    yomi: "base",
    location: new Point3(48, 84, -59),
    dimension: Dimension.TheNether,
    finished: false,
  }),
  make({
    name: "Base",
    yomi: "base",
    location: new Point3(356, 77, -505),
    finished: false,
  }),
  make({
    name: "Trident Farm",
    yomi: "trident farm",
    location: new Point3(86, 46, -124),
    dimension: Dimension.TheNether,
    finished: false,
  }),
  make({
    name: "Shelter",
    yomi: "shelter",
    location: new Point3(1721, 63, 1116),
    finished: true,
  }),
];
