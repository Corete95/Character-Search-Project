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
          `ranking/overall?page=1&world_name=리부트+전체&world_type=1`,
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
                className="rounded-lg object-scale-down mobile:h-3 mobile:w-3"
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
    [],
  );

  if (pending) return <div>로딩</div>;
  if (error) return <div>에러</div>;

  return (
    <div className="rounded-lg bg-modeWhite px-3 pt-4 dark:bg-dark_gray">
      <section className="flex flex-wrap justify-center gap-5">
        {rankingData.map((item) => (
          <article className="w-full desktop:flex-1" key={item.title}>
            <div className="flex items-center justify-between rounded-t-md bg-white px-5 py-3 text-sm shadow-small dark:bg-rankingDark">
              <p>
                {today} <span className="font-bold">{item.title} 월드</span>{" "}
                랭킹
              </p>
              <div
                className="cursor-pointer rounded-3xl border border-[#e9eaed] px-4 py-1 text-xs hover:bg-[#e9eaed29] dark:border-[#e9eaed29]"
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
