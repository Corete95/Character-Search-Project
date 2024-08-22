import React from "react";
import GuildSearch from "../_component/GuildSearch";
import GuildSearchDetail from "./GuildSearchDetail";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { fetchGuildRanking } from "@/hooks/queries/useGuildRankingQuery";
import { generateMeta } from "./_constants/generateMeta";

export const generateMetadata = async ({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> => {
  return await generateMeta(params.name);
};

const GuildSearchPage = async ({ params }: { params: { name: string } }) => {
  const queryClient = new QueryClient();
  const day = "2023-12-22";

  await queryClient.prefetchQuery({
    queryKey: ["guildRanking", params.name, day],
    queryFn: () => fetchGuildRanking(day, params.name),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="mx-auto min-h-[700px] max-w-1200">
      <div className="mobile:px-2">
        <GuildSearch />
        <HydrationBoundary state={dehydratedState}>
          <div>
            <GuildSearchDetail params={params.name} />
          </div>
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default GuildSearchPage;
