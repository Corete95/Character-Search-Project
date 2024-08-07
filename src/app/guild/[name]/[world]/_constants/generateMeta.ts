import { Metadata } from "next";
import {
  fetchGuildBasic,
  fetchGuildId,
} from "@/hooks/queries/useGuildBasicQuery";

export const generateMeta = async (
  nickname: string,
  world: string,
): Promise<Metadata> => {
  try {
    const guildId = await fetchGuildId(nickname, world);
    const guildData = await fetchGuildBasic(guildId.oguild_id);

    return {
      title: `${guildData.guild_name}@${guildData.world_name} - 메이플 길드 정보 | 메소야`,
      description:
        "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
      openGraph: {
        siteName: "메소야",
        type: "website",
        title: `${guildData.guild_name}@${guildData.world_name} 메이플 길드 정보 | 메소야`,
        description:
          "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
        url: `https://mesoya.vercel.app/guild/${decodeURIComponent(
          guildData.guild_name,
        )}/${decodeURIComponent(guildData.world_name)}`,
      },
    };
  } catch (error) {
    return {
      title: `에러 - 메이플 길드 정보 메소야 검색 | 메소야`,
      description:
        "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
      openGraph: {
        siteName: "메소야",
        type: "website",
        title: `에러 - 메이플 길드 정보 메소야 검색  | 메소야`,
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
