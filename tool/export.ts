import { Point } from "../src/point";
import { romanize } from "../src/romanize";
import { Dimension, Landmark } from "../src/landmark";
import { k2434MainRailways } from "../src/landmarks/2434_main";
import { kLandmarks, kRailways } from "../src/landmarks/const";

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
