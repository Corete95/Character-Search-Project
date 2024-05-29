"use client";

import React, { useCallback } from "react";
import { getKeyValue } from "@nextui-org/react";
import { RankingListType } from "@/types/apis/rank.type";
import { useSearchParams } from "next/navigation";
import { useRankingQuery } from "@/hooks/queries/useRankingQuery";
import { OVERALL_COLUMNS } from "@/app/ranking/overall/_constants/constants";
import GenericTable from "@/components/GenericTable";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";

const OverallList = () => {
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const searchParams = useSearchParams();

  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const classParam = searchParams.get("class") || undefined;
  const { data, isLoading, isError } = useRankingQuery(
    day,
    pageParam,
    classParam
  );

  const renderCell = useCallback(
    (user: RankingListType, columnKey: string | number) => {
      switch (columnKey) {
        case "character_name":
          return (
            <Link href={`/user/${user.character_name}`} className="flex gap-1">
              <Image
                src="/images/main.jpg"
                alt=""
                className="rounded-lg"
                width={14}
                height={14}
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

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;

  return (
    <div>
      <GenericTable
        columns={OVERALL_COLUMNS}
        data={data}
        renderCell={renderCell}
      />
      <Pagination currentPage={pageParam} />
    </div>
  );
};

export default OverallList;
