import SearchBox from "@/components/SearchBox";
import Image from "next/image";
import MainRanking from "./_main/MainRanking";
import dayjs from "@/lib/dayjs-ssr";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchMainRanking } from "@/hooks/queries/useMainRankingQuery";

const home = async () => {
  const queryClient = new QueryClient();
  const day = dayjs().format("YYYY-MM-DD");

  const paramsList = [0, 1].map((key) => ({
    queryKey: ["mainRanking", key],
    queryFn: () => fetchMainRanking({ date: day, world_type: key }),
  }));

  await Promise.all(
    paramsList.map((params) =>
      queryClient.prefetchQuery({
        queryKey: params.queryKey,
        queryFn: params.queryFn,
      })
    )
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="">
      <div className="relative">
        <div className="max-w-1200 h-[500px] mx-auto flexCenter">
          <div className="h-[520px] absolute w-full top-0">
            <Image
              alt=""
              src="/images/main.jpg"
              style={{ objectFit: "cover" }}
              fill
              priority
            />
            <div className="absolute w-full h-full top-0 left-0 dark:bg-[#00000080]"></div>
          </div>
          <div className="w-full flexCenter flex-col gap-4 z-10">
            <h1 className="text-6xl font-bold dark:text-white">Mesoya</h1>
            <p className="dark:text-white">캐릭터 정보 검색 서비스</p>
            <div className="desktop:w-[650px] w-full px-5">
              <SearchBox />
            </div>
          </div>
        </div>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <div className="relative max-w-1200 w-full mx-auto ">
          <MainRanking day={day} />
        </div>
      </HydrationBoundary>
    </div>
  );
};
export default home;
