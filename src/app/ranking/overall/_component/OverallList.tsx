"use client";

import React, { useCallback, useMemo } from "react";
import { getKeyValue } from "@nextui-org/react";
import { RankingListType } from "@/types/apis/rank.type";
import { useSearchParams } from "next/navigation";
import { useRankingQuery } from "@/hooks/queries/useRankingQuery";
import { OVERALL_COLUMNS } from "@/app/ranking/overall/_constants/constants";
import Loading from "@/app/ranking/overall/_component/Loading";
import GenericTable from "@/components/GenericTable";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { InitialParams } from "@/types/apis/guild.type";

const OverallList = ({ initialParams }: { initialParams: InitialParams }) => {
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const searchParams = useSearchParams();
  const params = useMemo(() => initialParams, [day, searchParams]);

  const { data, isLoading, isError } = useRankingQuery(params);

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
                className="rounded-lg mobile:w-3 mobile:h-3"
                width={18}
                height={18}
                priority
              />
              {user.character_name}
            </Link>
          );
        case "character_popularity":
          return (
            <div className="mobile:hidden">{user.character_popularity}</div>
          );
        default:
          return getKeyValue(user, columnKey);
      }
    },
    []
  );

  if (isLoading) return <Loading />;
  if (isError) return <div>에러</div>;

  return (
    <div>
      <GenericTable
        columns={OVERALL_COLUMNS}
        data={data}
        renderCell={renderCell}
        tableStyle="[&>div]:p-0 [&>div]:mt-6 bg-modeWhite dark:bg-dark_gray px-3 rounded-lg"
      />
      <Pagination currentPage={params.page} />
    </div>
  );
};

export default OverallList;
