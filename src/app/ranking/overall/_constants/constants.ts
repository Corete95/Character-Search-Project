export const OVERALL_COLUMNS = [
  {
    key: "ranking",
    label: "순위",
    columns: "30px",
    hidden: false,
  },
  {
    key: "character_name",
    label: "캐릭터",
    columns: "100px",
    hidden: false,
  },
  {
    key: "character_level",
    label: "레벨",
    columns: "150px",
    hidden: false,
  },
  {
    key: "sub_class_name",
    label: "직업",
    columns: "200px",
    hidden: false,
  },
  {
    key: "character_popularity",
    label: "인기도",
    columns: "50px",
    hidden: true,
  },
  {
    key: "character_guildname",
    label: "길드",
    columns: "100px",
    hidden: false,
  },
];

export const JOB_LIST: Record<string, { key: string; label: string }[]> = {
  warrior: [
    { key: "전사-전체 전직", label: "모험가 전사 전체" },
    { key: "전사-히어로", label: "히어로" },
    { key: "전사-팔라딘", label: "팔리딘" },
    { key: "전사-다크나이트", label: "다크나이트" },
    { key: "카이저-전체전직", label: "카이저" },
    { key: "초월자-제로", label: "제로" },
    { key: "아델-전체전직", label: "아델" },
    { key: "아란-전체전직", label: "아란" },
    { key: "기사단-미하일", label: "미하일" },
    { key: "기사단-소울마스터", label: "소울마스터" },
    { key: "레지스탕스-데몬슬레이어", label: "데몬슬레이어" },
    { key: "레지스탕스-데몬어벤져", label: "데몬어벤져" },
  ],
  wizard: [
    { key: "마법사-전체 전직", label: "모험가 법사 전체" },
    { key: "마법사-아크메이지(불,독)", label: "아크메이지(불,독)" },
    { key: "마법사-아크메이지(썬,콜)", label: "아크메이지(썬,콜)" },
    { key: "마법사-비숍", label: "비숍" },
    { key: "기사단-플레임위자드", label: "플레임위자드" },
    { key: "에반-전체 전직", label: "에반" },
    { key: "루미너스-전체 전직", label: "루미너스" },
    { key: "레지스탕스-배틀메이지", label: "배틀메이지" },
    { key: "프렌즈 월드-키네시스", label: "키네시스" },
    { key: "일리움-전체 전직", label: "일리움" },
    { key: "라라-전체 전직", label: "라라" },
  ],
  archer: [
    { key: "궁수-전체 전직", label: "모험가 궁수 전체" },
    { key: "궁수-보우마스터", label: "보우마스터" },
    { key: "궁수-신궁", label: "신궁" },
    { key: "궁수-패스파인더", label: "패스파인더" },
    { key: "기사단-윈드브레이커", label: "윈드브레이커" },
    { key: "메르세데스-전체 전직", label: "메르세데스" },
    { key: "레지스탕스-와일드헌터", label: "와일드헌터" },
    { key: "카인-전체 전직", label: "카인" },
  ],
  thief: [
    { key: "도적-전체 전직", label: "모험가 도적 전체" },
    { key: "도적-나이트로드", label: "나이트로드" },
    { key: "도적-섀도어", label: "섀도어" },
    { key: "도적-듀얼블레이더", label: "듀얼블레이더" },
    { key: "기사단-나이트워커", label: "나이트워커" },
    { key: "팬텀-전체 전직", label: "팬텀" },
    { key: "레지스탕스-제논", label: "제논" },
    { key: "칼리-전체 전직", label: "카데나" },
    { key: "호영-전체 전직", label: "호영" },
    { key: "칼리-전체 전직", label: "칼리" },
  ],
  pirate: [
    { key: "해적-전체 전직", label: "모험가 해적 전체" },
    { key: "해적-캡틴", label: "캡틴" },
    { key: "해적-바이퍼", label: "바이퍼" },
    { key: "해적-캐논마스터", label: "캐논마스터" },
    { key: "기사단-스트라이커", label: "스트라이커" },
    { key: "은월-전체 전직", label: "은월" },
    { key: "레지스탕스-제논", label: "제논" },
    { key: "레지스탕스-메카닉", label: "메카닉" },
    { key: "레지스탕스-블래스터", label: "블래스터" },
    { key: "엔젤릭버스터-전체 전직", label: "엔젤릭버스터" },
    { key: "아크-전체 전직", label: "아크" },
  ],
};

export const WORLD_LIST: Record<
  string,
  { id: string; name: string; url: string }[]
> = {
  common: [
    {
      id: "전체월드",
      name: "전체월드",
      url: "/images/world/전체.png",
    },
    {
      id: "스카니아",
      name: "스카니아",
      url: "/images/world/스카니아.png",
    },
    {
      id: "루나",
      name: "루나",
      url: "/images/world/루나.png",
    },
    {
      id: "크로아",
      name: "크로아",
      url: "/images/world/크로아.png",
    },
    {
      id: "베라",
      name: "베라",
      url: "/images/world/베라.png",
    },
    {
      id: "제니스",
      name: "제니스",
      url: "/images/world/제니스.png",
    },
    {
      id: "유니온",
      name: "유니온",
      url: "/images/world/유니온.png",
    },
    {
      id: "엘리시움",
      name: "엘리시움",
      url: "/images/world/엘리시움.png",
    },
    {
      id: "이노시스",
      name: "이노시스",
      url: "/images/world/이노시스.png",
    },
    {
      id: "레드",
      name: "레드",
      url: "/images/world/레드.png",
    },
    {
      id: "오로라",
      name: "오로라",
      url: "/images/world/오로라.png",
    },
    {
      id: "아케인",
      name: "아케인",
      url: "/images/world/아케인.png",
    },
    {
      id: "노바",
      name: "노바",
      url: "/images/world/노바.png",
    },
  ],
  reboot: [
    {
      id: "리부트 전체",
      name: "리부트 전체",
      url: "/images/world/전체.png",
    },
    {
      id: "리부트",
      name: "리부트",
      url: "/images/world/리부트.png",
    },
    {
      id: "리부트2",
      name: "리부트2",
      url: "/images/world/리부트.png",
    },
  ],
};
