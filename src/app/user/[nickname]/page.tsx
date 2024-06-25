import React, { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { fetchOcid } from "@/hooks/queries/useOcidQuery";
import { fetchData } from "@/hooks/queries/useNicknameQuery";

export const generateMetadata = async ({
  params,
}: {
  params: { nickname: string };
}): Promise<Metadata> => {
  const { ocid } = await fetchOcid(params.nickname);
  const userData = await fetchData("character/basic", ocid, "2024-06-24");

  return {
    title: `${decodeURIComponent(
      params.nickname
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
};

const TabsComponent = dynamic(() => import("./_component/TabsComponent"), {
  ssr: false,
});

const NickNamePage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <TabsComponent />
      </Suspense>
    </div>
  );
};

export default NickNamePage;
