import { romanize } from "./romanize";

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
  yomi: string | string[]; // name のローマ字表記. 別名がある場合は配列にする
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
  const dimension =
    params.dimension === void 0 ? Dimension.Overworld : params.dimension;
  const markerLocation =
    params.markerLocation || new Point(params.location.x, params.location.z);
  const wikiIndex = params.wikiIndex || -1;
  delete params.dimension;
  delete params.markerLocation;
  delete params.wikiIndex;
  return { ...params, dimension, markerLocation, wikiIndex };
}

export const kLandmarks: Landmark[] = [
  createLandmark({
    name: "共有ハウス",
    yomi: ["きょうゆうはうす", "きょうゆうhouse", "みんなのおうち"],
    location: new Point3(185, 70, 30),
    markerLocation: new Point(175, 17),
    wikiIndex: 1,
    finished: true
  }),
  createLandmark({
    name: "静凛の家",
    yomi: ["しずかりんのいえ", "しずりんのいえ"],
    location: new Point3(838, 71, 71),
    markerLocation: new Point(842, 72),
    wikiIndex: 2,
    finished: true
  }),
  createLandmark({
    name: "静凛の村",
    yomi: ["しずかりんのむら", "しずりんのむら"],
    location: new Point3(1621, 71, 292),
    markerLocation: new Point(1620, 255),
    wikiIndex: 3,
    finished: false
  }),
  createLandmark({
    name: "叶の仮拠点",
    yomi: "かなえのかりきょてん",
    location: new Point3(13, 59, -160),
    wikiIndex: 4,
    finished: true
  }),
  createLandmark({
    name: "ドラひまハウス",
    yomi: ["どらひまはうす", "どらひまhouse"],
    location: new Point3(383, 66, 9),
    markerLocation: new Point(382, -9),
    wikiIndex: 5,
    finished: true
  }),
  createLandmark({
    name: "ドーラの隠れ家",
    yomi: "どーらのかくれが",
    location: new Point3(159, 65, 150),
    wikiIndex: 6,
    finished: true
  }),
  createLandmark({
    name: "ハジメ村",
    yomi: "はじめむら",
    location: new Point3(-383, 66, 18),
    markerLocation: new Point(-423, 17),
    wikiIndex: 7,
    finished: false
  }),
  createLandmark({
    name: "リリかざハウス",
    yomi: ["りりかざはうす", "りりかざhouse"],
    location: new Point3(206, 71, 66),
    markerLocation: new Point(214, 56),
    wikiIndex: 9,
    finished: true
  }),
  createLandmark({
    name: "叶の家",
    yomi: "かなえのいえ",
    location: new Point3(206, 72, -83),
    markerLocation: new Point(208, -106),
    xOffset: -30,
    wikiIndex: 11,
    finished: true
  }),
  createLandmark({
    name: "舞ハウス",
    yomi: ["まいはうす", "まいhouse"],
    location: new Point3(80, 63, 179),
    markerLocation: new Point(73, 162),
    wikiIndex: 15,
    finished: true
  }),
  createLandmark({
    name: "RKSアジト",
    yomi: ["RKSあじと", "あーるけーえすあじと"],
    location: new Point3(329, 63, -207),
    markerLocation: new Point(320, -218),
    wikiIndex: 16,
    finished: true
  }),
  createLandmark({
    name: "ちーかざちーハウス",
    yomi: "ちーかざちーはうす",
    location: new Point3(15, 64, -86),
    markerLocation: new Point(-1, -98),
    wikiIndex: 18,
    finished: true
  }),
  createLandmark({
    name: "Kyoko's seacret house",
    yomi: [
      "きょうこずしーくれっとはうす",
      "kyokosseacrethouse",
      "kyokossecrethouse"
    ],
    location: new Point3(243, 63, -120),
    xOffset: 80,
    wikiIndex: 20,
    finished: true
  }),
  createLandmark({
    name: "いちご大墳墓",
    yomi: "いちごだいふんぼ",
    location: new Point3(325, 64, 638),
    markerLocation: new Point(323, 631),
    wikiIndex: 21,
    finished: true
  }),
  createLandmark({
    name: "森の羊羹",
    yomi: "もりのようかん",
    location: new Point3(4319, 87, 5423),
    markerLocation: new Point(4282, 5398),
    wikiIndex: 23,
    finished: false
  }),
  createLandmark({
    name: "舞元啓介の家",
    yomi: "まいもとけいすけのいえ",
    location: new Point3(322, 63, -11),
    markerLocation: new Point(323, -42),
    wikiIndex: 24,
    finished: true
  }),
  createLandmark({
    name: "でびリオンハウス",
    yomi: ["でびりおんはうす", "でびりおんhouse"],
    location: new Point3(124, 71, -55),
    markerLocation: new Point(124, -63),
    wikiIndex: 27,
    finished: false
  }),
  createLandmark({
    name: "アキくんはし",
    yomi: "あきくんはし",
    location: new Point3(33, 63, 16),
    markerLocation: new Point(24, 15),
    wikiIndex: 30,
    finished: true
  }),
  createLandmark({
    name: "夕陽リリの家",
    yomi: "ゆうひりりのいえ",
    location: new Point3(749, 71, -3),
    markerLocation: new Point(747, -37),
    wikiIndex: 31,
    finished: true
  }),
  createLandmark({
    name: "アズカバン",
    yomi: ["あずかばん", "azkaban"],
    location: new Point3(387, 63, 71),
    markerLocation: new Point(423, 63),
    wikiIndex: 32,
    finished: true
  }),
  createLandmark({
    name: "シスター・クレアの家",
    yomi: "しすたーくれあのいえ",
    location: new Point3(247, 76, 718),
    markerLocation: new Point(247, 736),
    wikiIndex: 33,
    finished: true
  }),
  createLandmark({
    name: "轟京子と名伽尾アズマの家",
    yomi: "とどろききょうことなかおあずまのいえ",
    location: new Point3(-134, 64, -365),
    wikiIndex: 34,
    finished: true
  }),
  createLandmark({
    name: "温泉(森中温泉)",
    yomi: ["おんせん", "もりなかおんせん"],
    location: new Point3(278, 70, 112),
    markerLocation: new Point(274, 118),
    wikiIndex: 35,
    finished: true
  }),
  createLandmark({
    name: "ギル様の家",
    yomi: "ぎるさまのいえ",
    location: new Point3(732, 64, 56),
    markerLocation: new Point(724, 53),
    wikiIndex: 36,
    finished: true
  }),
  createLandmark({
    name: "✞黒の要塞✞",
    yomi: "くろのようさい",
    location: new Point3(242, 63, -41),
    wikiIndex: 37,
    finished: true
  }),
  createLandmark({
    name: "神社",
    yomi: ["じんじゃ", "がちくずじんじゃ"],
    location: new Point3(245, 70, 31),
    markerLocation: new Point(262, 23),
    wikiIndex: 40,
    finished: true
  }),
  createLandmark({
    name: "しずくしま神社",
    yomi: "しずくしまじんじゃ",
    location: new Point3(821, 63, 41),
    markerLocation: new Point(961, 17),
    wikiIndex: 41,
    finished: true
  }),
  createLandmark({
    name: "魔界ノりりむの家",
    yomi: "まかいのりりむのいえ",
    location: new Point3(262, 70, 106),
    markerLocation: new Point(255, 102),
    wikiIndex: 42,
    finished: true
  }),
  createLandmark({
    name: "世界地図",
    yomi: ["せかいちず", "ちず"],
    location: new Point3(148, 72, 0),
    markerLocation: new Point(144, -9),
    wikiIndex: 43,
    finished: true
  }),
  createLandmark({
    name: "陰キャ帝国",
    yomi: "いんきゃていこく",
    location: new Point3(407, 65, 203),
    markerLocation: new Point(404, 223),
    wikiIndex: 45,
    finished: false
  }),
  createLandmark({
    name: "しばと凛月のおうち",
    yomi: "しばとりつきのおうち",
    location: new Point3(158, 70, -110),
    markerLocation: new Point(137, -118),
    wikiIndex: 46,
    finished: true
  }),
  createLandmark({
    name: "モルパレス",
    yomi: "もるぱれす",
    location: new Point3(78, 64, 75),
    markerLocation: new Point(61, 78),
    wikiIndex: 47,
    finished: true
  }),
  createLandmark({
    name: "シスター・クレアの教会",
    yomi: ["しすたーくれあのきょうかい", "sisterclaireのきょうかい"],
    location: new Point3(310, 66, 73),
    markerLocation: new Point(323, 66),
    wikiIndex: 48,
    finished: true
  }),
  createLandmark({
    name: "川の下の渓谷",
    yomi: "かわのしたのけいこく",
    location: new Point3(151, 24, 98),
    wikiIndex: 52,
    finished: true
  }),
  createLandmark({
    name: "ぺぺレスト",
    yomi: "ぺぺれすと",
    location: new Point3(632, 102, 370),
    wikiIndex: 54,
    finished: false
  }),
  createLandmark({
    name: "桜第一惑星",
    yomi: "さくらだいいちわくせい",
    location: new Point3(128, 68, -147),
    markerLocation: new Point(128, -168),
    wikiIndex: 55,
    finished: true,
    xOffset: 40
  }),
  createLandmark({
    name: "リボルバー",
    yomi: ["りぼるばー", "revolver"],
    location: new Point3(-238, 79, 909),
    markerLocation: new Point(-227, 906),
    wikiIndex: 60,
    finished: false
  }),
  createLandmark({
    name: "闘技場",
    yomi: "とうぎじょう",
    location: new Point3(231, 17, -83),
    finished: true,
    wikiIndex: 62
  }),
  createLandmark({
    name: "ヒモと財布ハウス",
    yomi: ["ひもとさいふはうす", "ひもとさいふhouse"],
    location: new Point3(179, 75, 306),
    markerLocation: new Point(174, 302),
    finished: true,
    xOffset: -60,
    wikiIndex: 63
  }),
  createLandmark({
    name: "カリスマ三姉妹の像",
    yomi: "かりすまさんしまいのぞう",
    location: new Point3(264, 69, 67),
    markerLocation: new Point(260, 64),
    wikiIndex: 65,
    finished: true
  }),
  createLandmark({
    name: "ひまぐまんち(・ヮ・)",
    yomi: "ひまぐまんち",
    location: new Point3(-2448, 75, 3408),
    wikiIndex: 66,
    finished: false
  }),
  createLandmark({
    name: "カ◯ン塔",
    yomi: "かりんとう",
    location: new Point3(308, 69, 130),
    markerLocation: new Point(308, 100),
    wikiIndex: 67,
    finished: true
  }),
  createLandmark({
    name: "狂犬ズハウス",
    yomi: "きょうけんずはうす",
    location: new Point3(-89, 64, 19),
    wikiIndex: 68,
    finished: true
  }),
  createLandmark({
    name: "サクラダ・ファミリア",
    yomi: ["さくらだふぁみりあ", "さぐらだふぁみりあ"],
    location: new Point3(86, 64, 17),
    markerLocation: new Point(63, -7),
    finished: false,
    wikiIndex: 69,
    xOffset: 40
  }),
  createLandmark({
    name: "競馬場予定地",
    yomi: "けいばじょうよていち",
    location: new Point3(-270, 69, -35),
    markerLocation: new Point(-288, -104),
    wikiIndex: 70,
    finished: false
  }),
  createLandmark({
    name: "ゆめおのライブハウス",
    yomi: "ゆめおのらいぶはうす",
    location: new Point3(-183, 64, 30),
    markerLocation: new Point(-195, 22),
    wikiIndex: 71,
    finished: false
  }),
  createLandmark({
    name: "とうふ",
    yomi: "とうふ",
    location: new Point3(327, 63, 636),
    markerLocation: new Point(323, 632),
    wikiIndex: 72,
    finished: true
  }),
  createLandmark({
    name: "クレアリゾート",
    yomi: ["くれありぞーと", "clairresort"],
    location: new Point3(620, 63, -30),
    markerLocation: new Point(629, -37),
    wikiIndex: 73,
    finished: true
  }),
  createLandmark({
    name: "町田ちまのラピュタ",
    yomi: "まちたちまのらぴゅた",
    location: new Point3(-99, 98, 67),
    markerLocation: new Point(-96, 56),
    finished: false
  }),
  createLandmark({
    name: "しばハウス2",
    yomi: ["しばはうす2", "しばhouse2"],
    location: new Point3(197, 63, 127),
    markerLocation: new Point(206, 124),
    wikiIndex: 75,
    finished: true
  }),
  createLandmark({
    name: "矢車りねの家",
    yomi: "やぐるまりねのいえ",
    location: new Point3(116, 86, 284),
    wikiIndex: 76,
    finished: false
  }),
  createLandmark({
    name: "立ち退き反対ハウス",
    yomi: "たちのきはんたいはうす",
    location: new Point3(-326, 69, -21),
    markerLocation: new Point(-327, -54),
    wikiIndex: 79,
    finished: true
  }),
  createLandmark({
    name: "「たけし」と「さわるな危険」",
    yomi: ["たけし", "さわるなきけん"],
    location: new Point3(169, 67, 70),
    markerLocation: new Point(177, 64),
    wikiIndex: 80,
    finished: true,
    xOffset: 60
  }),
  createLandmark({
    name: "モルパレス2号店",
    yomi: "もるぱれすにごうてん",
    location: new Point3(404, 64, 402),
    markerLocation: new Point(415, 389),
    wikiIndex: 82,
    finished: true
  }),
  createLandmark({
    name: "ちーかざちー炭鉱",
    yomi: "ちーかざちーたんこう",
    location: new Point3(-534, 71, -119),
    wikiIndex: 84,
    finished: false
  }),
  createLandmark({
    name: "BLハウス",
    yomi: ["blはうす", "びーえるはうす", "blhouse", "びーえるhouse"],
    location: new Point3(271, 68, 82),
    markerLocation: new Point(271, 73),
    wikiIndex: 85,
    finished: true,
    xOffset: 40
  }),
  createLandmark({
    name: "Bar DERAS",
    yomi: "barderas",
    location: new Point3(-132, 67, 180),
    wikiIndex: 86,
    finished: false
  }),
  createLandmark({
    name: "出雲水族館(研究所）",
    yomi: "いずもすいぞくかん",
    location: new Point3(435, 55, -78),
    markerLocation: new Point(463, -95),
    wikiIndex: 87,
    finished: false
  }),
  createLandmark({
    name: "神田笑一の仮拠点",
    yomi: "かんだしょういちのかりきょてん",
    location: new Point3(-5, 76, 294),
    wikiIndex: 88,
    finished: false
  }),
  createLandmark({
    name: "新宿駅",
    yomi: ["しんじゅくえき", "えき"],
    location: new Point3(194, 70, -4),
    markerLocation: new Point(196, -57),
    wikiIndex: 89,
    finished: true
  }),
  createLandmark({
    name: "緑仙の家",
    yomi: "りゅうしぇんのいえ",
    location: new Point3(407, 105, 765),
    markerLocation: new Point(411, 767),
    wikiIndex: 90,
    finished: true
  }),
  createLandmark({
    name: "神田笑一の家",
    yomi: "かんだしょういちのいえ",
    location: new Point3(4, 71, 315),
    wikiIndex: 91,
    finished: false
  }),
  createLandmark({
    name: "くまさんランド",
    yomi: ["くまさんらんど", "くまさんland"],
    location: new Point3(305, 72, 169),
    markerLocation: new Point(306, 171),
    wikiIndex: 92,
    finished: true
  }),
  createLandmark({
    name: "ヘアピン像",
    yomi: ["みみたろう", "へあぴんぞう"],
    location: new Point3(87, 64, 5),
    markerLocation: new Point(87, 0),
    wikiIndex: 95,
    finished: true
  }),
  createLandmark({
    name: "DERAS HOUSE",
    yomi: ["derashouse", "でらすはうす"],
    location: new Point3(-184, 64, 73),
    markerLocation: new Point(-197, 55),
    wikiIndex: 98,
    finished: true
  }),
  createLandmark({
    name: "新・笹木像",
    yomi: ["しんささきぞう", "ささきぞう"],
    location: new Point3(429, 87, 871),
    wikiIndex: 99,
    finished: true
  }),
  createLandmark({
    name: "セブンイレブン",
    yomi: ["せぶんいれぶん", "seveneleven", "711"],
    location: new Point3(-185, 64, 100),
    markerLocation: new Point(-190, 93),
    wikiIndex: 100,
    finished: true
  }),
  createLandmark({
    name: "🌸ンボ族村",
    yomi: ["さくらんぼぞくむら", "んぼぞくむら"],
    location: new Point3(-4792, 63, 4860),
    markerLocation: new Point(-4791, 4790),
    wikiIndex: 102,
    finished: false
  }),
  createLandmark({
    name: "花見会場",
    yomi: "はなみかいじょう",
    location: new Point3(151, 79, 199),
    markerLocation: new Point(151, 188),
    wikiIndex: 103,
    finished: false
  }),
  createLandmark({
    name: "遠北千南のマジックツリーハウス",
    yomi: "あちきたちなみのまじっくつりーはうす",
    location: new Point3(53, 62, 489),
    markerLocation: new Point(58, 476),
    wikiIndex: 104,
    finished: true
  }),
  createLandmark({
    name: "資材ワールドゲート",
    yomi: "しざいわーるどげーと",
    location: new Point3(128, 64, 49),
    wikiIndex: 105,
    finished: true
  }),
  createLandmark({
    name: "時計塔(噴水)",
    yomi: ["とけいとう", "ふんすい"],
    location: new Point3(779, 89, 90),
    wikiIndex: 108,
    finished: true
  }),
  createLandmark({
    name: "静凛ニュータウン",
    yomi: [
      "しずりんにゅーたうん",
      "しずかりんにゅーたうん",
      "しずりんnewtown",
      "しずかりんnewtown"
    ],
    location: new Point3(806, 66, 70),
    wikiIndex: 109,
    finished: true
  }),
  createLandmark({
    name: "童田家",
    yomi: "わらべだけ",
    location: new Point3(242, 70, 337),
    markerLocation: new Point(235, 333),
    wikiIndex: 110,
    finished: true
  }),
  createLandmark({
    name: "ここが僕の家だけどみんな僕のことすき？",
    yomi: "ここがぼくのいえだけどみんなぼくのことすき",
    location: new Point3(587, 63, 196),
    markerLocation: new Point(584, 190),
    wikiIndex: 111,
    finished: true
  }),
  createLandmark({
    name: "メイド喫茶",
    yomi: "めいどきっさ",
    location: new Point3(-159, 63, 20),
    markerLocation: new Point(-154, 25),
    wikiIndex: 112,
    finished: true
  }),
  createLandmark({
    name: "久遠千歳の一時拠点",
    yomi: "くどうちとせのいちじきょてん",
    location: new Point3(58, 63, -55),
    wikiIndex: 114,
    finished: true
  }),
  createLandmark({
    name: "夢月ロアの仮拠点",
    yomi: "ゆづきろあのかりきょてん",
    location: new Point3(-599, 74, -129),
    wikiIndex: 115,
    finished: false
  }),
  createLandmark({
    name: "夢月ロアの秘密基地",
    yomi: "ゆづきろあのひみつきち",
    location: new Point3(-475, 69, -38),
    markerLocation: new Point(-481, -44),
    wikiIndex: 115,
    finished: false
  }),
  createLandmark({
    name: "にじさんじランド",
    yomi: ["にじさんじらんど", "にじさんじland", "land"],
    location: new Point3(-1400, 68, 1412),
    markerLocation: new Point(-1496, 1395),
    wikiIndex: 116,
    finished: false
  }),
  createLandmark({
    name: "不老不死ハウセ",
    yomi: "ふろうふしはうせ",
    location: new Point3(429, 64, 168),
    markerLocation: new Point(432, 169),
    wikiIndex: 117,
    finished: true
  }),
  createLandmark({
    name: "泌尿器内科　膀胱炎の部屋",
    yomi: [
      "ひにょうきないかぼうこうえんのへや",
      "ひにょうきないか",
      "ぼうこうえんのへや"
    ],
    location: new Point3(-545, 69, -280),
    markerLocation: new Point(-560, -290),
    wikiIndex: 118,
    finished: true
  }),
  createLandmark({
    name: "松本さんの墓(農業コンビナート爆破跡地)",
    yomi: ["まつもとさんのはか", "のうぎょうこんびなーとばくはあとち"],
    location: new Point3(668, 64, 142),
    markerLocation: new Point(669, 140),
    wikiIndex: 120,
    finished: true
  }),
  createLandmark({
    name: "夢月ロアの拠点",
    yomi: "ゆずきろあのきょてん",
    location: new Point3(410, 56, 113),
    markerLocation: new Point(412, 107),
    wikiIndex: 121,
    finished: false
  }),
  createLandmark({
    name: "現代アート・『世界』(Hello World)",
    yomi: ["げんだいあーとせかい", "せかい", "helloworld"],
    location: new Point3(78, 63, -84),
    markerLocation: new Point(62, -90),
    wikiIndex: 123,
    finished: true
  }),
  createLandmark({
    name: "ラブラブ島",
    yomi: ["loveloveとう", "らぶらぶとう"],
    location: new Point3(543, 63, 361),
    markerLocation: new Point(543, 359),
    wikiIndex: 126,
    finished: false
  }),
  createLandmark({
    name: "取引所",
    yomi: "とりひきじょ",
    location: new Point3(565, 63, 343),
    markerLocation: new Point(576, 333),
    wikiIndex: 128,
    finished: true
  }),
  createLandmark({
    name: "🌸ンボ宮殿",
    yomi: ["さくらんぼきゅうでん", "んぼきゅうでん"],
    location: new Point3(-4792, 63, 4891),
    markerLocation: new Point(-4793, 4908),
    wikiIndex: 129,
    finished: true
  }),
  createLandmark({
    name: "ガンダーラ・ブホテル",
    yomi: "がんだーらぶほてる",
    location: new Point3(-1042, 70, 1185),
    markerLocation: new Point(-1036, 1179),
    wikiIndex: 131,
    finished: true
  }),
  createLandmark({
    name: "カザンツェル塔",
    yomi: "かざんつぇるとう",
    location: new Point3(118, 67, 357),
    markerLocation: new Point(126, 366),
    wikiIndex: 132,
    finished: true
  }),
  createLandmark({
    name: "小野町春香の拠点",
    yomi: "おのまちはるかのきょてん",
    location: new Point3(-186, 66, 353),
    markerLocation: new Point(-175, 345),
    wikiIndex: 133,
    finished: true
  }),
  createLandmark({
    name: "しば城",
    yomi: "しばじょう",
    location: new Point3(-130, 62, 72),
    wikiIndex: 137,
    finished: true
  }),
  createLandmark({
    name: "黒井神社",
    yomi: "くろいじんじゃ",
    location: new Point3(-86, 65, 3),
    markerLocation: new Point(-86, -29),
    wikiIndex: 139,
    finished: true
  }),
  createLandmark({
    name: "にじさんじスタジアム",
    yomi: ["にじさんじすたじあむ"],
    location: new Point3(640, 64, 133),
    markerLocation: new Point(638, 136),
    wikiIndex: 140,
    finished: true
  }),
  createLandmark({
    name: "城下町ネザーゲートのある島(仮称)",
    yomi: "じょうかまちねざーげーとのあるしま",
    location: new Point3(506, 63, 319),
    markerLocation: new Point(501, 316),
    wikiIndex: 141,
    finished: true
  }),
  createLandmark({
    name: "物述有栖の家(仮)",
    yomi: "もののべありすのいえ",
    location: new Point3(-139, 63, 15),
    markerLocation: new Point(-140, 3),
    wikiIndex: 142,
    finished: true
  }),
  createLandmark({
    name: "ガーディアントラップ",
    yomi: "がーでぃあんとらっぷ",
    location: new Point3(-3830, 63, 6742),
    markerLocation: new Point(-3791, 6701),
    wikiIndex: 144,
    finished: false
  }),
  createLandmark({
    name: "タージ・マハル",
    yomi: "たーじまはる",
    location: new Point3(542, 65, 178),
    markerLocation: new Point(542, 173),
    wikiIndex: 146,
    finished: true
  }),
  createLandmark({
    name: "笹木咲の水族館(跡地)",
    yomi: "ささきさくのすいぞくかん",
    location: new Point3(371, 63, 212),
    markerLocation: new Point(362, 213),
    wikiIndex: 147,
    finished: true
  }),
  createLandmark({
    name: "学校",
    yomi: "がっこう",
    location: new Point3(-229, 71, 680),
    markerLocation: new Point(-211, 654),
    wikiIndex: 148,
    finished: false
  }),
  createLandmark({
    name: "メサの小屋（仮）",
    yomi: "めさのこや",
    location: new Point3(7971, 94, 8498),
    markerLocation: new Point(7976, 8502),
    wikiIndex: 149,
    finished: true
  }),
  createLandmark({
    name: "ネコカフェ",
    yomi: "ねこかふぇ",
    location: new Point3(352, 67, 166),
    markerLocation: new Point(357, 160),
    wikiIndex: 150,
    finished: true
  }),
  createLandmark({
    name: "愛園小屋",
    yomi: "あいぞのごや",
    location: new Point3(443, 69, 295),
    wikiIndex: 151,
    finished: false
  }),
  createLandmark({
    name: "愛園愛美の第二拠点",
    yomi: "あいぞのまなみのだいにきょてん",
    location: new Point3(-1001, 72, 1380),
    wikiIndex: 152,
    finished: false
  }),
  createLandmark({
    name: "にじさんじ一期生のお家",
    yomi: ["にじさんじいちきせいのおうち", "いちきせいはうす"],
    location: new Point3(597, 63, 302),
    markerLocation: new Point(603, 275),
    wikiIndex: 153,
    finished: true
  }),
  createLandmark({
    name: "らぶらぶ♡ホテル",
    yomi: ["lovelovehotel", "らぶらぶほてる"],
    location: new Point3(131, 63, 413),
    wikiIndex: 154,
    finished: true
  }),
  createLandmark({
    name: "風雲さんばか城",
    yomi: ["ふううんさんばかじょう", "さんばかじょう"],
    location: new Point3(-271, 94, 767),
    markerLocation: new Point(-261, 758),
    wikiIndex: 156,
    finished: true
  }),
  createLandmark({
    name: "関西",
    yomi: "かんさい",
    location: new Point3(-134, 66, -262),
    markerLocation: new Point(-143, -319),
    wikiIndex: 157,
    finished: false
  }),
  createLandmark({
    name: "あほあほハウス",
    yomi: "あほあほはうす",
    location: new Point3(101, 67, -247),
    markerLocation: new Point(92, -260),
    wikiIndex: 158,
    finished: true
  }),
  createLandmark({
    name: "UFO",
    yomi: ["ufo", "ゆーふぉー"],
    location: new Point3(160, 63, -305),
    markerLocation: new Point(160, -355),
    wikiIndex: 160,
    finished: true
  }),
  createLandmark({
    name: "森中ランド",
    yomi: "もりなからんど",
    location: new Point3(-47, 63, 507),
    markerLocation: new Point(-97, 447),
    wikiIndex: 161,
    finished: false
  }),
  createLandmark({
    name: "ハワイ",
    yomi: "はわい",
    location: new Point3(537, 63, 269),
    markerLocation: new Point(528, 260),
    wikiIndex: 162,
    finished: false
  }),
  createLandmark({
    name: "旅の井戸",
    yomi: "たびのいど",
    location: new Point3(143, 64, 50),
    markerLocation: new Point(137, 45),
    wikiIndex: 163,
    finished: true
  }),
  createLandmark({
    name: "紅ショウガハウス",
    yomi: "べにしょうがはうす",
    location: new Point3(1137, 70, 305),
    wikiIndex: 165,
    finished: false
  }),
  createLandmark({
    name: "愛のオブジェ",
    yomi: "あいのおぶじぇ",
    location: new Point3(-179, 70, 301),
    markerLocation: new Point(-176, 289),
    wikiIndex: 166,
    finished: true
  }),
  createLandmark({
    name: "雪城城",
    yomi: "ゆきしろじょう",
    location: new Point3(-351, 78, 381),
    markerLocation: new Point(-357, 374),
    wikiIndex: 168,
    finished: false
  }),
  createLandmark({
    name: "みれいハウス",
    yomi: "みれいはうす",
    location: new Point3(518, 69, 132),
    markerLocation: new Point(518, 116),
    wikiIndex: 170,
    finished: true
  }),
  createLandmark({
    name: "JK組(偽)ハウス",
    yomi: ["JKぐみはうす", "じぇーけーぐみはうす"],
    location: new Point3(-30011, 69, -20195),
    markerLocation: new Point(-30011, -20205),
    wikiIndex: 171,
    finished: true
  }),
  createLandmark({
    name: "トニー・スタークのおうち",
    yomi: "とにーすたーくのおうち",
    location: new Point3(-184, 65, 145),
    markerLocation: new Point(-200, 143),
    wikiIndex: 174,
    finished: true
  }),
  createLandmark({
    name: "お祭り会場",
    yomi: "おまつりかいじょう",
    location: new Point3(-60, 64, 17),
    wikiIndex: 180,
    finished: false
  }),
  createLandmark({
    name: "BGクラブハウス",
    yomi: ["BGくらぶはうす", "びーじーくらぶはうす"],
    location: new Point3(1219, 69, 235),
    markerLocation: new Point(1207, 217),
    wikiIndex: 184,
    finished: true
  }),
  createLandmark({
    name: "レヴィ・エリファ拠点",
    yomi: ["れゔぃえりふぁきょてん", "levieliphaきょてん"],
    location: new Point3(-72, 78, 331),
    markerLocation: new Point(-67, 325),
    wikiIndex: 185,
    finished: true
  }),
  createLandmark({
    name: "イド",
    yomi: "いど",
    location: new Point3(436, 64, 187),
    wikiIndex: 186,
    finished: false
  }),
  createLandmark({
    name: "chimakakurega",
    yomi: ["chimakakurega", "ちまかくれが"],
    location: new Point3(-107, 63, -156),
    markerLocation: new Point(-113, -215),
    wikiIndex: 187,
    finished: true
  }),
  createLandmark({
    name: "テント",
    yomi: "てんと",
    location: new Point3(-300, 69, 431),
    markerLocation: new Point(-303, 424),
    wikiIndex: 189,
    finished: true
  }),
  createLandmark({
    name: "チャイカの理想のお家",
    yomi: "ちゃいかのりそうのおうち",
    location: new Point3(8, 63, 26),
    markerLocation: new Point(8, 29),
    xOffset: 40,
    wikiIndex: 190,
    finished: false
  }),
  createLandmark({
    name: "青氷ボートレース場",
    yomi: ["せいひょうぼーとれーすじょう", "ぼーとれーすじょう"],
    location: new Point3(-4681, 63, 4796),
    markerLocation: new Point(-4603, 4777),
    wikiIndex: 191,
    finished: true
  }),
  createLandmark({
    name: "加賀美インダストリアル仮社屋",
    yomi: "かがみいんだすとりあるかりしゃおく",
    location: new Point3(57, 63, 328),
    wikiIndex: 192,
    finished: false
  }),
  createLandmark({
    name: "ぶるーずの巣",
    yomi: "ぶるーずのす",
    location: new Point3(38, 67, 302),
    markerLocation: new Point(45, 299),
    wikiIndex: 193,
    finished: false
  }),
  createLandmark({
    name: "アルスの森",
    yomi: ["あるすのもり", "arsのもり"],
    location: new Point3(555, 68, 83),
    markerLocation: new Point(555, 68),
    wikiIndex: 194,
    finished: false
  }),
  createLandmark({
    name: "ぶるーず拠点(chocolate house)",
    yomi: ["ぶるーずきょてん", "ちょこれーとはうす", "chocolatehouse"],
    location: new Point3(-193, 81, -252),
    markerLocation: new Point(-206, -262),
    wikiIndex: 195,
    finished: false
  }),
  createLandmark({
    name: "太陽",
    yomi: "たいよう",
    location: new Point3(195, 256, 5),
    markerLocation: new Point(195, -1),
    wikiIndex: 198,
    finished: true
  }),
  createLandmark({
    name: "謎の建造物",
    yomi: "なぞのけんぞうぶつ",
    location: new Point3(-962, 64, 279),
    markerLocation: new Point(-970, 252),
    wikiIndex: 199,
    finished: true
  }),
  createLandmark({
    name: "配慮ロード",
    yomi: "はいりょろーど",
    dimension: Dimension.TheNether,
    location: new Point3(19, 70, 16),
    wikiIndex: 201,
    finished: true,
    corners: [
      new Point(19, 17),
      new Point(-145, 181),
      new Point(-174, 181),
      new Point(-174, 174),
      new Point(-185, 174)
    ]
  }),
  createLandmark({
    name: "BIG WOOD HAYAMA HOUSE",
    yomi: ["bigwoodhayamahouse", "びっぐうっどはやまはうす"],
    location: new Point3(352, 63, 185),
    markerLocation: new Point(380, 178),
    wikiIndex: 203,
    finished: false
  }),
  createLandmark({
    name: "カメ観察所",
    yomi: "かめかんさつじょ",
    location: new Point3(-92, 63, -690),
    wikiIndex: 207,
    finished: true
  }),
  createLandmark({
    name: "天宮こころの家（仮）",
    yomi: "あまみやこころのいえ",
    location: new Point3(424, 74, 263),
    wikiIndex: 208,
    finished: false
  }),
  createLandmark({
    name: "ハナミズキ",
    yomi: "はなみずき",
    location: new Point3(415, 64, 159),
    markerLocation: new Point(415, 149),
    wikiIndex: 209,
    finished: true
  }),
  createLandmark({
    name: "うんち",
    yomi: "うんち",
    location: new Point3(227, 70, 19),
    markerLocation: new Point(229, 6),
    wikiIndex: 210,
    finished: true
  }),
  createLandmark({
    name: "ちとせとろあのお墓",
    yomi: ["ちとせとろあのおはか"],
    location: new Point3(458, 64, 186),
    markerLocation: new Point(481, 170),
    wikiIndex: 212,
    finished: true
  }),
  createLandmark({
    name: "白い巨トゥ",
    yomi: "しろいきょとう",
    location: new Point3(634, 63, 236),
    wikiIndex: 213,
    finished: true
  }),
  createLandmark({
    name: "雪城ロード",
    yomi: "ゆきしろろーど",
    location: new Point3(-355, 68, 73),
    wikiIndex: 214,
    finished: true,
    corners: [
      new Point(-355, 73),
      new Point(-355, 361),
      new Point(-365, 361),
      new Point(-365, 374)
    ]
  }),
  createLandmark({
    name: "小野町旅館",
    yomi: "おのまちりょかん",
    location: new Point3(-586, 63, 532),
    markerLocation: new Point(-602, 510),
    wikiIndex: 215,
    finished: false
  }),
  createLandmark({
    name: "氷マンション(仮)",
    yomi: "こおりまんしょん",
    location: new Point3(117, 63, 73),
    markerLocation: new Point(107, 73),
    wikiIndex: 216,
    finished: true
  }),
  createLandmark({
    name: "夜見れなの村",
    yomi: "よるみれなのむら",
    location: new Point3(-30385, 68, -22344),
    wikiIndex: 217,
    finished: false
  }),
  createLandmark({
    name: "山田太郎",
    yomi: "やまだたろう",
    location: new Point3(405, 134, 202),
    markerLocation: new Point(400, 198),
    wikiIndex: 218,
    finished: true
  }),
  createLandmark({
    name: "いずもるる採掘所",
    yomi: "いずもるるさいくつじょ",
    location: new Point3(415, 63, 412),
    wikiIndex: 219,
    finished: false
  }),
  createLandmark({
    name: "三枝明那の拠点",
    yomi: "さえぐさあきなのきょてん",
    location: new Point3(33, 67, -132),
    wikiIndex: 221,
    finished: false
  }),
  createLandmark({
    name: "葉加瀬冬雪の研究所",
    yomi: "はかせふゆきのけんきゅうじょ",
    location: new Point3(-363, 70, 120),
    markerLocation: new Point(-355, 124),
    wikiIndex: 222,
    finished: false
  }),
  createLandmark({
    name: "ニュイ・ソシエールの家（仮）",
    yomi: "にゅいそしえーるのいえ",
    location: new Point3(326, 69, 266),
    markerLocation: new Point(332, 228),
    wikiIndex: 223,
    finished: false
  }),
  createLandmark({
    name: "ラトナ・プティの家(仮)",
    yomi: ["らとなぷてぃのいえ", "ratnapetitのいえ"],
    location: new Point3(455, 63, 344),
    wikiIndex: 224,
    finished: true
  }),
  createLandmark({
    name: "夜見の家（本荘）",
    yomi: "よるみのいえ",
    location: new Point3(654, 64, 14),
    markerLocation: new Point(667, 6),
    wikiIndex: 225,
    finished: false
  }),
  createLandmark({
    name: "ぷりん",
    yomi: "ぷりん",
    location: new Point3(-182, 76, -278),
    markerLocation: new Point(-227, -328),
    wikiIndex: 227,
    finished: false
  }),
  createLandmark({
    name: "暗黒城(仮)",
    yomi: "あんこくじょう",
    location: new Point3(-4973, 70, 4915),
    markerLocation: new Point(-4964, 4917),
    wikiIndex: 228,
    finished: false
  }),
  createLandmark({
    name: "月",
    yomi: "つき",
    location: new Point3(137, 216, 60),
    markerLocation: new Point(137, 52),
    wikiIndex: 229,
    finished: true
  }),
  createLandmark({
    name: "小野町村",
    yomi: "おのまちむら",
    location: new Point3(-28179, 70, -19892),
    wikiIndex: 233,
    finished: false
  }),
  createLandmark({
    name: "エリー・コニファーの家（仮）",
    yomi: "えりーこにふぁーのいえ",
    location: new Point3(429, 69, 301),
    wikiIndex: 235,
    finished: true
  }),
  createLandmark({
    name: "出雲霞《case:01》のお墓",
    yomi: "いーちゃんのおはか",
    location: new Point3(480, 63, 5),
    wikiIndex: 236,
    finished: true
  }),
  createLandmark({
    name: "ンボザウルスの化石",
    yomi: "んぼざうるすのかせき",
    location: new Point3(-4961, 48.5, 4940),
    wikiIndex: 238,
    finished: true
  }),
  createLandmark({
    name: "謎の建造物(兎)",
    yomi: "なぞのけんぞうぶつ",
    location: new Point3(-920, 64, -1496),
    markerLocation: new Point(-928, -1502),
    wikiIndex: 239,
    finished: true
  }),
  createLandmark({
    name: "猫ハウス",
    yomi: ["ねこはうす", "ねこhouse"],
    location: new Point3(526, 63, 154),
    wikiIndex: 240,
    finished: false
  }),
  createLandmark({
    name: "山田太郎のおうち",
    yomi: "やまだたろうのおうち",
    location: new Point3(198, 72, -120),
    markerLocation: new Point(199, -131),
    wikiIndex: 241,
    finished: true
  }),
  createLandmark({
    name: "デイビット",
    yomi: ["でいびっと", "david"],
    location: new Point3(409, 71, 213),
    wikiIndex: 244,
    finished: false
  }),
  createLandmark({
    name: "高層マンション",
    yomi: "こうそうまんしょん",
    location: new Point3(-99, 63, -80),
    markerLocation: new Point(-99, -102),
    wikiIndex: 248,
    finished: false
  }),
  createLandmark({
    name: "タワー型ポテト農園",
    yomi: ["たわーがたぽてとのうえん", "ぽてとのうえん"],
    location: new Point3(-122, 67, -55),
    wikiIndex: 250,
    finished: true
  }),
  createLandmark({
    name: "デートスポット",
    yomi: ["でーとすぽっと", "datingspot"],
    location: new Point3(-186, 63, 684),
    markerLocation: new Point(-48, 716),
    wikiIndex: 251,
    finished: false
  }),
  createLandmark({
    name: "スノードーム",
    yomi: ["すのーどーむ", "snowdome", "dome"],
    location: new Point3(-1378, 67, 1410),
    markerLocation: new Point(-1377, 1347),
    wikiIndex: 252,
    finished: true
  }),
  createLandmark({
    name: "夜見の家(地下)",
    yomi: "よるみのいえちか",
    location: new Point3(310, 63, 252),
    wikiIndex: 254,
    finished: false
  }),
  createLandmark({
    name: "巨大な鏡餅(プティ餅)",
    yomi: ["きょだいなかがみもち", "ぷてぃもち"],
    location: new Point3(384, 69, 398),
    wikiIndex: 255,
    finished: true
  }),
  createLandmark({
    name: "紅白饅頭ハウス",
    yomi: "こうはくまんじゅうはうす",
    location: new Point3(-192, 81, 390),
    markerLocation: new Point(-176, 383),
    wikiIndex: 256,
    finished: true
  }),
  createLandmark({
    name: "しずくしま神社駅",
    yomi: "しずくしまじんじゃえき",
    location: new Point3(787, 68, 40),
    markerLocation: new Point(787, 34),
    wikiIndex: 258,
    finished: true
  }),
  createLandmark({
    name: "星川サラの家",
    yomi: "ほしかわさらのいえ",
    location: new Point3(-61, 70, -194),
    wikiIndex: 260,
    finished: false
  }),
  createLandmark({
    name: "はかせと魔使の幸福理論協会",
    yomi: "はかせとまつかいのこうふくりろんきょうかい",
    location: new Point3(-209, 67, 509),
    markerLocation: new Point(-249, 502),
    wikiIndex: 263,
    finished: true
  }),
  createLandmark({
    name: "お花のお城",
    yomi: "おはなのおしろ",
    location: new Point3(338, 63, 375),
    markerLocation: new Point(278, 362),
    wikiIndex: 264,
    finished: false
  }),
  createLandmark({
    name: "ぷてうぉっち",
    yomi: "ぷてうぉっち",
    location: new Point3(-202, 65, 524),
    markerLocation: new Point(-201, 519),
    wikiIndex: 265,
    finished: false
  }),
  createLandmark({
    name: "狂犬ズハウス第2",
    yomi: "きょうけんずはうすだいに",
    location: new Point3(143, 105, -722),
    markerLocation: new Point(136, -760),
    wikiIndex: 266,
    finished: false
  }),
  createLandmark({
    name: "ねこ島",
    yomi: ["ねこしま", "ねこじま", "ねことう"],
    location: new Point3(486, 63, -688),
    wikiIndex: 274,
    finished: false
  }),
  createLandmark({
    name: "全ブロックピラミッド",
    yomi: "ぜんぶろっくぴらみっど",
    location: new Point3(-165, 78, -221),
    markerLocation: new Point(-177, -231),
    wikiIndex: 277,
    finished: true
  }),
  createLandmark({
    name: "道の駅『みんなの湯』",
    yomi: "みちのえきみんなのゆ",
    location: new Point3(153, 66, 63),
    markerLocation: new Point(159, 60),
    wikiIndex: 278,
    finished: true
  }),
  createLandmark({
    name: "boku no ie yoteiti",
    yomi: "bokunoieyoteiti",
    location: new Point3(452, 63, 453),
    wikiIndex: 285,
    finished: true
  }),
  createLandmark({
    name: "魔使マオの家",
    yomi: "まつかいまおのいえ",
    location: new Point3(187, 70, 156),
    wikiIndex: 287,
    finished: true
  }),
  createLandmark({
    name: "オスガール城",
    yomi: "おすがーるじょう",
    location: new Point3(-302, 76, 257),
    markerLocation: new Point(-313, 247),
    wikiIndex: 291,
    finished: false
  }),
  createLandmark({
    name: "巨大オスガール像「自由のグウェル」",
    yomi: ["きょだいおすがーるじょう", "じゆうのぐうぇる"],
    location: new Point3(309, 63, -86),
    markerLocation: new Point(323, -147),
    wikiIndex: 292,
    finished: true
  }),

  // にじさんじランド
  createLandmark({
    name: "陽キャ池",
    yomi: "ようきゃいけ",
    location: new Point3(-1490, 70, 1422),
    markerLocation: new Point(-1490, 1410),
    finished: true
  }),
  createLandmark({
    name: "入場ゲート",
    yomi: "にゅうじょうげーと",
    location: new Point3(-1478, 70, 1435),
    finished: true
  }),
  createLandmark({
    name: "イッツアしいなワールド！",
    yomi: "いっつあしいなわーるど",
    location: new Point3(-1466, 70, 1450),
    markerLocation: new Point(-1452, 1434),
    finished: true
  }),
  createLandmark({
    name: "アラジンシアター",
    yomi: "あらじんしあたー",
    location: new Point3(-1458, 70, 1487),
    markerLocation: new Point(-1451, 1474),
    finished: false
  }),
  createLandmark({
    name: "チュロス",
    yomi: "ちゅろす",
    location: new Point3(-1464, 70, 1474),
    finished: false
  }),
  createLandmark({
    name: "チュロスワゴン",
    yomi: "ちゅろすわごん",
    location: new Point3(-1471, 70, 1501),
    markerLocation: new Point(-1468, 1497),
    finished: true
  }),
  createLandmark({
    name: "ンッディ",
    yomi: "んっでぃ",
    location: new Point3(-1486, 70, 1491),
    finished: true
  }),
  createLandmark({
    name: "プ○さんのハニーハ○ト",
    yomi: "ぷーさんのはにーはんと",
    location: new Point3(-1517, 70, 1487),
    finished: true
  }),
  createLandmark({
    name: "ビッグサンボーマウンテン",
    yomi: ["びっぐさんぼーまうんてん", "bigsanbo-mountain"],
    location: new Point3(-1612, 63, 1496),
    markerLocation: new Point(-1642, 1469),
    finished: true
  }),
  createLandmark({
    name: "にじさんじ城",
    yomi: "にじさんじじょう",
    location: new Point3(-1517, 70, 1429),
    markerLocation: new Point(-1564, 1385),
    finished: false
  }),
  createLandmark({
    name: "空飛ぶゾウ",
    yomi: "そらとぶぞう",
    location: new Point3(-1546, 70, 1377),
    markerLocation: new Point(-1566, 1359),
    finished: true
  }),
  createLandmark({
    name: "タワ一オブテラ一",
    yomi: ["たわいちおぶてらいち", "たわーおぶてらー", "towerofteller"],
    location: new Point3(-1593, 63, 1352),
    markerLocation: new Point(-1603, 1339),
    finished: true
  }),
  createLandmark({
    name: "カ○ブの海賊",
    yomi: "かりぶのかいぞく",
    location: new Point3(-1554, 70, 1353),
    markerLocation: new Point(-1564, 1306),
    finished: false
  }),
  createLandmark({
    name: "水山",
    yomi: ["みずやま", "すぷらっしゅまうんてん", "splashmountain"],
    location: new Point3(-1507, 64, 1337),
    markerLocation: new Point(-1495, 1308),
    finished: false
  }),
  createLandmark({
    name: "レストラン",
    yomi: ["れすとらん", "restaurant"],
    location: new Point3(-1522, 70, 1400),
    markerLocation: new Point(-1520, 1373),
    finished: true
  }),
  createLandmark({
    name: "火山コースター",
    yomi: "かざんこーすたー",
    location: new Point3(-1641, 63, 1411),
    markerLocation: new Point(-1651, 1408),
    finished: false
  }),
  createLandmark({
    name: "ケープ○ッドクッ○オフ",
    yomi: "けーぷこっどくっくおふ",
    location: new Point3(-1553, 70, 1505),
    markerLocation: new Point(-1566, 1497),
    finished: true
  }),
  createLandmark({
    name: "メリーゴーランド",
    yomi: ["めりーごーらんど", "merrygoround"],
    location: new Point3(-1534, 63, 1287),
    markerLocation: new Point(-1534, 1267),
    finished: true
  }),
  createLandmark({
    name: "石塔駅(北東)",
    yomi: "せきとうえきほくとう",
    location: new Point3(-1426, 64, 1372),
    markerLocation: new Point(-1426, 1355),
    finished: true
  }),
  createLandmark({
    name: "石塔駅(西)",
    yomi: "せきとうえきにし",
    location: new Point3(-1690, 63, 1399),
    markerLocation: new Point(-1701, 1391),
    finished: true
  }),
  createLandmark({
    name: "石塔駅(南)",
    yomi: "せきとうえきみなみ",
    location: new Point3(-1548, 65, 1519),
    finished: true
  }),
  createLandmark({
    name: "帆船",
    yomi: "はんせん",
    location: new Point3(-1616, 145, 1460),
    markerLocation: new Point(-1618, 1425),
    finished: false
  }),
  createLandmark({
    name: "二匹のリスの家",
    yomi: "にひきのりすのいえ",
    location: new Point3(-1534, 70, 1484),
    markerLocation: new Point(-1541, 1469),
    finished: false
  }),

  // 以下 wiki に無い建築物

  createLandmark({
    name: "弓道場",
    yomi: "きゅうどうじょう",
    location: new Point3(106, 68, -149),
    markerLocation: new Point(107, -203),
    xOffset: 20,
    finished: true
  }),
  createLandmark({
    name: "ド葛本社",
    yomi: "どくずほんしゃ",
    location: new Point3(382, 63, 46),
    markerLocation: new Point(367, 37),
    finished: true
  }),
  createLandmark({
    name: "セーフハウス",
    yomi: ["せーふはうす", "safehouse"],
    location: new Point3(-172, 65, 16),
    markerLocation: new Point(-171, 8),
    finished: true
  }),
  createLandmark({
    name: "鈴谷アキの仮拠点",
    yomi: "すずやあきのかりきょてん",
    location: new Point3(-266, 76, 217),
    markerLocation: new Point(-270, 211),
    finished: true
  }),
  createLandmark({
    name: "キリトの剣取らないで",
    yomi: "きりとのけんとらないで",
    location: new Point3(-467, 73, 543),
    markerLocation: new Point(-465, 540),
    finished: true
  }),
  createLandmark({
    name: "アパホテル",
    yomi: ["あぱほてる", "apahotel"],
    location: new Point3(-30023, 69, -20170),
    markerLocation: new Point(-30023, -20188),
    finished: true
  }),
  createLandmark({
    name: "舞元さん化石耐久配信現場",
    yomi: "まいもとさんかせきたいきゅうはいしんげんば",
    location: new Point3(-383, 40, -504),
    finished: false
  }),
  createLandmark({
    name: "葛葉さん遭難跡地",
    yomi: "くずはさんそうなんあとち",
    location: new Point3(-298, 44, 1076),
    markerLocation: new Point(-298, 1071),
    finished: true
  }),
  createLandmark({
    name: "ベルさん海底神殿攻略拠点",
    yomi: "べるさんかいていしんでんこうりゃくきょてん",
    location: new Point3(597, 75, 7875),
    markerLocation: new Point(591, 7863),
    finished: true
  }),
  createLandmark({
    name: "静凛サンゴ礁仮拠点",
    yomi: "しずかりんさんごしょうかりきょてん",
    location: new Point3(0, 64, 5418),
    markerLocation: new Point(0, 5411),
    finished: true
  }),
  createLandmark({
    name: "エンド要塞(静凛)",
    yomi: "えんどようさいしずかりん",
    location: new Point3(5870, 43, 5746),
    finished: true
  }),
  createLandmark({
    name: "骨バイオーム",
    yomi: "ほねばいおーむ",
    location: new Point3(24, 69, 190),
    markerLocation: new Point(20, 176),
    finished: false
  }),
  createLandmark({
    name: "液",
    yomi: "えき",
    location: new Point3(253, 70, 309),
    markerLocation: new Point(253, 301),
    finished: true
  }),
  createLandmark({
    name: "うい覇道",
    yomi: "ういはどう",
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
    finished: true
  }),
  createLandmark({
    name: "神田ロード",
    yomi: "かんだろーど",
    location: new Point3(8, 65.5, 428),
    markerLocation: new Point(13, 389),
    finished: false,
    xOffset: 100
  }),
  createLandmark({
    name: "矢車監視事務局",
    yomi: "やぐるまかんしじむきょく",
    location: new Point3(187, 72, 318),
    markerLocation: new Point(187, 319),
    finished: true,
    xOffset: 60
  }),
  createLandmark({
    name: "シスター・クレアの仮家",
    yomi: "しすたーくれあのかりいえ",
    location: new Point3(340, 67, 112),
    markerLocation: new Point(344, 95),
    finished: true
  }),
  createLandmark({
    name: "いちごの仮拠点",
    yomi: "いちごのかりきょてん",
    location: new Point3(1025, 67, 1416),
    finished: true
  }),
  createLandmark({
    name: "仮拠点(シスタークレア,20190422)",
    yomi: "かりきょてん",
    location: new Point3(-2365, 63, 2287),
    markerLocation: new Point(-2368, 2263),
    finished: true
  }),
  createLandmark({
    name: "避難所(シスタークレア,20190814)",
    yomi: "ひなんじょ",
    location: new Point3(1427, 62, -164),
    finished: true
  }),
  createLandmark({
    name: "HELP",
    yomi: ["へるぷ", "help"],
    location: new Point3(-1735, 69, 1096),
    markerLocation: new Point(-1746, 1076),
    finished: true
  }),
  createLandmark({
    name: "いちごが発見した村",
    yomi: "いちごがはっけんしたむら",
    location: new Point3(2305, 64, -1791),
    finished: true
  }),
  createLandmark({
    name: "いちごと緑仙が発見した村",
    yomi: "いちごとりゅーしぇんがはっけんしたむら",
    location: new Point3(2577, 71, -3439),
    finished: true
  }),
  createLandmark({
    name: "いちごが発見した村",
    yomi: "いちごがはっけんしたむら",
    location: new Point3(2193, 63, -2903),
    finished: true
  }),
  createLandmark({
    name: "いちごが発見したピラミッド",
    yomi: "いちごがはっけんしたぴらみっど",
    location: new Point3(2154, 65, -2688),
    finished: true
  }),
  createLandmark({
    name: "いちごが発見した村",
    yomi: "いちごがはっけんしたむら",
    location: new Point3(2113, 69, -2511),
    finished: true
  }),
  createLandmark({
    name: "クレアが発見した村",
    yomi: "くれあがはっけんしたむら",
    location: new Point3(1825, 68, -1343),
    finished: false
  }),
  createLandmark({
    name: "スライムカフェ",
    yomi: "すらいむかふぇ",
    location: new Point3(2160, 66, -1653),
    finished: false
  }),
  createLandmark({
    name: "しばハウス3",
    yomi: "しばはうす3",
    location: new Point3(-146, 69, -55),
    markerLocation: new Point(-154, -66),
    finished: true
  }),
  createLandmark({
    name: "採掘入口",
    yomi: "さいくついりぐち",
    location: new Point3(338, 62, 469),
    finished: true
  }),
  createLandmark({
    name: "閉鎖中",
    yomi: "へいさちゅう",
    location: new Point3(353, 63, 557),
    finished: false
  }),
  createLandmark({
    name: "第一隠れ家(跡地)",
    yomi: "だいいちかくれがあとち",
    location: new Point3(324, 63, 278),
    markerLocation: new Point(322, 272),
    finished: true
  }),
  createLandmark({
    name: "ゆきしろBOX",
    yomi: ["ゆきしろぼっくす", "ゆきしろbox"],
    location: new Point3(-30193, 63, -20153),
    finished: false
  }),
  createLandmark({
    name: "夕陽リリの塔跡地",
    yomi: "ゆうひりりのとうあとち",
    location: new Point3(-570, 80, 456),
    finished: true
  }),
  createLandmark({
    name: "炭鉱入口",
    yomi: "たんこういりぐち",
    location: new Point3(753, 63, 682),
    finished: true
  }),
  createLandmark({
    name: "誰かの犬",
    yomi: "だれかのいぬ",
    location: new Point3(246, 63, 565),
    finished: true
  }),
  createLandmark({
    name: "エンド要塞(桜凛月)",
    yomi: "えんどようさいさくらりつき",
    location: new Point3(-3625, 28, 3862),
    finished: false
  }),
  createLandmark({
    name: "メサ",
    yomi: "めさ",
    dimension: Dimension.TheNether,
    location: new Point3(970, 83, 1072),
    finished: true
  }),
  createLandmark({
    name: "誰かの拠点",
    yomi: "だれかのきょてん",
    location: new Point3(-257, 63, 992),
    finished: true
  }),
  createLandmark({
    name: "森の羊羹",
    yomi: "もりのようかん",
    dimension: Dimension.TheNether,
    location: new Point3(550, 39, 681),
    finished: false
  }),
  createLandmark({
    name: "静凛の村",
    yomi: "しずかりんのむら",
    dimension: Dimension.TheNether,
    location: new Point3(202, 51, 43),
    finished: true
  }),
  createLandmark({
    name: "静凛の本拠地",
    yomi: "しずかりんのほんきょち",
    dimension: Dimension.TheNether,
    location: new Point3(109, 86, 14),
    finished: true
  }),
  createLandmark({
    name: "一期生ハウス",
    yomi: "いちきせいはうす",
    dimension: Dimension.TheNether,
    location: new Point3(64, 63, 38),
    finished: true
  }),
  createLandmark({
    name: "にじさんじランド",
    yomi: ["にじさんじらんど", "にじさんじland", "land"],
    dimension: Dimension.TheNether,
    location: new Point3(-185, 49, 173),
    finished: true
  }),
  createLandmark({
    name: "いちご大墳墓",
    yomi: "いちごだいふんぼ",
    dimension: Dimension.TheNether,
    location: new Point3(28, 55, 75),
    finished: true
  }),
  createLandmark({
    name: "風雲さんばか城",
    yomi: ["ふううんさんばかじょう", "さんばかじょう"],
    dimension: Dimension.TheNether,
    location: new Point3(-42, 68, 94),
    finished: true
  }),
  createLandmark({
    name: "ネザー要塞(ドラひま)",
    yomi: "ねざーようさいどらひま",
    dimension: Dimension.TheNether,
    location: new Point3(273, 38, 596),
    finished: true
  }),
  createLandmark({
    name: "ネザー要塞(ドラひま)",
    yomi: "ねざーようさいどらひま",
    location: new Point3(2161, 54, 4748),
    finished: true
  }),
  createLandmark({
    name: "夢幻炭鉱",
    yomi: "むげんたんこう",
    dimension: Dimension.TheNether,
    location: new Point3(-23, 46, 29),
    finished: false
  }),
  createLandmark({
    name: "メサ(ベルさん)",
    yomi: "めさ",
    location: new Point3(2901, 69, 11925),
    finished: true
  }),
  createLandmark({
    name: "メサ(ベルさん)",
    yomi: "めさ",
    dimension: Dimension.TheNether,
    location: new Point3(359, 75, 1497),
    finished: false
  }),
  createLandmark({
    name: "キツネ小屋(ベルさん)",
    yomi: "きつねごや",
    location: new Point3(3033, 65, 8627),
    finished: true
  }),
  createLandmark({
    name: "キツネ小屋(ベルさん)",
    yomi: "きつねごや",
    dimension: Dimension.TheNether,
    location: new Point3(377, 75, 1082),
    finished: false
  }),
  createLandmark({
    name: "モルルの領土",
    yomi: "もるるのりょうど",
    location: new Point3(-641, 63, -190),
    markerLocation: new Point(-660, -224),
    finished: false
  }),
  createLandmark({
    name: "誰かのチェスト",
    yomi: "だれかのちぇすと",
    location: new Point3(87, 64, 1109),
    finished: true
  }),
  createLandmark({
    name: "SMC組採掘拠点",
    yomi: ["すめしぐみさいくつきょてん", "smcぐみさいくつきょてん"],
    location: new Point3(-197, 63, 1277),
    finished: false
  }),
  createLandmark({
    name: "夜見れなの村",
    yomi: "よるみれなのむら",
    dimension: Dimension.TheNether,
    location: new Point3(-3797, 67, -2810),
    finished: true
  }),
  createLandmark({
    name: "UFO",
    yomi: ["ufo", "ゆーふぉー"],
    dimension: Dimension.TheNether,
    location: new Point3(20, 78, -53),
    finished: true
  }),
  createLandmark({
    name: "線路のある謎の地下空間",
    yomi: "せんろのあるなぞのちかくうかん",
    location: new Point3(399, 44, 306),
    finished: false
  }),
  createLandmark({
    name: "ミトとカエデの像",
    yomi: "みととかえでのぞう",
    location: new Point3(-1349, 67, 1440),
    finished: false
  }),
  createLandmark({
    name: "ベルさんの仮拠点",
    yomi: "べるさんのかりきょてん",
    location: new Point3(-194, 67, 808),
    finished: false
  }),
  createLandmark({
    name: "アンジュんち",
    yomi: ["あんじゅんち", "angeんち"],
    location: new Point3(-262, 79, 583),
    markerLocation: new Point(-268, 576),
    finished: false
  }),
  createLandmark({
    name: "ランド建設業者に襲撃された村",
    yomi: "らんどけんせつぎょうしゃにしゅうげきされたむら",
    location: new Point3(1090, 66, 2754),
    markerLocation: new Point(1103, 2727),
    finished: false
  }),
  createLandmark({
    name: "戌亥とこの仮拠点",
    yomi: "いぬいとこのかりきょてん",
    location: new Point3(-30063, 84, -20884),
    finished: true
  }),
  createLandmark({
    name: "アクアライン",
    yomi: ["あくあらいん", "aqualine"],
    location: new Point3(594, 63, 17),
    markerLocation: new Point(594, -386),
    corners: [new Point(594, 17), new Point(594, -710), new Point(577, -710)],
    finished: true
  }),
  createLandmark({
    name: "夜見監視塔(鳩時計)",
    yomi: ["はとどけい", "よるみかんしとう"],
    location: new Point3(234, 69, 143),
    markerLocation: new Point(251, 130),
    finished: true
  }),
  createLandmark({
    name: "SOS",
    yomi: ["sos", "えすおーえす", "505"],
    location: new Point3(-29159, 67, -19776),
    finished: true
  }),
  createLandmark({
    name: "夜見ロード",
    yomi: "よるみろーど",
    dimension: Dimension.TheNether,
    location: new Point3(-3796, 67, -2805),
    corners: [
      new Point(-3796, -2805),
      new Point(-3796, -2585),
      new Point(-3758, -2585),
      new Point(-3758, -2572),
      new Point(-3756, -2572),
      new Point(-3756, -2519)
    ],
    finished: true
  }),
  createLandmark({
    name: "誰かの作業台",
    yomi: "だれかのさぎょうだい",
    location: new Point3(684, 65, 677),
    finished: true
  }),
  createLandmark({
    name: "誰かの作業台",
    yomi: "だれかのさぎょうだい",
    location: new Point3(-1207, 64, 1541),
    finished: true
  }),
  createLandmark({
    name: "桜神社",
    yomi: "さくらじんじゃ",
    location: new Point3(-4664, 63, 4881),
    markerLocation: new Point(-4632, 4859),
    finished: false
  }),
  createLandmark({
    name: "加賀美ハヤトの仮拠点",
    yomi: "かがみはやとのかりきょてん",
    location: new Point3(601, 100, 881),
    markerLocation: new Point(599, 867),
    finished: false
  }),
  createLandmark({
    name: "ドレイクぬいぐるみもしくはタイトーステーション",
    yomi: "どれいくぬいぐるみもしくはたいとーすてーしょん",
    location: new Point3(460, 63, -1),
    markerLocation: new Point(452, -13),
    finished: true
  }),
  createLandmark({
    name: "早瀬走の別荘",
    yomi: "はやせそうのべっそう",
    location: new Point3(-192, 63, -133),
    markerLocation: new Point(-198, -152),
    finished: false
  }),
  createLandmark({
    name: "まななつの拠点",
    yomi: "まななつのきょてん",
    location: new Point3(-1041, 64, 1693),
    markerLocation: new Point(-1043, 1674),
    finished: false
  }),
  createLandmark({
    name: "事故物件",
    yomi: "じこぶっけん",
    location: new Point3(18, 69, -445),
    markerLocation: new Point(19, -463),
    finished: true
  }),
  createLandmark({
    name: "ドラウンド湧き槽",
    yomi: "どらうんどわきそう",
    location: new Point3(-40, 63, -337),
    markerLocation: new Point(-30, -358),
    finished: true
  }),
  createLandmark({
    name: "ハニートラップ♡",
    yomi: "はにーとらっぷ",
    location: new Point3(-248, 71, 422),
    finished: false
  }),
  createLandmark({
    name: "雪城眞尋の初期拠点",
    yomi: "ゆきしろまひろのしょききょてん",
    location: new Point3(-582, 67, -324),
    finished: true
  }),
  createLandmark({
    name: "誰かの仮拠点",
    yomi: "だれかのかりきょてん",
    location: new Point3(755, 73, 319),
    finished: true
  }),

  // 沈没船
  createLandmark({
    name: "沈没船(アルスさん)",
    yomi: "ちんぼつせん",
    location: new Point3(3400, 64, 3132),
    finished: false
  }),

  // ネザーゲート(overworld)
  createLandmark({
    name: "ネザーゲート(1437,-141)",
    yomi: "ねざーげーと",
    location: new Point3(1437, 69, -141),
    finished: true
  }),
  createLandmark({
    name: "ネザーゲート(パンダ運搬用)",
    yomi: "ねざーげーと",
    location: new Point3(-12223, 64, -8011),
    finished: true
  }),
  createLandmark({
    name: "ネザーゲート(2717,-3906)",
    yomi: "ねざーげーと",
    location: new Point3(2717, 63, -3906),
    finished: true
  }),
  createLandmark({
    name: "ネザーゲート(メサ)",
    yomi: "ねざーげーと",
    location: new Point3(7822, 85, 8715),
    finished: true
  }),
  createLandmark({
    name: "ネザーゲート(キノコバイオーム)",
    yomi: "ねざーげーと",
    location: new Point3(-28710, 75, -19221),
    finished: true
  }),
  createLandmark({
    name: "ネザーゲート(新天地メサ)",
    yomi: ["ねざーげーと", "nethergate"],
    location: new Point3(-30021, 63, -23940),
    finished: false
  }),
  createLandmark({
    name: "夜見ゲート",
    yomi: "よるみげーと",
    location: new Point3(-249, 70, 291),
    finished: true
  }),

  // ネザーゲート(nether)
  createLandmark({
    name: "旅の井戸(新天地側)ネザーゲート",
    yomi: "たびのいどしんてんちがわねざーげーと",
    dimension: Dimension.TheNether,
    location: new Point3(-3756, 58, -2516),
    finished: false
  }),
  createLandmark({
    name: "新天地キノコバイオーム)",
    yomi: "しんてんちきのこばいおーむ",
    dimension: Dimension.TheNether,
    location: new Point3(-3586, 77, -2407),
    finished: false
  }),
  createLandmark({
    name: "小野町村",
    yomi: "おのまちむら",
    dimension: Dimension.TheNether,
    location: new Point3(-3534, 73, -2471),
    finished: false
  }),
  createLandmark({
    name: "夜見ゲート",
    yomi: "よるみげーと",
    dimension: Dimension.TheNether,
    location: new Point3(-39, 82, 27),
    finished: true
  }),
  createLandmark({
    name: "小野町旅館の離れ",
    yomi: "おのまちりょかんのはなれ",
    dimension: Dimension.TheNether,
    location: new Point3(-22, 68, 45),
    finished: false
  }),
  createLandmark({
    name: "小野町旅館",
    yomi: "おのまちりょかん",
    dimension: Dimension.TheNether,
    location: new Point3(-70, 67, 65),
    finished: true
  }),

  // 前哨基地
  createLandmark({
    name: "前哨基地(花畑さん)",
    yomi: "ぜんしょうきち",
    location: new Point3(28535, 64, 1232),
    finished: false
  }),

  // エンドシティ
  createLandmark({
    name: "エンドシティ(叶さん)",
    yomi: "えんどしてぃ",
    dimension: Dimension.TheEnd,
    location: new Point3(2291, 58, 30),
    finished: false
  }),
  createLandmark({
    name: "エンドシティ(花畑さん)",
    yomi: "えんどしてぃ",
    dimension: Dimension.TheEnd,
    location: new Point3(-2188, 62, 31),
    finished: false
  }),
  createLandmark({
    name: "エンドシティ(夜見②)",
    yomi: "えんどしてぃ",
    dimension: Dimension.TheEnd,
    location: new Point3(2629, 61, 1963),
    finished: false
  }),
  createLandmark({
    name: "エンドシティ(夜見さん)",
    yomi: "えんどしてぃ",
    dimension: Dimension.TheEnd,
    location: new Point3(2311, 63, 1967),
    finished: false
  })
].sort((a, b) => {
  if (a.markerLocation.z == b.markerLocation.z) {
    return a.markerLocation.x - b.markerLocation.z;
  } else {
    return a.markerLocation.z - b.markerLocation.z;
  }
});

