"use client";

import React, { useCallback, useMemo } from "react";
import { getKeyValue } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { GUILD_COLUMNS } from "../_constants/constants";
import { useGuildQuery } from "@/hooks/queries/useGuildQuery";
import { formatNumber } from "@/utility/utils";
import { GuildListType } from "@/types/apis/guild.type";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import GenericTable from "@/components/GenericTable";
import Loading from "../../overall/_component/Loading";

const GuildList = () => {
  const day = dayjs().format("YYYY-MM-DD");
  const searchParams = useSearchParams();

  const params = useMemo(
    () => ({
      date: day,
      page: parseInt(searchParams.get("page") || "1", 10),
      world_name: searchParams.get("world_name") || undefined,
      ranking_type: searchParams.get("ranking_type") || "0",
    }),
    [day, searchParams]
  );

  const { data, isLoading, isError } = useGuildQuery(params);

  const renderCell = useCallback(
    (user: GuildListType, columnKey: string | number) => {
      switch (columnKey) {
        case "guild_name":
          return (
            <Link
              href={`/user/${user.guild_name}`}
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
              {user.guild_name}
            </Link>
          );
        case "guild_master_name":
          return (
            <Link href={`/user/${user.guild_master_name}`}>
              {user.guild_master_name}
            </Link>
          );
        case "guild_point":
          return getKeyValue(formatNumber(user.guild_point), columnKey);
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
        columns={GUILD_COLUMNS}
        data={data}
        renderCell={renderCell}
      />
      <Pagination currentPage={params.page} />
    </div>
  );
};

export default GuildList;
