export class Point {
  readonly x: number;
  readonly z: number;

  constructor(x: number, z: number) {
    this.x = x;
    this.z = z;
  }

  toString() {
    return `[${this.x},${this.z}]`;
  }

  clone(): Point {
    return new Point(this.x, this.z);
  }

  static distance(a: Point, b: Point): number {
    return Math.hypot(a.x - b.x, a.z - b.z);
  }
}

export class Point3 {
  constructor(readonly x: number, readonly y: number, readonly z: number) {}

  clone(): Point3 {
    return new Point3(this.x, this.y, this.z);
  }
}
