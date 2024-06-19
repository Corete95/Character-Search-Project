export const order = [
  "반지1",
  null,
  "모자",
  null,
  "엠블렘",
  "반지2",
  "펜던트",
  "얼굴장식",
  null,
  "뱃지",
  "반지3",
  "펜던트2",
  "눈장식",
  "귀고리",
  "훈장",
  "반지4",
  "무기",
  "상의",
  "어깨장식",
  "보조무기",
  "포켓 아이템",
  "벨트",
  "하의",
  "장갑",
  "망토",
  "칭호",
  null,
  "신발",
  "안드로이드",
  "기계 심장",
];

export const gradeColors: { [key: string]: string } = {
  레전드리: "border-[#6ff300] bg-[#6fb46429]",
  유니크: "border-[#fec763] bg-[#faf08929]",
  에픽: "border-[#b76cfd] bg-[#b77dc729]",
  레어: "border-rare bg-[#5393ca29]",
  default: "border-[#aaaaaa78] bg-[#5a5a5a0a] ",
};

export const textColors: { [key: string]: string } = {
  레전드리: "text-[#ccff02]",
  유니크: "text-[#FFCC00]",
  에픽: "text-[#b76cfd]",
  레어: "text-[#65ffff]",
};

export const keConversion: { [key: string]: string } = {
  레전드리: "legendary.png",
  유니크: "unique.png",
  에픽: "epic.png",
  레어: "rare.png",
};

export const stats = [
  {
    key: "STR",
    value: "str",
  },
  {
    key: "DEX",
    value: "dex",
  },
  {
    key: "INT",
    value: "int",
  },
  {
    key: "LUK",
    value: "luk",
  },
  {
    key: "최대 HP",
    value: "max_hp",
  },
  {
    key: "최대 MP",
    value: "max_mp",
  },
  {
    key: "공격력",
    value: "attack_power",
  },
  {
    key: "마력",
    value: "magic_power",
  },
  {
    key: "방어력",
    value: "armor",
  },
  {
    key: "이동속도",
    value: "speed",
  },
  {
    key: "점프력",
    value: "jump",
  },
  {
    key: "보스 공격 시 데미지 증가",
    value: "boss_damage",
  },
  {
    key: "몬스터 방어율 무시",
    value: "ignore_monster_armor",
  },
  {
    key: "올스탯",
    value: "all_stat",
  },
  {
    key: "데미지",
    value: "damage",
  },
  {
    key: "착용 레벨 감소",
    value: "equipment_level_decrease",
  },
];

export const starforceStandard: any = {
  95: 5,
  107: 8,
  117: 10,
  127: 15,
  128: 20,
  138: 25,
};
