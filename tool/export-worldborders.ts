import { kHololive01Borders } from "../src/landmarks/hololive_01";
import * as fs from "fs";
import { Border } from "../src/point";
import { World } from "../src/landmark";

const servers = new Map<World, Border[]>([["hololive_01", kHololive01Borders]]);
servers.forEach((borders, world) => {
  fs.open(`borders-${world}.yml`, "w", (err, fp) => {
    /*
    border1:
      dimension: 0
      points:
        - x: 123
          z: 456
        - x: 789
          z: 124
    */
    borders.forEach((border, idx) => {
      fs.writeFileSync(fp, `border${idx}:\n`);
      fs.writeFileSync(fp, `  dimension: ${border.dimension}\n`);
      fs.writeFileSync(fp, `  points:\n`);
      border.points.forEach((point) => {
        fs.writeFileSync(fp, `    - x: ${point.x}\n`);
        fs.writeFileSync(fp, `      z: ${point.z}\n`);
      });
    });
  });
});
