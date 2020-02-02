const kKanaToRomanMap: Map<string, string[]>[] = [
  new Map([
    ["っきゃ", ["kkya"]],
    ["っきぃ", ["kkyi"]],
    ["っきゅ", ["kkyu"]],
    ["っきぇ", ["kkye"]],
    ["っきょ", ["kkyo"]],
    ["っぎゃ", ["ggya"]],
    ["っぎぃ", ["ggyi"]],
    ["っぎゅ", ["ggyu"]],
    ["っぎぇ", ["ggye"]],
    ["っぎょ", ["ggyo"]],
    ["っしゃ", ["ssha"]],
    ["っしぃ", ["ssyi"]],
    ["っしゅ", ["sshu"]],
    ["っしぇ", ["sshe"]],
    ["っしょ", ["ssho"]],
    ["っじゃ", ["jja"]],
    ["っじぃ", ["jjyi"]],
    ["っじゅ", ["jju"]],
    ["っじぇ", ["jje"]],
    ["っじょ", ["jjo"]],
    ["っちゃ", ["tcha"]],
    ["っちぃ", ["ttyi"]],
    ["っちゅ", ["tchu"]],
    ["っちぇ", ["tche"]],
    ["っちょ", ["tcho"]],
    ["っぢゃ", ["ddya"]],
    ["っぢぃ", ["ddyi"]],
    ["っぢゅ", ["ddyu"]],
    ["っぢぇ", ["ddye"]],
    ["っぢょ", ["ddyo"]],
    ["っひゃ", ["hhya"]],
    ["っひい", ["hhyi"]],
    ["っひゅ", ["hhyu"]],
    ["っひぇ", ["hhye"]],
    ["っひょ", ["hhyo"]],
    ["っびゃ", ["bbya"]],
    ["っびぃ", ["bbyi"]],
    ["っびゅ", ["bbyu"]],
    ["っびぇ", ["bbye"]],
    ["っびょ", ["bbyo"]],
    ["っぴゃ", ["ppya"]],
    ["っぴぃ", ["ppyi"]],
    ["っぴゅ", ["ppyu"]],
    ["っぴぇ", ["ppye"]],
    ["っぴょ", ["ppyo"]],
    ["っふぁ", ["ffa"]],
    ["っふぃ", ["ffi"]],
    ["っふぇ", ["ffe"]],
    ["っふぉ", ["ffo"]],
    ["っみゃ", ["mmya"]],
    ["っみぃ", ["mmyi"]],
    ["っみゅ", ["mmyu"]],
    ["っみぇ", ["mmye"]],
    ["っみょ", ["mmyo"]],
    ["っりゃ", ["rrya"]],
    ["っりぃ", ["rryi"]],
    ["っりゅ", ["rryu"]],
    ["っりぇ", ["rrye"]],
    ["っりょ", ["rryo"]]
  ]),
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
    ["しゃ", ["sha"]],
    ["しぃ", ["syi"]],
    ["しゅ", ["shu"]],
    ["しぇ", ["she"]],
    ["しょ", ["sho"]],
    ["じゃ", ["ja"]],
    ["じぃ", ["zyi"]],
    ["じゅ", ["ju"]],
    ["じぇ", ["je"]],
    ["じょ", ["jo"]],
    ["ちゃ", ["cha"]],
    ["ちぃ", ["tyi"]],
    ["ちゅ", ["chu"]],
    ["ちぇ", ["che"]],
    ["ちょ", ["cho"]],
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
    ["うぃ", ["wi"]],
    ["うぇ", ["we"]],
    ["くぁ", ["kwa"]],
    ["くぃ", ["kwi"]],
    ["くぅ", ["kwu"]],
    ["くぇ", ["kwe"]],
    ["くぉ", ["kwo"]],
    ["ぐぁ", ["gwa"]],
    ["ぐぃ", ["gwi"]],
    ["ぐぅ", ["gwu"]],
    ["ぐぇ", ["gwe"]],
    ["ぐぉ", ["gwo"]],
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
    ["っか", ["kka"]],
    ["っき", ["kki"]],
    ["っく", ["kku"]],
    ["っけ", ["kke"]],
    ["っこ", ["kko"]],
    ["っが", ["gga"]],
    ["っぎ", ["ggi"]],
    ["っぐ", ["ggu"]],
    ["っげ", ["gge"]],
    ["っご", ["ggo"]],
    ["っさ", ["ssa"]],
    ["っし", ["sshi"]],
    ["っす", ["ssu"]],
    ["っせ", ["sse"]],
    ["っそ", ["sso"]],
    ["っざ", ["zza"]],
    ["っじ", ["jji"]],
    ["っず", ["zzu"]],
    ["っぜ", ["zze"]],
    ["っぞ", ["zzo"]],
    ["った", ["tta"]],
    ["っち", ["tchi"]],
    ["っつ", ["ttsu"]],
    ["って", ["tte"]],
    ["っと", ["tto"]],
    ["っだ", ["dda"]],
    ["っぢ", ["ddi"]],
    ["っづ", ["ddu"]],
    ["っで", ["dde"]],
    ["っど", ["ddo"]],
    ["っは", ["hha"]],
    ["っひ", ["hhi"]],
    ["っふ", ["ffu"]],
    ["っへ", ["hhe"]],
    ["っほ", ["hho"]],
    ["っば", ["bba"]],
    ["っび", ["bbi"]],
    ["っぶ", ["bbu"]],
    ["っべ", ["bbe"]],
    ["っぼ", ["bbo"]],
    ["っぱ", ["ppa"]],
    ["っぴ", ["ppi"]],
    ["っぷ", ["ppu"]],
    ["っぺ", ["ppe"]],
    ["っぽ", ["ppo"]],
    ["っま", ["mma"]],
    ["っみ", ["mmi"]],
    ["っむ", ["mmu"]],
    ["っめ", ["mme"]],
    ["っも", ["mmo"]],
    ["っや", ["yya"]],
    ["っゆ", ["yyu"]],
    ["っよ", ["yyo"]],
    ["っら", ["rra"]],
    ["っり", ["rri"]],
    ["っる", ["rru"]],
    ["っれ", ["rre"]],
    ["っろ", ["rro"]],
    ["っわ", ["wwa"]],
    ["っゐ", ["wwi"]],
    ["っゑ", ["wwe"]],
    ["っを", ["wwo"]]
  ]),
  new Map([
    ["あ", ["a"]],
    ["い", ["i"]],
    ["う", ["u"]],
    ["え", ["e"]],
    ["お", ["o"]],
    ["ぁ", ["xa"]],
    ["ぃ", ["xi"]],
    ["ぅ", ["xu"]],
    ["ぇ", ["xe"]],
    ["ぉ", ["xo"]],
    ["か", ["ka"]],
    ["き", ["ki"]],
    ["く", ["ku"]],
    ["け", ["ke"]],
    ["こ", ["ko"]],
    ["が", ["ga"]],
    ["ぎ", ["gi"]],
    ["ぐ", ["gu"]],
    ["げ", ["ge"]],
    ["ご", ["go"]],
    ["さ", ["sa"]],
    ["し", ["shi"]],
    ["す", ["su"]],
    ["せ", ["se"]],
    ["そ", ["so"]],
    ["ざ", ["za"]],
    ["じ", ["ji"]],
    ["ず", ["zu"]],
    ["ぜ", ["ze"]],
    ["ぞ", ["zo"]],
    ["た", ["ta"]],
    ["ち", ["chi"]],
    ["つ", ["tsu"]],
    ["て", ["te"]],
    ["と", ["to"]],
    ["っ", ["xtsu"]],
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
  return explode(chars);
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
