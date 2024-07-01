import { Metadata } from "next";
import { fetchData } from "@/hooks/queries/useNicknameQuery";
import { fetchOcid } from "@/hooks/queries/useOcidQuery";

export const generateMeta = async (
  nickname: string,
  day: string
): Promise<Metadata> => {
  try {
    const { ocid } = await fetchOcid(nickname);
    const userData = await fetchData("character/basic", ocid, day);

    return {
      title: `${decodeURIComponent(
        nickname
      )} - 메이플 정보 메소야 검색 | 메소야`,
      description:
        "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
      openGraph: {
        siteName: "메소야",
        type: "website",
        title: `${userData.character_name} - 메이플 정보 메소야 검색 | 메소야`,
        description:
          "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
        url: `https://mesoya.vercel.app/user/${decodeURIComponent(
          userData.character_name
        )}`,
        images: [
          {
            url: `${userData.character_image}`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: `에러 - 메이플 정보 메소야 검색 | 메소야`,
      description:
        "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
      openGraph: {
        siteName: "메소야",
        type: "website",
        title: `에러 - 메이플 정보 메소야 검색 | 메소야`,
        description:
          "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
        url: `https://mesoya.vercel.app`,
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
