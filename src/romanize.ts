const kKanaToRomanMap: Map<string, string[]>[] = [
  new Map([
    ["きゃ", ["kya"]],
    ["きぃ", ["kyi"]],
    ["きゅ", ["kyu"]],
    ["きぇ", ["kye"]],
    ["きょ", ["kyo"]],
    ["ぎゃ", ["gya"]],
    ["ぎぃ", ["gyi"]],
    ["ぎゅ", ["gyu"]],
    ["ぎぇ", ["gye"]],
    ["ぎょ", ["gyo"]],
    ["しゃ", ["sha", "sya"]],
    ["しぃ", ["syi"]],
    ["しゅ", ["shu", "syu"]],
    ["しぇ", ["she", "sye"]],
    ["しょ", ["sho", "syo"]],
    ["じゃ", ["ja", "zya", "jya"]],
    ["じぃ", ["zyi", "jyi"]],
    ["じゅ", ["ju", "zyu", "jyu"]],
    ["じぇ", ["je", "zye", "jye"]],
    ["じょ", ["jo", "zyo", "jyo"]],
    ["すぁ", ["swa"]],
    ["すぃ", ["swi"]],
    ["すぅ", ["swu"]],
    ["すぇ", ["swe"]],
    ["すぉ", ["swo"]],
    ["ちゃ", ["cha", "tya", "cya"]],
    ["ちぃ", ["tyi", "cyi"]],
    ["ちゅ", ["chu", "tyu", "cyu"]],
    ["ちぇ", ["che", "tye", "cye"]],
    ["ちょ", ["cho", "tyo", "cyo"]],
    ["ぢゃ", ["dya"]],
    ["ぢぃ", ["dyi"]],
    ["ぢゅ", ["dyu"]],
    ["ぢぇ", ["dye"]],
    ["ぢょ", ["dyo"]],
    ["てゃ", ["tha"]],
    ["てぃ", ["thi"]],
    ["てゅ", ["thu"]],
    ["てぇ", ["the"]],
    ["てょ", ["tho"]],
    ["にゃ", ["nya"]],
    ["にぃ", ["nyi"]],
    ["にゅ", ["nyu"]],
    ["にぇ", ["nye"]],
    ["にょ", ["nyo"]],
    ["ひゃ", ["hya"]],
    ["ひぃ", ["hyi"]],
    ["ひゅ", ["hyu"]],
    ["ひぇ", ["hye"]],
    ["ひょ", ["hyo"]],
    ["びゃ", ["bya"]],
    ["びぃ", ["byi"]],
    ["びゅ", ["byu"]],
    ["びぇ", ["bye"]],
    ["びょ", ["byo"]],
    ["ぴゃ", ["pya"]],
    ["ぴぃ", ["pyi"]],
    ["ぴゅ", ["pyu"]],
    ["ぴぇ", ["pye"]],
    ["ぴょ", ["pyo"]],
    ["みゃ", ["mya"]],
    ["みぃ", ["myi"]],
    ["みゅ", ["myu"]],
    ["みぇ", ["mye"]],
    ["みょ", ["myo"]],
    ["りゃ", ["rya"]],
    ["りぃ", ["ryi"]],
    ["りゅ", ["ryu"]],
    ["りぇ", ["rye"]],
    ["りょ", ["ryo"]],
    ["くぁ", ["kwa", "qwa", "qa"]],
    ["くぃ", ["kwi", "qui", "qi", "qyi"]],
    ["くぅ", ["kwu", "qwu"]],
    ["くぇ", ["kwe", "qwe", "qe", "qye"]],
    ["くぉ", ["kwo", "qwo", "qo"]],
    ["くゃ", ["qya"]],
    ["くゅ", ["qyu"]],
    ["くょ", ["qyo"]],
    ["ぐぁ", ["gwa"]],
    ["ぐぃ", ["gwi"]],
    ["ぐぅ", ["gwu"]],
    ["ぐぇ", ["gwe"]],
    ["ぐぉ", ["gwo"]],
    ["つぁ", ["tsa"]],
    ["つぃ", ["tsi"]],
    ["つぇ", ["tse"]],
    ["つぉ", ["tso"]],
    ["とぁ", ["twa"]],
    ["とぃ", ["twi"]],
    ["とぅ", ["twu"]],
    ["とぇ", ["twe"]],
    ["とぉ", ["two"]],
    ["どぁ", ["dwa"]],
    ["どぃ", ["dwi"]],
    ["どぅ", ["dwu"]],
    ["どぇ", ["dwe"]],
    ["どぉ", ["dwo"]],
    ["ふぁ", ["fa"]],
    ["ふぃ", ["fi"]],
    ["ふぇ", ["fe"]],
    ["ふぉ", ["fo"]],
    ["いぇ", ["ye"]],
    ["うぁ", ["wha"]],
    ["うぃ", ["whi", "wi"]],
    ["うぇ", ["whe", "we"]],
    ["うぉ", ["who"]]
  ]),
  new Map([
    ["あ", ["a"]],
    ["い", ["i", "yi"]],
    ["う", ["u", "wu", "whu"]],
    ["え", ["e"]],
    ["お", ["o"]],
    ["ぁ", ["xa", "la"]],
    ["ぃ", ["xi", "li", "lyi", "xyi"]],
    ["ぅ", ["xu", "lu"]],
    ["ぇ", ["xe", "le", "lye", "xye"]],
    ["ぉ", ["xo", "lo"]],
    ["か", ["ka", "ca"]],
    ["き", ["ki"]],
    ["く", ["ku", "cu", "qu"]],
    ["け", ["ke"]],
    ["こ", ["ko", "co"]],
    ["が", ["ga"]],
    ["ぎ", ["gi"]],
    ["ぐ", ["gu"]],
    ["げ", ["ge"]],
    ["ご", ["go"]],
    ["さ", ["sa"]],
    ["し", ["shi", "ci", "si"]],
    ["す", ["su"]],
    ["せ", ["se", "ce"]],
    ["そ", ["so"]],
    ["ざ", ["za"]],
    ["じ", ["ji", "zi"]],
    ["ず", ["zu"]],
    ["ぜ", ["ze"]],
    ["ぞ", ["zo"]],
    ["た", ["ta"]],
    ["ち", ["chi", "ti"]],
    ["つ", ["tsu", "tu"]],
    ["て", ["te"]],
    ["と", ["to"]],
    ["だ", ["da"]],
    ["ぢ", ["di"]],
    ["づ", ["du"]],
    ["で", ["de"]],
    ["ど", ["do"]],
    ["な", ["na"]],
    ["に", ["ni"]],
    ["ぬ", ["nu"]],
    ["ね", ["ne"]],
    ["の", ["no"]],
    ["は", ["ha"]],
    ["ひ", ["hi"]],
    ["ふ", ["fu"]],
    ["へ", ["he"]],
    ["ほ", ["ho"]],
    ["ば", ["ba"]],
    ["び", ["bi"]],
    ["ぶ", ["bu"]],
    ["べ", ["be"]],
    ["ぼ", ["bo"]],
    ["ぱ", ["pa"]],
    ["ぴ", ["pi"]],
    ["ぷ", ["pu"]],
    ["ぺ", ["pe"]],
    ["ぽ", ["po"]],
    ["ま", ["ma"]],
    ["み", ["mi"]],
    ["む", ["mu"]],
    ["め", ["me"]],
    ["も", ["mo"]],
    ["や", ["ya"]],
    ["ゆ", ["yu"]],
    ["よ", ["yo"]],
    ["ゃ", ["xya"]],
    ["ゅ", ["xyu"]],
    ["ょ", ["xyo"]],
    ["ら", ["ra"]],
    ["り", ["ri"]],
    ["る", ["ru"]],
    ["れ", ["re"]],
    ["ろ", ["ro"]],
    ["わ", ["wa"]],
    ["ゐ", ["wi"]],
    ["ゑ", ["we"]],
    ["を", ["wo"]],
    ["ゎ", ["xwa"]],
    ["ん", ["n"]],
    ["ー", ["-"]],
    ["、", [","]],
    ["。", ["."]]
  ])
];

