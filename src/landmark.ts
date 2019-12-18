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

export enum Dimension {
  TheNether = -1,
  Overworld = 0,
  TheEnd = 1
}

export type Landmark = {
  name: string;
  prefix: string | string[]; // name の最初の文字をアルファベット表記したもの. 例: いちご大墳墓なら "i"
  location: Point3; // tp コマンドで移動する時に使用する位置
  corners?: Point[]; // 曲がり角の座標リスト(線路や道路などのの構造物の場合)
  markerLocation: Point; // 地図アプリに billboard を表示する位置
  xOffset?: number; // 地図アプリに billboard を表示する時の, フキダシのオフセット量(block単位)
  finished: boolean; // 再現作業が完了しているかどうか
  dimension: Dimension;
  wikiIndex: number; // 非公式 wiki「施設一覧」で番号
  debug?: number;
};

function createLandmark(params: {
  name: string;
  prefix: string | string[];
  location: Point3;
  corners?: Point[];
  markerLocation: Point;
  xOffset?: number;
  finished: boolean;
  dimension?: Dimension;
  wikiIndex: number;
  debug?: number;
}): Landmark {
  const dimension = params.dimension || Dimension.Overworld;
  return { ...params, dimension };
}

export const kLandmarks: Landmark[] = [
  createLandmark({
    name: "共有ハウス",
    prefix: "k",
    location: new Point3(185, 70, 30),
    markerLocation: new Point(175, 17),
    wikiIndex: 1,
    finished: true
  }),
  createLandmark({
    name: "静凛の家",
    prefix: "s",
    location: new Point3(838, 71, 71),
    markerLocation: new Point(842, 72),
    wikiIndex: 2,
    finished: true
  }),
  createLandmark({
    name: "静凛の村",
    prefix: "s",
    location: new Point3(1621, 71, 292),
    markerLocation: new Point(1620, 255),
    wikiIndex: 3,
    finished: false
  }),
  createLandmark({
    name: "ドラひまハウス",
    prefix: "d",
    location: new Point3(383, 66, 9),
    markerLocation: new Point(382, -9),
    wikiIndex: 5,
    finished: true
  }),
  createLandmark({
    name: "ハジメ村",
    prefix: "h",
    location: new Point3(-383, 66, 18),
    markerLocation: new Point(-423, 17),
    wikiIndex: 7,
    finished: false
  }),
  createLandmark({
    name: "リリかざハウス",
    prefix: "r",
    location: new Point3(206, 71, 66),
    markerLocation: new Point(214, 56),
    wikiIndex: 9,
    finished: false
  }),
  createLandmark({
    name: "叶の家",
    prefix: "k",
    location: new Point3(206, 72, -83),
    markerLocation: new Point(208, -106),
    xOffset: -30,
    wikiIndex: 11,
    finished: true
  }),
  createLandmark({
    name: "舞ハウス",
    prefix: "m",
    location: new Point3(80, 63, 179),
    markerLocation: new Point(73, 162),
    wikiIndex: 15,
    finished: true
  }),
  createLandmark({
    name: "ちーかざちーハウス",
    prefix: "c",
    location: new Point3(15, 64, -86),
    markerLocation: new Point(-1, -98),
    wikiIndex: 18,
    finished: true
  }),
  createLandmark({
    name: "Kyoko's seacret house",
    prefix: "k",
    location: new Point3(243, 63, -120),
    markerLocation: new Point(243, -120),
    xOffset: 80,
    wikiIndex: 20,
    finished: true
  }),
  createLandmark({
    name: "いちご大墳墓",
    prefix: "i",
    location: new Point3(325, 64, 638),
    markerLocation: new Point(323, 631),
    wikiIndex: 21,
    finished: true
  }),
  createLandmark({
    name: "森の羊羹",
    prefix: "m",
    location: new Point3(4319, 87, 5423),
    markerLocation: new Point(4282, 5398),
    wikiIndex: 23,
    finished: false
  }),
  createLandmark({
    name: "舞元啓介の家",
    prefix: "m",
    location: new Point3(322, 63, -11),
    markerLocation: new Point(323, -42),
    wikiIndex: 24,
    finished: true
  }),
  createLandmark({
    name: "でびリオンハウス",
    prefix: "d",
    location: new Point3(124, 71, -55),
    markerLocation: new Point(124, -63),
    wikiIndex: 27,
    finished: false
  }),
  createLandmark({
    name: "アキくんはし",
    prefix: "a",
    location: new Point3(33, 63, 16),
    markerLocation: new Point(24, 15),
    wikiIndex: 30,
    finished: true
  }),
  createLandmark({
    name: "夕陽リリの家",
    prefix: "y",
    location: new Point3(749, 71, -3),
    markerLocation: new Point(747, -37),
    wikiIndex: 31,
    finished: true
  }),
  createLandmark({
    name: "アズカバン",
    prefix: "a",
    location: new Point3(387, 63, 71),
    markerLocation: new Point(423, 63),
    wikiIndex: 32,
    finished: true
  }),
  createLandmark({
    name: "シスター・クレアの家",
    prefix: "s",
    location: new Point3(248, 75, 712),
    markerLocation: new Point(248, 712),
    wikiIndex: 33,
    finished: false
  }),
  createLandmark({
    name: "温泉(森中温泉)",
    prefix: ["o", "m"],
    location: new Point3(278, 70, 112),
    markerLocation: new Point(274, 118),
    wikiIndex: 35,
    finished: false
  }),
  createLandmark({
    name: "ギル様の家",
    prefix: "g",
    location: new Point3(732, 64, 56),
    markerLocation: new Point(724, 53),
    wikiIndex: 36,
    finished: true
  }),
  createLandmark({
    name: "✞黒の要塞✞",
    prefix: "k",
    location: new Point3(242, 63, -41),
    markerLocation: new Point(242, -41),
    wikiIndex: 37,
    finished: true
  }),
  createLandmark({
    name: "神社",
    prefix: "j",
    location: new Point3(245, 70, 31),
    markerLocation: new Point(262, 23),
    wikiIndex: 40,
    finished: true
  }),
  createLandmark({
    name: "しずくしま神社",
    prefix: "s",
    location: new Point3(880, 63, 41),
    markerLocation: new Point(868, 26),
    wikiIndex: 41,
    finished: true
  }),
  createLandmark({
    name: "魔界ノりりむの家",
    prefix: "m",
    location: new Point3(262, 70, 106),
    markerLocation: new Point(255, 102),
    wikiIndex: 42,
    finished: true
  }),
  createLandmark({
    name: "世界地図",
    prefix: "s",
    location: new Point3(148, 72, 0),
    markerLocation: new Point(144, -9),
    wikiIndex: 43,
    finished: true
  }),
  createLandmark({
    name: "陰キャ帝国",
    prefix: "i",
    location: new Point3(407, 65, 203),
    markerLocation: new Point(404, 223),
    wikiIndex: 45,
    finished: false
  }),
  createLandmark({
    name: "しばと凛月のおうち",
    prefix: "s",
    location: new Point3(158, 70, -110),
    markerLocation: new Point(137, -118),
    wikiIndex: 46,
    finished: true
  }),
  createLandmark({
    name: "モルパレス",
    prefix: "m",
    location: new Point3(78, 64, 75),
    markerLocation: new Point(61, 78),
    wikiIndex: 47,
    finished: true
  }),
  createLandmark({
    name: "シスター・クレアの教会",
    prefix: "s",
    location: new Point3(310, 66, 73),
    markerLocation: new Point(323, 66),
    wikiIndex: 48,
    finished: true
  }),
  createLandmark({
    name: "川の下の渓谷",
    prefix: "k",
    location: new Point3(151, 24, 98),
    markerLocation: new Point(151, 98),
    wikiIndex: 52,
    finished: true
  }),
  createLandmark({
    name: "桜第一惑星",
    prefix: "s",
    location: new Point3(128, 67, -147),
    markerLocation: new Point(128, -168),
    wikiIndex: 55,
    finished: true,
    xOffset: 40
  }),
  createLandmark({
    name: "リボルバー",
    prefix: "r",
    location: new Point3(-238, 79, 909),
    markerLocation: new Point(-227, 906),
    wikiIndex: 60,
    finished: false
  }),
  createLandmark({
    name: "闘技場",
    prefix: "t",
    location: new Point3(231, 17, -83),
    markerLocation: new Point(231, -83),
    finished: true,
    wikiIndex: 62
  }),
  createLandmark({
    name: "ヒモと財布ハウス",
    prefix: "h",
    location: new Point3(179, 75, 306),
    markerLocation: new Point(174, 302),
    finished: true,
    xOffset: -60,
    wikiIndex: 63
  }),
  createLandmark({
    name: "カリスマ三姉妹の像",
    prefix: "k",
    location: new Point3(264, 69, 67),
    markerLocation: new Point(260, 64),
    wikiIndex: 65,
    finished: true
  }),
  createLandmark({
    name: "ひまぐまんち(・ヮ・)",
    prefix: "h",
    location: new Point3(-2448, 75, 3408),
    markerLocation: new Point(-2448, 3408),
    wikiIndex: 66,
    finished: false
  }),
  createLandmark({
    name: "カ◯ン塔",
    prefix: "k",
    location: new Point3(308, 69, 130),
    markerLocation: new Point(308, 100),
    wikiIndex: 67,
    finished: true
  }),
  createLandmark({
    name: "狂犬ズハウス",
    prefix: "k",
    location: new Point3(-89, 64, 19),
    markerLocation: new Point(-89, 19),
    wikiIndex: 68,
    finished: false
  }),
  createLandmark({
    name: "サクラダ・ファミリア",
    prefix: "s",
    location: new Point3(86, 64, 17),
    markerLocation: new Point(63, -7),
    finished: false,
    wikiIndex: 69,
    xOffset: 40
  }),
  createLandmark({
    name: "競馬場予定地",
    prefix: "k",
    location: new Point3(-270, 69, -35),
    markerLocation: new Point(-288, -104),
    wikiIndex: 70,
    finished: false
  }),
  createLandmark({
    name: "ゆめおのライブハウス",
    prefix: "y",
    location: new Point3(-183, 64, 30),
    markerLocation: new Point(-195, 22),
    wikiIndex: 71,
    finished: false
  }),
  createLandmark({
    name: "とうふ",
    prefix: "t",
    location: new Point3(327, 63, 636),
    markerLocation: new Point(323, 632),
    wikiIndex: 72,
    finished: true
  }),
  createLandmark({
    name: "クレアリゾート",
    prefix: "c",
    location: new Point3(620, 63, -30),
    markerLocation: new Point(629, -37),
    wikiIndex: 73,
    finished: true
  }),
  createLandmark({
    name: "しばハウス2",
    prefix: "s",
    location: new Point3(197, 63, 127),
    markerLocation: new Point(206, 124),
    wikiIndex: 75,
    finished: true
  }),
  createLandmark({
    name: "矢車りねの家",
    prefix: "y",
    location: new Point3(116, 86, 284),
    markerLocation: new Point(116, 284),
    wikiIndex: 76,
    finished: false
  }),
  createLandmark({
    name: "立ち退き反対ハウス",
    prefix: "t",
    location: new Point3(-326, 69, -21),
    markerLocation: new Point(-327, -54),
    wikiIndex: 79,
    finished: true
  }),
  createLandmark({
    name: "「たけし」と「さわるな危険」",
    prefix: ["t", "s"],
    location: new Point3(169, 67, 70),
    markerLocation: new Point(177, 64),
    wikiIndex: 80,
    finished: true,
    xOffset: 60
  }),
  createLandmark({
    name: "BLハウス",
    prefix: "b",
    location: new Point3(271, 68, 82),
    markerLocation: new Point(271, 73),
    wikiIndex: 85,
    finished: true,
    xOffset: 40
  }),
  createLandmark({
    name: "神田笑一の仮拠点",
    prefix: "k",
    location: new Point3(-5, 76, 294),
    markerLocation: new Point(-5, 294),
    wikiIndex: 88,
    finished: false
  }),
  createLandmark({
    name: "新宿駅",
    prefix: ["s", "e"],
    location: new Point3(194, 70, -4),
    markerLocation: new Point(196, -57),
    wikiIndex: 89,
    finished: true
  }),
  createLandmark({
    name: "緑仙の家",
    prefix: "r",
    location: new Point3(407, 105, 765),
    markerLocation: new Point(411, 767),
    wikiIndex: 90,
    finished: false
  }),
  createLandmark({
    name: "神田笑一の家",
    prefix: "k",
    location: new Point3(4, 71, 315),
    markerLocation: new Point(4, 315),
    wikiIndex: 91,
    finished: false
  }),
  createLandmark({
    name: "くまさんランド",
    prefix: "k",
    location: new Point3(305, 72, 169),
    markerLocation: new Point(306, 171),
    wikiIndex: 92,
    finished: true
  }),
  createLandmark({
    name: "ヘアピン像",
    prefix: ["m", "h"],
    location: new Point3(87, 64, 5),
    markerLocation: new Point(87, 0),
    wikiIndex: 95,
    finished: true
  }),
  createLandmark({
    name: "DERAS HOUSE",
    prefix: "d",
    location: new Point3(-184, 64, 73),
    markerLocation: new Point(-197, 55),
    wikiIndex: 98,
    finished: true
  }),
  createLandmark({
    name: "新・笹木像",
    prefix: "s",
    location: new Point3(429, 87, 871),
    markerLocation: new Point(429, 871),
    wikiIndex: 99,
    finished: true
  }),
  createLandmark({
    name: "セブンイレブン",
    prefix: "s",
    location: new Point3(-185, 64, 100),
    markerLocation: new Point(-190, 93),
    wikiIndex: 100,
    finished: true
  }),
  createLandmark({
    name: "🌸ンボ族村",
    prefix: "s",
    location: new Point3(-4792, 63, 4860),
    markerLocation: new Point(-4791, 4790),
    wikiIndex: 102,
    finished: false
  }),
  createLandmark({
    name: "花見会場",
    prefix: "h",
    location: new Point3(151, 79, 199),
    markerLocation: new Point(151, 188),
    wikiIndex: 103,
    finished: false
  }),
  createLandmark({
    name: "遠北千南のマジックツリーハウス",
    prefix: "a",
    location: new Point3(53, 62, 489),
    markerLocation: new Point(58, 476),
    wikiIndex: 104,
    finished: true
  }),
  createLandmark({
    name: "資材ワールドゲート",
    prefix: "s",
    location: new Point3(128, 64, 49),
    markerLocation: new Point(128, 49),
    wikiIndex: 105,
    finished: true
  }),
  createLandmark({
    name: "時計塔(噴水)",
    prefix: "t",
    location: new Point3(779, 89, 90),
    markerLocation: new Point(779, 90),
    wikiIndex: 108,
    finished: true
  }),
  createLandmark({
    name: "静凛ニュータウン",
    prefix: "s",
    location: new Point3(806, 66, 70),
    markerLocation: new Point(806, 70),
    wikiIndex: 109,
    finished: true
  }),
  createLandmark({
    name: "メイド喫茶",
    prefix: "m",
    location: new Point3(-159, 63, 20),
    markerLocation: new Point(-154, 25),
    wikiIndex: 112,
    finished: true
  }),
  createLandmark({
    name: "久遠千歳の一時拠点",
    prefix: "k",
    location: new Point3(58, 63, -55),
    markerLocation: new Point(58, -55),
    wikiIndex: 114,
    finished: true
  }),
  createLandmark({
    name: "にじさんじランド",
    prefix: "n",
    location: new Point3(-1400, 68, 1412),
    markerLocation: new Point(-1496, 1395),
    wikiIndex: 116,
    finished: false
  }),
  createLandmark({
    name: "松本さんの墓(農業コンビナート爆破跡地)",
    prefix: ["m", "n"],
    location: new Point3(668, 64, 142),
    markerLocation: new Point(669, 140),
    wikiIndex: 120,
    finished: true
  }),
  createLandmark({
    name: "夢月ロアの拠点",
    prefix: "y",
    location: new Point3(410, 56, 113),
    markerLocation: new Point(412, 107),
    wikiIndex: 121,
    finished: false
  }),
  createLandmark({
    name: "現代アート・『世界』(Hello World)",
    prefix: ["g", "s", "h"],
    location: new Point3(78, 63, -84),
    markerLocation: new Point(62, -90),
    wikiIndex: 123,
    finished: true
  }),
  createLandmark({
    name: "ラブラブ島",
    prefix: "l",
    location: new Point3(543, 63, 361),
    markerLocation: new Point(543, 359),
    wikiIndex: 126,
    finished: false
  }),
  createLandmark({
    name: "取引所",
    prefix: "t",
    location: new Point3(565, 63, 343),
    markerLocation: new Point(576, 333),
    wikiIndex: 128,
    finished: true
  }),
  createLandmark({
    name: "🌸ンボ宮殿",
    prefix: "s",
    location: new Point3(-4792, 63, 4891),
    markerLocation: new Point(-4793, 4908),
    wikiIndex: 129,
    finished: true
  }),
  createLandmark({
    name: "しば城",
    prefix: "s",
    location: new Point3(-130, 62, 72),
    markerLocation: new Point(-130, 72),
    wikiIndex: 137,
    finished: true
  }),
  createLandmark({
    name: "黒井神社",
    prefix: "k",
    location: new Point3(-86, 65, 3),
    markerLocation: new Point(-86, -29),
    wikiIndex: 139,
    finished: true
  }),
  createLandmark({
    name: "にじさんじスタジアム",
    prefix: "n",
    location: new Point3(640, 64, 133),
    markerLocation: new Point(638, 136),
    wikiIndex: 140,
    finished: true
  }),
  createLandmark({
    name: "城下町ネザーゲートのある島(仮称)",
    prefix: "j",
    location: new Point3(506, 63, 319),
    markerLocation: new Point(501, 316),
    wikiIndex: 141,
    finished: true
  }),
  createLandmark({
    name: "物述有栖の家(仮)",
    prefix: "m",
    location: new Point3(-139, 63, 15),
    markerLocation: new Point(-140, 3),
    wikiIndex: 142,
    finished: true
  }),
  createLandmark({
    name: "笹木咲の水族館(仮)",
    prefix: "s",
    location: new Point3(371, 63, 212),
    markerLocation: new Point(362, 213),
    wikiIndex: 147,
    finished: true
  }),
  createLandmark({
    name: "学校",
    prefix: "g",
    location: new Point3(-229, 71, 680),
    markerLocation: new Point(-211, 654),
    wikiIndex: 148,
    finished: true
  }),
  createLandmark({
    name: "ネコカフェ",
    prefix: "n",
    location: new Point3(352, 67, 166),
    markerLocation: new Point(357, 160),
    wikiIndex: 150,
    finished: true
  }),
  createLandmark({
    name: "にじさんじ一期生のお家",
    prefix: ["n", "i"],
    location: new Point3(597, 63, 302),
    markerLocation: new Point(603, 275),
    wikiIndex: 153,
    finished: true
  }),
  createLandmark({
    name: "らぶらぶ♡ホテル",
    prefix: "l",
    location: new Point3(131, 63, 413),
    markerLocation: new Point(131, 413),
    wikiIndex: 154,
    finished: false
  }),
  createLandmark({
    name: "風雲さんばか城",
    prefix: ["h", "s"],
    location: new Point3(-271, 94, 767),
    markerLocation: new Point(-261, 758),
    wikiIndex: 156,
    finished: true
  }),
  createLandmark({
    name: "あほあほハウス",
    prefix: "a",
    location: new Point3(101, 67, -247),
    markerLocation: new Point(92, -260),
    wikiIndex: 158,
    finished: true
  }),
  createLandmark({
    name: "森中ランド",
    prefix: "m",
    location: new Point3(-47, 63, 507),
    markerLocation: new Point(-80, 489),
    wikiIndex: 161,
    finished: false
  }),
  createLandmark({
    name: "ハワイ",
    prefix: "h",
    location: new Point3(537, 63, 269),
    markerLocation: new Point(528, 260),
    wikiIndex: 162,
    finished: false
  }),
  createLandmark({
    name: "旅の井戸",
    prefix: "t",
    location: new Point3(143, 64, 50),
    markerLocation: new Point(137, 45),
    wikiIndex: 163,
    finished: true
  }),
  createLandmark({
    name: "みれいハウス",
    prefix: "m",
    location: new Point3(518, 69, 132),
    markerLocation: new Point(518, 116),
    wikiIndex: 170,
    finished: true
  }),
  createLandmark({
    name: "JK組(偽)ハウス",
    prefix: "j",
    location: new Point3(-30011, 69, -20195),
    markerLocation: new Point(-30011, -20205),
    wikiIndex: 171,
    finished: true
  }),
  createLandmark({
    name: "トニー・スタークのおうち",
    prefix: "t",
    location: new Point3(-184, 65, 145),
    markerLocation: new Point(-200, 143),
    wikiIndex: 174,
    finished: true
  }),
  createLandmark({
    name: "お祭り会場",
    prefix: "o",
    location: new Point3(-60, 64, 17),
    markerLocation: new Point(-60, 17),
    wikiIndex: 180,
    finished: false
  }),
  createLandmark({
    name: "chimakakurega",
    prefix: "c",
    location: new Point3(-107, 63, -156),
    markerLocation: new Point(-113, -215),
    wikiIndex: 187,
    finished: false
  }),
  createLandmark({
    name: "テント",
    prefix: "t",
    location: new Point3(-300, 69, 431),
    markerLocation: new Point(-303, 424),
    wikiIndex: 189,
    finished: true
  }),
  createLandmark({
    name: "チャイカの理想のお家",
    prefix: "c",
    location: new Point3(8, 63, 26),
    markerLocation: new Point(8, 29),
    xOffset: 40,
    wikiIndex: 190,
    finished: false
  }),
  createLandmark({
    name: "青氷ボートレース場",
    prefix: ["a", "b"],
    location: new Point3(-4681, 63, 4796),
    markerLocation: new Point(-4603, 4777),
    wikiIndex: 191,
    finished: true
  }),
  createLandmark({
    name: "加賀美インダストリアル仮社屋",
    prefix: "k",
    location: new Point3(57, 63, 328),
    markerLocation: new Point(57, 328),
    wikiIndex: 192,
    finished: false
  }),
  createLandmark({
    name: "ぶるーずの巣",
    prefix: "b",
    location: new Point3(38, 67, 302),
    markerLocation: new Point(45, 299),
    wikiIndex: 193,
    finished: false
  }),
  createLandmark({
    name: "アルスの森",
    prefix: "a",
    location: new Point3(555, 68, 83),
    markerLocation: new Point(555, 68),
    wikiIndex: 194,
    finished: false
  }),
  createLandmark({
    name: "太陽",
    prefix: "t",
    location: new Point3(195, 256, 5),
    markerLocation: new Point(195, -1),
    wikiIndex: 198,
    finished: true
  }),
  createLandmark({
    name: "配慮ロード",
    prefix: "h",
    dimension: Dimension.TheNether,
    location: new Point3(19, 70, 16),
    markerLocation: new Point(19, 16),
    wikiIndex: 201,
    finished: true
  }),
  createLandmark({
    name: "BIG WOOD HAYAMA HOUSE",
    prefix: "b",
    location: new Point3(352, 63, 185),
    markerLocation: new Point(380, 178),
    wikiIndex: 203,
    finished: false
  }),
  createLandmark({
    name: "うんち",
    prefix: "u",
    location: new Point3(227, 70, 19),
    markerLocation: new Point(229, 6),
    wikiIndex: 210,
    finished: true
  }),
  createLandmark({
    name: "氷マンション(仮)",
    prefix: "k",
    location: new Point3(117, 63, 73),
    markerLocation: new Point(107, 73),
    wikiIndex: 216,
    finished: false
  }),
  createLandmark({
    name: "山田太郎",
    prefix: "y",
    location: new Point3(405, 134, 202),
    markerLocation: new Point(400, 198),
    wikiIndex: 218,
    finished: true
  }),
  createLandmark({
    name: "ラトナ・プティの家(仮)",
    prefix: "r",
    location: new Point3(455, 63, 344),
    markerLocation: new Point(455, 344),
    wikiIndex: 224,
    finished: true
  }),
  createLandmark({
    name: "暗黒城(仮)",
    prefix: "a",
    location: new Point3(-4973, 70, 4915),
    markerLocation: new Point(-4964, 4917),
    wikiIndex: 228,
    finished: false
  }),
  createLandmark({
    name: "月",
    prefix: "t",
    location: new Point3(137, 216, 60),
    markerLocation: new Point(137, 52),
    wikiIndex: 229,
    finished: true
  }),
  createLandmark({
    name: "謎の建造物(兎)",
    prefix: "n",
    location: new Point3(-920, 64, -1496),
    markerLocation: new Point(-928, -1502),
    wikiIndex: 238,
    finished: true
  }),
  createLandmark({
    name: "山田太郎のおうち",
    prefix: "y",
    location: new Point3(198, 72, -120),
    markerLocation: new Point(199, -131),
    wikiIndex: 239,
    finished: true
  }),

  // 以下 wiki に無い建築物

  createLandmark({
    name: "弓道場",
    prefix: "k",
    location: new Point3(106, 68, -149),
    markerLocation: new Point(107, -203),

    xOffset: 20,
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "ド葛本社",
    prefix: "d",
    location: new Point3(382, 63, 46),
    markerLocation: new Point(367, 37),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "セーフハウス",
    prefix: "s",
    location: new Point3(-172, 65, 16),
    markerLocation: new Point(-171, 8),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "鈴谷アキの仮拠点",
    prefix: "s",
    location: new Point3(-266, 76, 217),
    markerLocation: new Point(-270, 211),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "キリトの剣取らないで",
    prefix: "k",
    location: new Point3(-467, 73, 543),
    markerLocation: new Point(-465, 540),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "アパホテル",
    prefix: "a",
    location: new Point3(-30023, 69, -20170),
    markerLocation: new Point(-30023, -20188),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "舞元さん化石耐久配信現場",
    prefix: "m",
    location: new Point3(-383, 40, -504),
    markerLocation: new Point(-383, -504),
    wikiIndex: -1,
    finished: false
  }),
  createLandmark({
    name: "葛葉さん遭難跡地",
    prefix: "k",
    location: new Point3(-298, 44, 1076),
    markerLocation: new Point(-298, 1071),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "ベルさん海底神殿攻略拠点",
    prefix: "b",
    location: new Point3(597, 75, 7875),
    markerLocation: new Point(591, 7863),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "静凛サンゴ礁仮拠点",
    prefix: "s",
    location: new Point3(0, 64, 5418),
    markerLocation: new Point(0, 5411),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "エンド要塞(静凛)",
    prefix: "e",
    location: new Point3(5870, 43, 5746),
    markerLocation: new Point(5870, 5746),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "骨バイオーム",
    prefix: "h",
    location: new Point3(24, 69, 190),
    markerLocation: new Point(20, 176),
    wikiIndex: -1,
    finished: false
  }),
  createLandmark({
    name: "液",
    prefix: "e",
    location: new Point3(253, 70, 309),
    markerLocation: new Point(253, 301),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "うい覇道",
    prefix: "u",
    location: new Point3(-736, 71, 347),
    markerLocation: new Point(-735, -77),
    corners: [
      new Point(-589, -94),
      new Point(-589, -76),
      new Point(-735, -76),
      new Point(-735, 299),
      new Point(-733, 299),
      new Point(-733, 344)
    ],
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "神田ロード",
    prefix: "k",
    location: new Point3(8, 65.5, 428),
    markerLocation: new Point(13, 389),
    finished: false,
    wikiIndex: -1,
    xOffset: 100
  }),
  createLandmark({
    name: "矢車監視事務局",
    prefix: "y",
    location: new Point3(187, 72, 318),
    markerLocation: new Point(187, 319),
    finished: true,
    wikiIndex: -1,
    xOffset: 60
  }),
  createLandmark({
    name: "シスター・クレアの仮家",
    prefix: "s",
    location: new Point3(340, 67, 112),
    markerLocation: new Point(344, 95),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "いちごの仮拠点",
    prefix: "i",
    location: new Point3(1025, 67, 1416),
    markerLocation: new Point(1025, 1416),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "仮拠点(シスタークレア,20190422)",
    prefix: "k",
    location: new Point3(-2365, 63, 2287),
    markerLocation: new Point(-2368, 2263),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "避難所(シスタークレア,20190814)",
    prefix: "h",
    location: new Point3(1427, 62, -164),
    markerLocation: new Point(1427, -164),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "ネザーゲート(1437,-141)",
    prefix: "n",
    location: new Point3(1437, 69, -141),
    markerLocation: new Point(1435, -144),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "HELP",
    prefix: "h",
    location: new Point3(-1735, 69, 1096),
    markerLocation: new Point(-1746, 1076),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "ネザーゲート(パンダ運搬用)",
    prefix: "n",
    location: new Point3(-12223, 64, -8011),
    markerLocation: new Point(-12223, -8011),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "ネザーゲート(2717,-3906)",
    prefix: "n",
    location: new Point3(2717, 63, -3906),
    markerLocation: new Point(2717, -3906),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "いちごが発見した村",
    prefix: "i",
    location: new Point3(2305, 64, -1791),
    markerLocation: new Point(2305, -1791),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "いちごと緑仙が発見した村",
    prefix: "i",
    location: new Point3(2577, 71, -3439),
    markerLocation: new Point(2577, -3439),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "いちごが発見した村",
    prefix: "i",
    location: new Point3(2193, 63, -2903),
    markerLocation: new Point(2193, -2903),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "いちごが発見したピラミッド",
    prefix: "i",
    location: new Point3(2154, 65, -2688),
    markerLocation: new Point(2154, -2688),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "いちごが発見した村",
    prefix: "i",
    location: new Point3(2113, 69, -2511),

    markerLocation: new Point(2113, -2511),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "クレアが発見した村",
    prefix: "c",
    location: new Point3(1825, 68, -1343),
    markerLocation: new Point(1825, -1343),
    wikiIndex: -1,
    finished: false
  }),
  createLandmark({
    name: "スライムカフェ",
    prefix: "s",
    location: new Point3(2160, 66, -1653),
    markerLocation: new Point(2160, -1653),
    wikiIndex: -1,
    finished: false
  }),
  createLandmark({
    name: "しばハウス3",
    prefix: "s",
    location: new Point3(-146, 69, -55),
    markerLocation: new Point(-154, -66),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "採掘入口",
    prefix: "s",
    location: new Point3(338, 62, 469),
    markerLocation: new Point(338, 469),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "閉鎖中",
    prefix: "h",
    location: new Point3(353, 63, 557),
    markerLocation: new Point(353, 557),
    wikiIndex: -1,
    finished: false
  }),
  createLandmark({
    name: "第一隠れ家(跡地)",
    prefix: "d",
    location: new Point3(324, 63, 278),
    markerLocation: new Point(322, 272),
    wikiIndex: -1,
    finished: false
  }),
  createLandmark({
    name: "ゆきしろBOX",
    prefix: "y",
    location: new Point3(-30193, 63, -20153),
    markerLocation: new Point(-30193, -20153),
    wikiIndex: -1,
    finished: false
  }),
  createLandmark({
    name: "エンドシップ(叶)",
    prefix: "e",
    dimension: Dimension.TheEnd,
    location: new Point3(2291, 58, 30),
    markerLocation: new Point(2291, 30),
    wikiIndex: -1,
    finished: false
  }),
  createLandmark({
    name: "夕陽リリの塔跡地",
    prefix: "y",
    location: new Point3(-570, 80, 456),
    markerLocation: new Point(-570, 456),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "炭鉱入口",
    prefix: "t",
    location: new Point3(753, 63, 682),
    markerLocation: new Point(753, 682),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "誰かの犬",
    prefix: "d",
    location: new Point3(246, 63, 565),
    markerLocation: new Point(246, 565),
    wikiIndex: -1,
    finished: true
  }),
  createLandmark({
    name: "エンド要塞(桜凛月)",
    prefix: "e",
    location: new Point3(-3625, 28, 3862),
    markerLocation: new Point(-3625, 3862),
    wikiIndex: -1,
    finished: false
  })
].sort((a, b) => {
  if (a.markerLocation.z == b.markerLocation.z) {
    return a.markerLocation.x - b.markerLocation.z;
  } else {
    return a.markerLocation.z - b.markerLocation.z;
  }
});

