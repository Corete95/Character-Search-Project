import React from "react";
import type { Metadata } from "next";
import GuildSelect from "./_component/GuildSelect";
import GuildList from "./_component/GuildList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "@/lib/dayjs-ssr";
import { fetchGuild } from "@/hooks/queries/useGuildQuery";
import { SearchParams } from '@/types/apis/guild.type';

export const metadata: Metadata = {
  title: "메소야 랭킹 | Mesoya",
  description: "메소야 길드 랭킹 페이지",
};

const page = async ({ searchParams }: SearchParams) => {
  const queryClient = new QueryClient();
  const day = dayjs().format("YYYY-MM-DD");

  const params = {
    date: day,
    page: searchParams.page || 1,
    world_name: searchParams.world_name || undefined,
    ranking_type: searchParams.ranking_type || "0",
  };

  await queryClient.prefetchQuery({
    queryKey: ["guild", params],
    queryFn: () => fetchGuild(params),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="max-w-1200 w-full mx-auto ">
        <div className="flex flex-wrap p-3 ">
          <div className="w-full">
            <GuildSelect />
            <GuildList initialParams={params} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