export function romanize(s: string): string[] {
  const chars: string[][] = [];
  let index = 0;
  const length = s.length;

  while (index < length) {
    let ok = false;
    for (let i = 0; i < kKanaToRomanMap.length; i++) {
      const table = kKanaToRomanMap[i];
      const keyLength = kKanaToRomanMap.length - i;
      const part = s.substr(index, keyLength);
      const converted = table.get(part);
      if (!converted) {
        continue;
      }
      chars.push(converted);
      index += keyLength;
      ok = true;
      break;
    }
    if (!ok) {
      chars.push([s.substr(index, 1)]);
      index++;
    }
  }
  const xtu = ["xtu", "xtsu", "ltu", "ltsu"];
  while (true) {
    const idx = findLastIndex(chars, it => it.length === 1 && it[0] === "っ");
    if (idx < 0) {
      break;
    }

    let begin = idx;
    const end = idx + 1;
    for (let i = begin - 1; i >= 0; i--) {
      if (chars[i].length === 1 && chars[i][0] === "っ") {
        begin = i;
      } else {
        break;
      }
    }

    if (idx + 1 < chars.length) {
      const firstLetter = chars[idx + 1].map(it => it.substr(0, 1));
      if (firstLetter.every(it => !["a", "i", "u", "e", "o"].includes(it))) {
        for (let i = begin; i < end; i++) {
          chars[i] = [];
        }
        chars[idx + 1] = chars[idx + 1].map(it => {
          const l = it.substr(0, 1);
          return l + it;
        });
      } else {
        for (let i = begin; i < end; i++) {
          chars[i] = xtu;
        }
      }
    } else {
      for (let i = begin; i < end; i++) {
        chars[i] = xtu;
      }
    }
  }
  return explode(chars);
}

function findLastIndex<T>(arr: T[], predicate: (v: T) => boolean) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return i;
    }
  }
  return -1;
}

function explode(chars: string[][]): string[] {
  chars = chars.filter(it => it.length > 0);
  if (chars.length < 1) {
    return [];
  }
  let result: string[] = chars[0];
  for (let i = 1; i < chars.length; i++) {
    const ch = chars[i];
    const next: string[] = [];
    result.forEach(r => {
      ch.forEach(c => {
        next.push(r + c);
      });
    });
    result = next;
  }
  return result;
}
