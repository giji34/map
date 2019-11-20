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

export type Landmark = {
  name: string;
  location: Point;
  xOffset?: number;
  finished?: boolean;
  debug?: number;
};

export const kLandmarks: Landmark[] = [
  { name: "いちご大墳墓", location: new Point(323, 631), finished: true },
  { name: "みんなの家", location: new Point(175, 17), finished: true },
  { name: "さんばか城", location: new Point(-261, 758), finished: true },
  {
    name: "サクラダ・ファミリア",
    location: new Point(63, -7),
    finished: false,
    xOffset: 40
  },
  { name: "世界", location: new Point(62, -90), finished: true },
  {
    name: "しばと凛月のおうち",
    location: new Point(137, -118),
    finished: true
  },
  {
    name: "弓道場",
    location: new Point(107, -203),
    xOffset: 20,
    finished: true
  },
  {
    name: "桜第一惑星",
    location: new Point(128, -168),
    finished: true,
    xOffset: 40
  },
  { name: "紅白アホアホハウス", location: new Point(92, -260), finished: true },
  {
    name: "叶の家",
    location: new Point(208, -106),
    xOffset: -30,
    finished: true
  },
  {
    name: "Kyoko's seacret house",
    location: new Point(243, -120),
    finished: true,
    xOffset: 80
  },
  { name: "✞黒の要塞✞", location: new Point(242, -41), finished: true },
  { name: "神社", location: new Point(262, 23), finished: true },
  { name: "舞元の家", location: new Point(323, -42), finished: true },
  { name: "ドラひまハウス", location: new Point(382, -9), finished: true },
  { name: "ド葛本社", location: new Point(367, 37), finished: true },
  { name: "アズカバン", location: new Point(423, 63), finished: true },
  { name: "教会", location: new Point(323, 66), finished: true },
  {
    name: "BLハウス",
    location: new Point(271, 73),
    finished: true,
    xOffset: 40
  },
  { name: "森中温泉", location: new Point(274, 118), finished: false },
  { name: "カリン塔", location: new Point(308, 100), finished: true },
  { name: "くまさんランド", location: new Point(306, 171), finished: true },
  { name: "猫カフェ", location: new Point(357, 160), finished: true },
  { name: "陰キャ帝国", location: new Point(404, 223), finished: false },
  { name: "ヤマダタロウ", location: new Point(400, 198), finished: true },
  { name: "ラトナ・プティの家", location: new Point(455, 344), finished: true },
  { name: "一期生ハウス", location: new Point(603, 275), finished: true },
  { name: "夕陽リリの家", location: new Point(747, -37), finished: true },
  { name: "しずくしま神社", location: new Point(868, 26), finished: true },
  { name: "静凛の家", location: new Point(842, 72), finished: true },
  { name: "しばハウス2", location: new Point(206, 124), finished: true },
  { name: "たけし", location: new Point(177, 64), finished: true, xOffset: 60 },
  {
    name: "さわるな危険",
    location: new Point(167, 60),
    finished: true,
    xOffset: -60
  },
  { name: "リリかざハウス", location: new Point(214, 56), finished: false },
  { name: "舞ハウス", location: new Point(73, 162), finished: true },
  { name: "モルパレス", location: new Point(61, 78), finished: true },
  { name: "アキくんはし", location: new Point(24, 15), finished: true },
  {
    name: "理想のおうち",
    location: new Point(19, 47),
    finished: false,
    xOffset: 40
  },
  { name: "狂犬ズハウス", location: new Point(-89, 19), finished: false },
  { name: "黒井神社", location: new Point(-86, -29), finished: true },
  { name: "物述有栖の家", location: new Point(-140, 3), finished: true },
  { name: "メイドカフェ", location: new Point(-154, 25), finished: true },
  { name: "セーフハウス", location: new Point(-171, 8), finished: true },
  {
    name: "夢追翔のライブハウス",
    location: new Point(-195, 22),
    finished: false
  },
  { name: "DERAS HOUSE", location: new Point(-197, 55), finished: true },
  { name: "セブンイレブン", location: new Point(-190, 93), finished: true },
  { name: "しば城", location: new Point(-130, 72), finished: true },
  { name: "競馬場予定地", location: new Point(-288, -104), finished: false },
  {
    name: "立ち退き反対ハウス",
    location: new Point(-327, -54),
    finished: true
  },
  { name: "ハジメ村", location: new Point(-423, 17), finished: false },
  { name: "鈴谷アキの仮拠点", location: new Point(-270, 211), finished: true },
  { name: "キャンプ場テント", location: new Point(-303, 424), finished: true },
  {
    name: "キリトの剣取らないで",
    location: new Point(-465, 540),
    finished: true
  },
  {
    name: "夕陽リリさんの塔跡地",
    location: new Point(-570, 456),
    finished: true
  },
  {
    name: "トニー・スタークのおうち",
    location: new Point(-200, 143),
    finished: true
  },
  { name: "学校", location: new Point(-211, 654), finished: true },
  { name: "第2秘密基地", location: new Point(-227, 906), finished: false },
  {
    name: "にじさんじランド",
    location: new Point(-1496, 1395),
    finished: false
  },
  { name: "駅", location: new Point(196, -57), finished: true },
  { name: "森中ランド", location: new Point(-80, 489), finished: false },
  { name: "✿ンボ村", location: new Point(-4791, 4790), finished: false },
  { name: "偽JK組ハウス", location: new Point(-30011, -20195) },
  { name: "アパホテルの水", location: new Point(-30023, -20170) },
  { name: "ボートレース場", location: new Point(-4603, 4777), finished: true },
  { name: "✿ンボ宮殿", location: new Point(-4793, 4908), finished: true },
  {
    name: "舞元さん化石耐久配信現場",
    location: new Point(-383, -504),
    finished: false
  },
  { name: "しずりんの村", location: new Point(1620, 255), finished: false },
  { name: "葛葉さん遭難跡地", location: new Point(-298, 1071), finished: true },
  {
    name: "ベルさん海底神殿攻略拠点",
    location: new Point(591, 7863),
    finished: true
  },
  { name: "静凛サンゴ礁仮拠点", location: new Point(0, 5411), finished: true },
  { name: "エンド要塞(静凛)", location: new Point(5870, 5746), finished: true },
  { name: "しずりんの洋館", location: new Point(4282, 5398), finished: false },
  { name: "ちーかざちーハウス", location: new Point(-1, -98), finished: true },
  { name: "骨バイオーム", location: new Point(20, 176), finished: false },
  { name: "神田笑一の家", location: new Point(4, 315), finished: false },
  {
    name: "マジックツリーハウス",
    location: new Point(58, 476),
    finished: true
  },
  { name: "液", location: new Point(253, 301), finished: true },
  {
    name: "BIG WOOD HAYAMA HOUSE",
    location: new Point(380, 178),
    finished: false
  },
  {
    name: "笹木咲の水族館(跡地)",
    location: new Point(362, 213),
    finished: true
  },
  { name: "マンション", location: new Point(107, 73), finished: false },
  { name: "うい覇道", location: new Point(-735, -77), finished: true },
  {
    name: "神田ロード",
    location: new Point(13, 389),
    finished: false,
    xOffset: 100
  },
  { name: "chima kakurega", location: new Point(-117, -205), finished: false },
  {
    name: "うさぎの像(作者不明)",
    location: new Point(-928, -1502),
    finished: true
  },
  { name: "う◯ち", location: new Point(229, 6), finished: true },
  { name: "ハロウィンの館", location: new Point(-4964, 4917), finished: false },
  {
    name: "ヒモと財布ハウス",
    location: new Point(174, 302),
    finished: true,
    xOffset: -60
  },
  {
    name: "矢車監視事務局",
    location: new Point(187, 319),
    finished: true,
    xOffset: 60
  },
  { name: "お花見会場", location: new Point(151, 188), finished: false },
  { name: "世界地図", location: new Point(144, -9), finished: true },
  { name: "でびリオンハウス", location: new Point(124, -63), finished: false },
  { name: "太陽", location: new Point(194, -3), finished: true },
  { name: "月", location: new Point(135, 53), finished: true },
  { name: "魔界ノりりむの家", location: new Point(255, 102), finished: true },
  { name: "カリスマ三姉妹の像", location: new Point(260, 64), finished: true },
  {
    name: "シスター・クレアの仮家",
    location: new Point(344, 95),
    finished: true
  },
  { name: "山田トラップ", location: new Point(199, -131), finished: true }
].sort((a, b) => {
  if (a.location.z == b.location.z) {
    return a.location.x - b.location.z;
  } else {
    return a.location.z - b.location.z;
  }
});

if (typeof window === "undefined") {
  kLandmarks.forEach(landmark => {
    console.log(`${landmark.location.x}\t${landmark.location.z}`);
  });
}
