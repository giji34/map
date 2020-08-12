import { k2434MainLandmarks, k2434MainRailways } from "./2434_main";
import { Dimension, World } from "../landmark";
import { Point } from "../point";
import { k2434World06Landmarks } from "./2434_world06";
import { kHololive01Landmarks } from "./hololive_01";

export const kLandmarks = [
  ...k2434MainLandmarks,
  ...k2434World06Landmarks,
  ...kHololive01Landmarks
];
export const kRailways = [...k2434MainRailways];

export const kLandmarksTopLeft: Map<World, Map<Dimension, Point>> = new Map();
export const kLandmarksRightBottom: Map<
  World,
  Map<Dimension, Point>
> = new Map();

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

["2434_main", "2434_world06", "hololive_01"].forEach((world: World) => {
  const topLeft = new Map<Dimension, Point>();
  const rightBottom = new Map<Dimension, Point>();
  for (const dimension of [
    Dimension.Overworld,
    Dimension.TheNether,
    Dimension.TheEnd
  ]) {
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

    topLeft.set(dimension, new Point(minX, minZ));
    rightBottom.set(dimension, new Point(maxX, maxZ));
  }
  kLandmarksTopLeft.set(world, topLeft);
  kLandmarksRightBottom.set(world, rightBottom);
});
