"use client";

import React from "react";
import { useGuildRankingQuery } from "@/hooks/queries/useGuildRankingQuery";
import Image from "next/image";
import Link from "next/link";
import { GuildListType } from "@/types/apis/guild.type";

const GuildSearchDetail = ({ params }: any) => {
  const { data, isLoading, isError, error } = useGuildRankingQuery(
    "2023-12-22",
    params,
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.ranking.map((item: GuildListType, index: number) => (
          <Link
            key={index}
            href={`/guild/${item.guild_name}/${item.world_name}`}
            className={`userContainer cursor-pointer p-5 shadow-lg hover:shadow-xl`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="relative h-15px w-15px min-w-15px">
                  <Image
                    src={`/images/world/${item?.world_name}.png`}
                    alt={`${item?.world_name} 이미지`}
                    className="rounded-lg mobile:h-3 mobile:w-3"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    unoptimized
                  />
                </div>
                <span className="line-clamp-1 text-sm">{item.world_name}</span>
              </div>
              <span
                className={`text-sm font-semibold text-orange-500 dark:text-orange-400`}
              >
                Lv.{item.guild_level}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold">{item.guild_name}</h3>
              <p className={`text-gray-600 dark:text-gray-400 text-sm`}>
                마스터 : {item.guild_master_name}
              </p>
              <p className="text-sm">길드원 {item.guild_member_count}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GuildSearchDetail;
