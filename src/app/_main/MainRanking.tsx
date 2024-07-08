"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import GenericTable from "@/components/GenericTable";
import dayjs from "@/lib/dayjs-ssr";
import { useMainRankingQuery } from "@/hooks/queries/useMainRankingQuery";
import { RankingListType } from "@/types/apis/rank.type";
import { MAIN_OVERALL_COLUMNS } from "../ranking/overall/_constants/constants";
import { getKeyValue } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const MainRanking = ({ day }: { day: string }) => {
  const router = useRouter();
  const today = dayjs().format("M월 D일");
  const { overall, reboot, pending, error } = useMainRankingQuery({
    date: day,
  });
  const rankingData = [
    { title: "일반", data: overall },
    { title: "리부트", data: reboot },
  ];

  const onClickViewMoreRankings = (type: string) => {
    type === "일반"
      ? router.push(`/ranking/overall?page=1&world_name=전체월드&world_type=0`)
      : router.push(
          `ranking/overall?page=1&world_name=리부트+전체&world_type=1`
        );
  };

  const renderCell = useCallback(
    (user: RankingListType, columnKey: string | number) => {
      switch (columnKey) {
        case "character_name":
          return (
            <Link
              href={`/user/${user.character_name}`}
              className="flex items-center gap-1 mobile:text-xs"
            >
              <Image
                src={`/images/world/${user?.world_name}.png`}
                alt={`${user?.world_name} 이미지`}
                className="rounded-lg mobile:w-3 mobile:h-3 object-scale-down"
                width={18}
                height={18}
                priority
              />
              {user.character_name}
            </Link>
          );

        default:
          return getKeyValue(user, columnKey);
      }
    },
    []
  );

  if (pending) return <div>로딩</div>;

  return (
    <div className="px-3 rounded-lg pt-4 bg-modeWhite dark:bg-dark_gray">
      <section className="flex justify-center flex-wrap gap-5 ">
        {rankingData.map((item) => (
          <article className="desktop:flex-1 w-full" key={item.title}>
            <div className="flex justify-between items-center px-5 py-3 shadow-small text-sm rounded-t-md bg-white dark:bg-rankingDark">
              <p>
                {today} <span className="font-bold">{item.title} 월드</span>{" "}
                랭킹
              </p>
              <div
                className="border border-[#e9eaed] dark:border-[#e9eaed29] px-4 py-1 rounded-3xl text-xs cursor-pointer hover:bg-[#e9eaed29]"
                onClick={() => onClickViewMoreRankings(item.title)}
              >
                더 보기
              </div>
            </div>
            <GenericTable
              columns={MAIN_OVERALL_COLUMNS}
              data={item.data}
              renderCell={renderCell}
              tableStyle="[&>div]:rounded-none"
            />
          </article>
        ))}
      </section>
    </div>
  );
};

export default MainRanking;
