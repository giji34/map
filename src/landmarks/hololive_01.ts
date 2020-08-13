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
    finished: true,
  }),
  make({
    name: "しけ村",
    yomi: "しけむら",
    location: new Point3(356, 64, -304),
    markerLocation: new Point(366, -406),
    wikiIndex: 3,
    finished: true,
  }),
  make({
    name: "仮海賊船",
    yomi: "かりかいぞくせん",
    location: new Point3(206, 68, -254),
    markerLocation: new Point(199, -262),
    wikiIndex: 4,
    finished: true,
  }),
  make({
    name: "湊あくあの家",
    yomi: "みなとあくあのいえ",
    location: new Point3(300, 69, -255),
    markerLocation: new Point(301, -247),
    wikiIndex: 5,
    finished: true,
  }),
  make({
    name: "紫シオンの家",
    yomi: "むらさきしおんのいえ",
    location: new Point3(288, 69, -275),
    wikiIndex: 6,
    finished: true,
  }),
  make({
    name: "不知火フレアの家",
    yomi: "しらぬいふれあのかりや",
    location: new Point3(295, 57, -169),
    wikiIndex: 7,
    finished: true,
  }),
  make({
    name: "ころねの家",
    yomi: "ころねのいえ",
    location: new Point3(202, 64, -328),
    markerLocation: new Point(211, -338),
    wikiIndex: 8,
    finished: true,
  }),
  make({
    name: "みんなの掲示板",
    yomi: "みんなのけいじばん",
    location: new Point3(274, 68, -204),
    wikiIndex: 9,
    finished: true,
  }),
  make({
    name: "エンチャントの間",
    yomi: "えんちゃんとのま",
    location: new Point3(242, 69, -213),
    markerLocation: new Point(242, -225),
    wikiIndex: 10,
    finished: true,
  }),
  make({
    name: "ノエルのテント",
    yomi: "のえるのてんと",
    location: new Point3(333, 72, -258),
    markerLocation: new Point(346, -253),
    wikiIndex: 11,
    finished: false,
  }),
  make({
    name: "大空スバルの家跡地",
    yomi: "おおぞらすばるのいえあとち",
    location: new Point3(225, 68, -341),
    markerLocation: new Point(232, -356),
    wikiIndex: 12,
    finished: true,
  }),
  make({
    name: "おかゆの家",
    yomi: "おかゆのいえ",
    location: new Point3(223, 53, -351),
    wikiIndex: 13,
    finished: true,
  }),
  make({
    name: "潤羽るしあの家",
    yomi: "うるはるしあのいえ",
    location: new Point3(194, 69, -284),
    markerLocation: new Point(184, -290),
    wikiIndex: 14,
    finished: true,
  }),
  make({
    name: "ロボ子さんの山頂拠点",
    yomi: "ろぼこさんのさんちょうきょてん",
    location: new Point3(445, 102, -88),
    markerLocation: new Point(455, -98),
    wikiIndex: 15,
    finished: true,
  }),
  make({
    name: "ちょこ先生の地下帝国",
    yomi: "ちょこせんせいのちかていこく",
    location: new Point3(243, 69, -227),
    wikiIndex: 16,
    finished: true,
  }),
  make({
    name: "赤井はあとの家",
    yomi: "あかいはあとのいえ",
    location: new Point3(156, 70, -198),
    wikiIndex: 17,
    finished: true,
  }),
  make({
    name: "まつりの家",
    yomi: "まつりのいえ",
    location: new Point3(283, 69, -281),
    markerLocation: new Point(283, -313),
    wikiIndex: 18,
    finished: true,
  }),
  make({
    name: "兎田ぺこらの家",
    yomi: "うさだぺこらのいえ",
    location: new Point3(303, 68, -176),
    wikiIndex: 19,
    finished: false,
  }),
  make({
    name: "さくらみこの家",
    yomi: "さくらみこのいえ",
    location: new Point3(227, 69, -216),
    markerLocation: new Point(201, -227),
    wikiIndex: 20,
    finished: true,
  }),
  make({
    name: "えーちゃんのイヌ小屋",
    yomi: "えーちゃんのいぬごや",
    location: new Point3(435, 80, -78),
    wikiIndex: 21,
    finished: true,
  }),
  make({
    name: "説教部屋in巨大キノコ",
    yomi: [
      "せっきょうべやinきょだいきのこ",
      "せっきょうべやいんきょだいきのこ",
    ],
    location: new Point3(406, 79, -93),
    markerLocation: new Point(399, -96),
    wikiIndex: 22,
    finished: true,
  }),
  make({
    name: "さくらみこの森の洋館",
    yomi: "さくらみこのもりのようかん",
    location: new Point3(-4574, 79, -817),
    markerLocation: new Point(-4606, -842),
    wikiIndex: 23,
    finished: false,
  }),
  make({
    name: "ミオハウス",
    yomi: "みおはうす",
    location: new Point3(383, 71, -214),
    markerLocation: new Point(393, -218),
    wikiIndex: 24,
    finished: true,
  }),
  make({
    name: "るしあ邸",
    yomi: "るしあてい",
    location: new Point3(285, 71, -414),
    markerLocation: new Point(305, -434),
    wikiIndex: 25,
    finished: true,
  }),
  make({
    name: "百鬼あやめの家",
    yomi: "なきりあやめのいえ",
    location: new Point3(430, 69, -211),
    markerLocation: new Point(439, -216),
    wikiIndex: 26,
    finished: true,
  }),
  make({
    name: "赤井ホテル",
    yomi: "あかいほてる",
    location: new Point3(-4757, 64, -856),
    markerLocation: new Point(-4751, -889),
    wikiIndex: 45,
    finished: true,
  }),
  make({
    name: "資材ゲート",
    yomi: "しざいげーと",
    location: new Point3(209, 68, -296),
    markerLocation: new Point(200, -303),
    wikiIndex: 60,
    finished: true,
  }),
  make({
    name: "ロボ子さんの離島の別荘",
    yomi: "ろぼこさんのりとうのべっそう",
    location: new Point3(-7794, 64, -1388),
    markerLocation: new Point(-7797, -1410),
    wikiIndex: 58,
    finished: true,
  }),

  make({
    name: "るしあの別荘",
    yomi: "るしあのべっそう",
    location: new Point3(-7873, 65, -1299),
    finished: true,
  }),
];
