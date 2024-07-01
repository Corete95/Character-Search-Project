import React from "react";
import type { Metadata } from "next";
import OverallList from "./_component/OverallList";
import OverallSelect from "./_component/OverallSelect";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "@/lib/dayjs-ssr";
import { fetchRanking } from "@/hooks/queries/useRankingQuery";
import { SearchParams } from "@/types/apis/guild.type";

export const metadata: Metadata = {
  title: "메소야 랭킹 | Mesoya",
  description: "메소야 통합 랭킹 페이지",
};

const page = async ({ searchParams }: SearchParams) => {
  const queryClient = new QueryClient();
  const day = dayjs().format("YYYY-MM-DD");

  const params = {
    date: day,
    page: searchParams.page || 1,
    class: searchParams.class || undefined,
    world_name: searchParams.world_name || undefined,
    world_type: searchParams.world_type || undefined,
  };

  await queryClient.prefetchQuery({
    queryKey: ["rank", params],
    queryFn: () => fetchRanking(params),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="max-w-1200 w-full mx-auto ">
        <div className="flex flex-wrap p-3">
          <div className="w-full ">
            <OverallSelect />
            <OverallList initialParams={params} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