type Railway = { name: string; corners: Point[] };

const kRailways: Railway[] = [
  {
    name: "うい覇道",
    corners: [
      new Point(-589, -94),
      new Point(-589, -76),
      new Point(-735, -76),
      new Point(-735, 299),
      new Point(-733, 299),
      new Point(-733, 344)
    ]
  },
  {
    name: "花畑鉄道にじさんじランド線",
    corners: [
      new Point(-308, 783),
      new Point(-885, 783),
      new Point(-885, 781),
      new Point(-997, 781),
      new Point(-997, 783),
      new Point(-1037, 783),
      new Point(-1037, 941),
      new Point(-1038, 941),
      new Point(-1038, 1082),
      new Point(-1044, 1082),
      new Point(-1044, 1232),
      new Point(-1067, 1232),
      new Point(-1067, 1392),
      new Point(-1199, 1392),
      new Point(-1199, 1412),
      new Point(-1449, 1412)
    ]
  }
];

const kLandmarkLeft = kLandmarks.reduce(
  (accum, current) => Math.min(accum, current.markerLocation.x),
  kLandmarks[0].markerLocation.x
);
const kLandmarkRight = kLandmarks.reduce(
  (accum, current) => Math.max(accum, current.markerLocation.x),
  kLandmarks[0].markerLocation.x
);
const kLandmarkTop = kLandmarks.reduce(
  (accum, current) => Math.min(accum, current.markerLocation.z),
  kLandmarks[0].markerLocation.z
);
const kLandmarkBototm = kLandmarks.reduce(
  (accum, current) => Math.max(accum, current.markerLocation.z),
  kLandmarks[0].markerLocation.z
);
export const kLandmarksTopLeft = new Point(kLandmarkLeft, kLandmarkTop);
export const kLandmarksRightBottom = new Point(kLandmarkRight, kLandmarkBototm);

if (typeof window === "undefined") {
  kLandmarks
    .filter(it => it.dimension === Dimension.Overworld)
    .forEach(landmark => {
      console.log(`${landmark.markerLocation.x}\t${landmark.markerLocation.z}`);
    });
  kRailways.forEach(railway => {
    for (let i = 1; i < railway.corners.length; i++) {
      const c0 = railway.corners[i - 1];
      const c1 = railway.corners[i];
      if (c0.x !== c1.x && c0.z !== c1.z) {
        return;
      }
      const dx = c1.x - c0.x;
      const dz = c1.z - c0.z;
      const length = Math.max(Math.abs(dx), Math.abs(dz));
      const direction = new Point(Math.sign(dx), Math.sign(dz));
      for (let j = 0; j < length; j++) {
        const x = c0.x + j * direction.x;
        const z = c0.z + j * direction.z;
        console.log(`${x}\t${z}`);
      }
    }
  });
}
