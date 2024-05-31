export const GUILD_COLUMNS = [
  {
    key: "ranking",
    label: "순위",
    columns: "30px",
  },
  {
    key: "guild_name",
    label: "길드명",
    columns: "100px",
  },
  {
    key: "guild_level",
    label: "길드레벨",
    columns: "50px",
  },
  {
    key: "guild_master_name",
    label: "길드마스터",
    columns: "150px",
  },
  {
    key: "guild_point",
    label: "점수",
    columns: "70px",
  },
];

export const GUILDLIST: Record<
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
  item: [
    {
      id: "0",
      name: "주간 명성치",
      url: "/images/world/전체.png",
    },
    {
      id: "1",
      name: "플래그 레이스",
      url: "/images/world/리부트.png",
    },
    {
      id: "2",
      name: "지하 수로",
      url: "/images/world/리부트.png",
    },
  ],
};
