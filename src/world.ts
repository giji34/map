export type World =
  | "2434_main"
  | "2434_world06"
  | "hololive_01"
  | "en_hololive"
  | "hololive_00"
  | "id_hololive"
  | "sightseeing";

export function isWorld(x: any): x is World {
  if (typeof x !== "string") {
    return false;
  }
  return (
    x === "2434_main" ||
    x === "2434_world06" ||
    x === "hololive_01" ||
    x === "en_hololive" ||
    x === "hololive_00" ||
    x === "id_hololive" ||
    x === "sightseeing"
  );
}

export function worldToString(world: World): string {
  switch (world) {
    case "2434_main":
      return "にじ鯖メイン";
    case "2434_world06":
      return "にじ鯖新規ワールド";
    case "hololive_00":
      return "旧ホロ鯖";
    case "hololive_01":
      return "JPホロ鯖";
    case "en_hololive":
      return "ENホロ鯖";
    case "id_hololive":
      return "IDホロ鯖";
    case "sightseeing":
      return "観光鯖";
  }
}
