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
    name: "ケーキのトラップハウス",
    yomi: "けーきのとらっぷはうす",
    location: new Point3(245, 69, -260),
    markerLocation: new Point(246, -269),
    wikiIndex: 27,
    finished: true,
  }),
  make({
    name: "キングテレサ",
    yomi: "きんぐてれさ",
    location: new Point3(267, 126, -217),
    wikiIndex: 28,
    finished: true,
  }),
  make({
    name: "星街すいせいの家",
    yomi: "ほしまちすいせいのいえ",
    location: new Point3(246, 69, -384),
    wikiIndex: 29,
    finished: true,
  }),
  make({
    name: "お菓子の家",
    yomi: "おかしのいえ",
    location: new Point3(212, 64, -179),
    wikiIndex: 30,
    finished: true,
  }),
  make({
    name: "ときのそら友人A仮拠点",
    yomi: "ときのそらゆうじんAかりきょてん",
    location: new Point3(362, 69, -146),
    wikiIndex: 31,
    finished: true,
  }),
  make({
    name: "ライブステージ",
    yomi: "らいぶすてーじ",
    location: new Point3(334, 69, -146),
    wikiIndex: 32,
    finished: true,
  }),
  make({
    name: "ツリーハウス",
    yomi: "つりーはうす",
    location: new Point3(161, 63, -291),
    wikiIndex: 33,
    finished: true,
  }),
  make({
    name: "巨大パンプキン",
    yomi: "きょだいぱんぷきん",
    location: new Point3(188, 64, -186),
    wikiIndex: 34,
    finished: true,
  }),
  make({
    name: "ネザーゲート",
    yomi: "ねざーげーと",
    location: new Point3(292, 68, -332),
    markerLocation: new Point(292, -345),
    wikiIndex: 35,
    finished: true,
  }),
  make({
    name: "ネザー鉄道",
    yomi: "ねざーてつどう",
    dimension: Dimension.TheNether,
    location: new Point3(-16, 83, -105),
    corners: [
      new Point(-16, -105), // 始点
      new Point(-603, -105), // 終点
    ],
    wikiIndex: 37,
    finished: true,
  }),
  make({
    name: "ガンダム",
    yomi: "がんだむ",
    location: new Point3(308, 70, -271),
    wikiIndex: 38,
    finished: true,
  }),
  make({
    name: "噴水広場",
    yomi: "ふんすいひろば",
    location: new Point3(231, 69, -318),
    wikiIndex: 39,
    finished: true,
  }),
  make({
    name: "ゾンビトラップタワー",
    yomi: "ぞんびとらっぷたわー",
    location: new Point3(239, 69, -326),
    wikiIndex: 40,
    finished: true,
  }),
  make({
    name: "空中ハウス",
    yomi: "くうちゅうはうす",
    location: new Point3(143, 72, -269),
    markerLocation: new Point(125, -290),
    wikiIndex: 41,
    finished: true,
  }),
  make({
    name: "自動収穫機",
    yomi: "じどうしゅうかくき",
    location: new Point3(327, 69, -268),
    markerLocation: new Point(323, -291),
    wikiIndex: 42,
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
    name: "ホロステーション",
    yomi: "ほろすてーしょん",
    location: new Point3(-4795, 63, -877),
    wikiIndex: 46,
    finished: true,
  }),
  make({
    name: "パーティー会場",
    yomi: "ぱーてぃーかいじょう",
    location: new Point3(268, 69, -325),
    wikiIndex: 47,
    finished: false,
  }),
  make({
    name: "スノードーム",
    yomi: "すのーどーむ",
    location: new Point3(288, 69, -323),
    markerLocation: new Point(285, -336),
    wikiIndex: 48,
    finished: true,
  }),
  make({
    name: "さくらみこの養蜂場",
    yomi: "さくらみこのようほうじょう",
    location: new Point3(230, 69, -240),
    markerLocation: new Point(222, -248),
    wikiIndex: 49,
    finished: true,
  }),
  make({
    name: "イルミネーション",
    yomi: "いるみねーしょん",
    location: new Point3(267, 69, -299),
    wikiIndex: 50,
    finished: true,
  }),
  make({
    name: "ロボ子さんの地下秘密基地",
    yomi: "ろぼこさんのちかひみつきち",
    location: new Point3(307, 66, -331),
    wikiIndex: 51,
    finished: true,
  }),
  make({
    name: "セイントサタンしかしか丸",
    yomi: "せいんとさたんしかしかまる",
    location: new Point3(258, 69, -303),
    markerLocation: new Point(258, -314),
    wikiIndex: 52,
    finished: true,
  }),
  make({
    name: "水中クリスマスツリー",
    yomi: "すいちゅうくりすますつりー",
    location: new Point3(304, 69, -284),
    markerLocation: new Point(304, -298),
    wikiIndex: 53,
    finished: true,
  }),
  make({
    name: "天空トラップタワー",
    yomi: "てんくうとらっぷたわー",
    location: new Point3(-5015, 192, -772),
    markerLocation: new Point(-5019, -795),
    wikiIndex: 54,
    finished: true,
  }),
  make({
    name: "牢屋",
    yomi: "ろうや",
    location: new Point3(220, 70, -332),
    wikiIndex: 56,
    finished: true,
  }),
  make({
    name: "ホロライブレジスタンスマンション",
    yomi: "ほろらいぶれじすたんすまんしょん",
    location: new Point3(222, 69, -325),
    wikiIndex: 57,
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
    name: "さくら神社",
    yomi: "さくらじんじゃ",
    location: new Point3(228, 75, -103),
    wikiIndex: 59,
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
    name: "鏡餅",
    yomi: "かがみもち",
    location: new Point3(189, 63, -325),
    markerLocation: new Point(187, -339),
    wikiIndex: 64,
    finished: true,
  }),
  make({
    name: "蜂養成所『あくプロ』",
    yomi: "はちようせいじょあくぷろ",
    location: new Point3(324, 69, -296),
    markerLocation: new Point(333, -299),
    wikiIndex: 65,
    finished: true,
  }),
  make({
    name: "桐生ココの家",
    yomi: "きりゅうここのいえ",
    location: new Point3(474, 68, -133),
    markerLocation: new Point(474, -156),
    wikiIndex: 66,
    finished: true,
  }),
  make({
    name: "かなたの様式建築",
    yomi: "かなたのようしきけんちく",
    location: new Point3(462, 67, -135),
    markerLocation: new Point(462, -152),
    wikiIndex: 67,
    finished: true,
  }),
  make({
    name: "ぺこらの海底基地",
    yomi: "ぺこらのかいていきち",
    location: new Point3(-5005, 55, -765),
    markerLocation: new Point(-5008, -770),
    wikiIndex: 69,
    finished: false,
  }),
  make({
    name: "人間砲台",
    yomi: "にんげんほうだい",
    location: new Point3(238, 64, -171),
    wikiIndex: 70,
    finished: true,
  }),
  make({
    name: "エンドポータルの部屋",
    yomi: "えんどぽーたるのへや",
    location: new Point3(1489, 29, -1028),
    wikiIndex: 71,
    finished: false,
  }),
  make({
    name: "ルーナ姫のヘーベルハウス",
    yomi: "るーなひめのへーべるはうす",
    location: new Point3(348, 74, -268),
    markerLocation: new Point(356, -285),
    wikiIndex: 72,
    finished: true,
  }),
  make({
    name: "花畑",
    yomi: "はなばたけ",
    location: new Point3(199, 63, -333),
    markerLocation: new Point(168, -388),
    wikiIndex: 73,
    finished: true,
  }),
  make({
    name: "アヒラック要塞",
    yomi: "あひらっくようさい",
    location: new Point3(165, 65, -406),
    markerLocation: new Point(165, -418),
    wikiIndex: 74,
    finished: true,
  }),
  make({
    name: "hololiveロゴ&ペンライト",
    yomi: ["hololiveろごぺんらいと", "ほろらいぶろご", "ぺんらいと"],
    location: new Point3(258, 69, -335),
    markerLocation: new Point(258, -355),
    wikiIndex: 75,
    finished: true,
  }),
  make({
    name: "羊監視塔",
    yomi: "ひつじかんしとう",
    location: new Point3(437, 70, -170),
    markerLocation: new Point(442, -176),
    wikiIndex: 76,
    finished: true,
  }),

  // 以下 wiki の番号がまだ無い.

  make({
    name: "猫カフェ",
    yomi: "ねこかふぇ",
    location: new Point3(248, 69, -278),
    markerLocation: new Point(249, -297),
    finished: true,
  }),
  make({
    name: "あくあダンジョン",
    yomi: "あくあだんじょん",
    location: new Point3(257, 63, -177),
    markerLocation: new Point(257, -152),
    finished: false,
  }),
  make({
    name: "るしあの別荘",
    yomi: "るしあのべっそう",
    location: new Point3(-7873, 65, -1299),
    finished: true,
  }),
  make({
    name: "あくあ城",
    yomi: "あくあじょう",
    dimension: Dimension.TheNether,
    location: new Point3(196, 32, -62),
    markerLocation: new Point(206, -80),
    finished: false,
  }),
  make({
    name: "ロボ子さんの浜辺の別荘",
    yomi: "ろぼこさんのはまべのべっそう",
    location: new Point3(-4837, 63, -905),
    markerLocation: new Point(-4837, -937),
    finished: false,
  }),
  make({
    name: "四期生ハウス",
    yomi: "よんきせいはうす",
    location: new Point3(336, 69, -233),
    markerLocation: new Point(345, -239),
    finished: true,
  }),
  make({
    name: "化石博物館",
    yomi: "かせきはくぶつかん",
    location: new Point3(277, 76, -243),
    markerLocation: new Point(272, -242),
    finished: true,
  }),
  make({
    name: "常闇トワの家",
    yomi: "とこやみとわのいえ",
    location: new Point3(171, 64, -144),
    markerLocation: new Point(158, -154),
    finished: true,
  }),
  make({
    name: "角巻わための羊ハウス",
    yomi: "つのまきわためのひつじはうす",
    location: new Point3(401, 71, -183),
    finished: true,
  }),
  make({
    name: "天音かなたの家",
    yomi: "あまねかなたのいえ",
    location: new Point3(165, 66, -126),
    markerLocation: new Point(157, -130),
    finished: true,
  }),
  make({
    name: "教会",
    yomi: "きょうかい",
    location: new Point3(448, 102, -174),
    markerLocation: new Point(464, -182),
    finished: false,
  }),
  make({
    name: "まつりの地下室",
    yomi: "まつりのちかしつ",
    location: new Point3(260, 41, -293),
    finished: true,
  }),

  // 以下 wiki に無い建築物

  make({
    name: "ドクロ型の家",
    yomi: "どくろがたのいえ",
    location: new Point3(244, 77, -11),
    finished: true,
  }),
  make({
    name: "優勝トロフィー",
    yomi: "ゆうしょうとろふぃー",
    location: new Point3(75, 64, -444),
    finished: true,
  }),
  make({
    name: "プレゼントボックス",
    yomi: "ぷれぜんとぼっくす",
    location: new Point3(78, 64, -460),
    finished: true,
  }),
  make({
    name: "かたた氏の監視部屋",
    yomi: ["かなたしのかんしべや", "かたたしのかんしべや"],
    location: new Point3(158, 66, -108),
    finished: true,
  }),
  make({
    name: "レンガのおうち",
    yomi: "れんがのおうち",
    location: new Point3(133, 69, -140),
    markerLocation: new Point(124, -145),
    finished: false,
  }),
  make({
    name: "羊毛でできた目印のタワー",
    yomi: "ようもうでできためじるしのたわー",
    location: new Point3(20, 64, -601),
    finished: true,
  }),
  make({
    name: "誰かの作業台",
    yomi: "だれかのさぎょうだい",
    location: new Point3(-69, 70, -688),
    finished: true,
  }),
  make({
    name: "ちょこ先生とるしあ氏の建てた家",
    yomi: "ちょこせんせいとるしあ氏のたてたいえ",
    location: new Point3(-527, 64, -435),
    finished: true,
  }),
  make({
    name: "あやスバ新拠点",
    yomi: "あやすばしんきょてん",
    location: new Point3(-125, 71, -705),
    markerLocation: new Point(-135, -746),
    finished: false,
  }),
  make({
    name: "LOVE HOUSE まつりちゃ先輩とルーナの愛の巣",
    yomi: "love house まつりちゃせんぱいとるーなのあいのす",
    location: new Point3(512, 72, -446),
    markerLocation: new Point(515, -465),
    finished: false,
  }),
  make({
    name: "ハート型のオブジェ",
    yomi: "はーとがたのおぶじぇ",
    location: new Point3(542, 74, -497),
    finished: false,
  }),
  make({
    name: "目印タワー",
    yomi: "めじるしたわー",
    location: new Point3(157, 64, -565),
    finished: false,
  }),
  make({
    name: "そらマウンテン跡地",
    yomi: "そらまうんてんあとち",
    location: new Point3(96, 64, -632),
    markerLocation: new Point(109, -671),
    finished: true,
  }),
  make({
    name: "HOLOLIVE INDONESIA DORM",
    yomi: "HOLOLIVE INDONESIA DORM",
    location: new Point3(112, 71, -202),
    markerLocation: new Point(95, -210),
    finished: false,
  }),
  make({
    name: "ドン・ゴクーラ",
    yomi: "どんごくーら",
    location: new Point3(-76, 64, -740),
    markerLocation: new Point(-71, -740),
    finished: true,
  }),
  make({
    name: "hololive 5 Star Barn",
    yomi: "hololive 5 star barn",
    location: new Point3(110, 76, -171),
    markerLocation: new Point(103, -182),
    finished: false,
  }),
  make({
    name: "自動羊毛回収機",
    yomi: "じどうようもうかいしゅうき",
    location: new Point3(423, 69, -148),
    finished: true,
  }),
  make({
    name: "UPSIDE DOWN HOUSE",
    yomi: "upside down house",
    location: new Point3(90, 70, -146),
    finished: false,
  }),
  make({
    name: "YAGOO像(南)",
    yomi: "yagooぞう",
    location: new Point3(257, 63, -168),
    finished: true,
  }),
  make({
    name: "観覧車",
    yomi: "かんらんしゃ",
    location: new Point3(292, 72, -365),
    finished: true,
  }),
  make({
    name: "フライパンから召喚されるはあちゃまの像とガンギマリ羊の像",
    yomi:
      "ふらいぱんからしょうかんされるはあちゃまのぞうとがんぎまりひつじのぞう",
    location: new Point3(153, 67, -226),
    markerLocation: new Point(158, -250),
    finished: true,
  }),
  make({
    name: "あんぽんたん姉妹の拠点",
    yomi: "あんぽんたんしまいのきょてん",
    location: new Point3(191, 80, -85),
    markerLocation: new Point(191, -111),
    finished: false,
  }),
  make({
    name: "常闇ウォーターパーク",
    yomi: "とこやみうぉーたーぱーく",
    location: new Point3(131, 68, -96),
    finished: false,
  }),
  make({
    name: "尾丸ポルカの像",
    yomi: "おまるぽるかのぞう",
    location: new Point3(136, 70, -189),
    markerLocation: new Point(132, -201),
    finished: true,
  }),
  make({
    name: "スライムトラップ",
    yomi: "すらいむとらっぷ",
    location: new Point3(-88, 64, -741),
    finished: false,
  }),
  make({
    name: "LOVE♥LOVE AQUAMARINEGO! ボロ寮舎",
    yomi: "らぶらぶあくあまりんごうぼろりょうしゃ",
    location: new Point3(105, 63, -387),
    markerLocation: new Point(107, -399),
    finished: false,
  }),
  make({
    name: "LOVE♥LOVE AQUA MARINE GO!",
    yomi: "らぶらぶあくあまりんごう",
    location: new Point3(75, 64, -397),
    finished: false,
  }),
  make({
    name: "紫シオンの新居",
    yomi: "むらさきしおんのしんきょ",
    location: new Point3(638, 93, -128),
    finished: false,
  }),
  make({
    name: "不知火フレアの新居",
    yomi: "しらぬいふれあのしんきょ",
    location: new Point3(298, 71, -480),
    markerLocation: new Point(292, -503),
    finished: false,
  }),
  make({
    name: "5期生ビルジング建設予定地",
    yomi: "ごきせいびるじんぐけんせつよていち",
    location: new Point3(176, 82, -514),
    finished: false,
  }),
];