type Railway = { name: string; corners: Point[]; dimension: Dimension };

const kRailways: Railway[] = [
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
    ],
    dimension: Dimension.Overworld
  },
  {
    name: "叶さんの通路",
    corners: [
      new Point(103, 0),
      new Point(1109, 0),
      new Point(1109, 17),
      new Point(1507, -111),
      new Point(1546, -111),
      new Point(1580, -94),
      new Point(1625, -94),
      new Point(1625, -82),
      new Point(1634, -82),
      new Point(2032, -88),
      new Point(2154, -88),
      new Point(2240, -35),
      new Point(2240, 21),
      new Point(2251, 21),
      new Point(2251, 33)
    ],
    dimension: Dimension.TheEnd
  },
  {
    name: "ベルさんの通路",
    corners: [
      new Point(56, 45),
      new Point(56, 1013),
      new Point(106, 1068),
      new Point(106, 1087),
      new Point(207, 1087),
      new Point(207, 1110)
    ],
    dimension: Dimension.TheEnd
  },
  {
    name: "静凛のネザー鉄道",
    corners: [
      new Point(21, -14),
      new Point(21, 14),
      new Point(118, 14),
      new Point(118, 12),
      new Point(192, 12),
      new Point(192, 46),
      new Point(191, 46) // 羊羹へ
    ],
    dimension: Dimension.TheNether
  },
  {
    name: "静凛ネザー鉄道(仮)",
    corners: [
      new Point(323, 603), // 要塞(ドラひま) ここから先ができていない
      new Point(323, 131) // ここから羊羹側ができていない
    ],
    dimension: Dimension.TheNether
  },
  {
    name: "静凛ネザー鉄道(仮)",
    corners: [
      new Point(544, 682) // 羊羹側始点
    ],
    dimension: Dimension.TheNether
  },
  {
    name: "どらひま要塞への通路",
    corners: [
      new Point(273, 615), // 要塞
      new Point(273, 248),
      new Point(299, 248),
      new Point(299, 164) // ここから拠点側がまだ
    ],
    dimension: Dimension.TheNether
  },
  {
    name: "宇志海いちごのネザー鉄道",
    corners: [
      new Point(55, 83), // 始点
      new Point(330, 83), // 分岐
      new Point(330, -485),
      new Point(347, -483) // 要塞
    ],
    dimension: Dimension.TheNether
  },
  {
    name: "静凛のエンド通路",
    corners: [
      new Point(1375, -247),
      new Point(1375, -329),
      new Point(1369, -390),
      new Point(1369, -473),
      new Point(1357, -473),
      new Point(1221, -764),
      new Point(1221, -847),
      new Point(1217, -943),
      new Point(1183, -943),
      new Point(1196, -1168),
      new Point(1236, -1168),
      new Point(1236, -1232),
      new Point(1212, -1307),
      new Point(1212, -1358),
      new Point(1115, -1390),
      new Point(1082, -1390),
      new Point(958, -1605),
      new Point(972, -1605)
    ],
    dimension: Dimension.TheEnd
  }
];

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

export const kLandmarksTopLeft: Map<Dimension, Point> = new Map();
export const kLandmarksRightBottom: Map<Dimension, Point> = new Map();
[Dimension.Overworld, Dimension.TheNether, Dimension.TheEnd].forEach(
  dimension => {
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
    kLandmarksTopLeft.set(dimension, new Point(minX, minZ));
    kLandmarksRightBottom.set(dimension, new Point(maxX, maxZ));
  }
);

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
  if (argv[0] === "mca2png") {
    const railways = [...kRailways];
    kLandmarks.forEach(landmark => {
      console.log(
        `${landmark.dimension}\t${landmark.markerLocation.x}\t${landmark.markerLocation.z}`
      );
      if (landmark.corners) {
        railways.push({
          name: landmark.name,
          dimension: landmark.dimension,
          corners: landmark.corners
        });
      }
    });
    railways.forEach(railway => {
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
  } else if (argv[0] === "server") {
    const worldUIDOverworld = argv[1];
    const worldUIDNether = argv[2];
    const worldUIDTheEnd = argv[3];
    kLandmarks.forEach(landmark => {
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
