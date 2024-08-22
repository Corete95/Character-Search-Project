import { Metadata } from "next";

export const generateMeta = async (name: string): Promise<Metadata> => {
  try {
    return {
      title: `${decodeURIComponent(name)} | 메소야 메이플 길드 검색 | 메소야 길드 정보 | 메소야`,
      description:
        "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
      openGraph: {
        siteName: "메소야",
        type: "website",
        title: `${decodeURIComponent(name)} | 메소야 메이플 길드 검색 | 메소야 길드 정보 | 메소야`,
        description:
          "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
        url: `${process.env.NEXT_PUBLIC_SITE_NAME}/guild/${decodeURIComponent(
          name,
        )}`,
      },
    };
  } catch (error) {
    return {
      title: `에러 | 메소야 메이플 길드 검색 | 메소야 길드 정보 | 메소야`,
      description:
        "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
      openGraph: {
        siteName: "메소야",
        type: "website",
        title: `에러 | 메소야 메이플 길드 검색 | 메소야 길드 정보 | 메소야`,
        description:
          "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
        url: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
        images: [
          {
            url: "/images/main.jpg",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }
};
