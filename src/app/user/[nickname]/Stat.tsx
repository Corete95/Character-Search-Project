import React from "react";
import UserInfo from "./_component/UserInfo";
import HyperStat from "./_component/HyperStat";
import UserStat from "./_component/UserStat";
import Ability from "./_component/Ability";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getOcid } from "@/hooks/queries/ocid";
import { getCharacter } from "@/hooks/queries/character";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import dayjs from "dayjs";

const Stat = () => {
  const params = usePathname();
  const segment: any = useParams();
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const today = dayjs().format();
  const key = ["basic", "hyper-stat", "stat", "ability"];
  const { data, isLoading, isError } = useQuery({
    queryKey: [`user${today}`],
    queryFn: () => getOcid(segment.nickname),
    gcTime: 0,
  });
  console.log("segment", today);

  const queryResults = useQueries({
    queries: key.map((id) => ({
      queryKey: [id],
      queryFn: () => getCharacter(id, data?.ocid, day),
      enabled: !!data?.ocid,
      // suspense: true,
    })),
    combine: (results) => {
      console.log(results);
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
        error: results.some((result) => result.isError),
      };
    },
  });
  console.log("error", isError);
  // if (!isError) return <div>에러123</div>;
  if (queryResults.error) return <div>에러</div>;
  if (queryResults.pending) return <div>로딩중....</div>;

  return (
    <div>
      <div className="flex justify-center items-center w-3/6 m-auto tablet:w-full mobile:w-full">
        <div className="w-full bg-white_gray_100 dark:bg-dark_bg_100 pt-0 p-4 rounded-xl shadow-md border border-[#dcdcdc] dark:border-0">
          <div className="text-lime-500 dark:text-title py-2">
            CHARACTER INFO
          </div>
          <UserInfo props={queryResults?.data[0]} />
        </div>
      </div>
      <div className="flex flex-wrap mt-4 tablet:flex-col mobile:flex-col">
        <div className="desktop:w-3/12 responsive_2 ">
          <div className="w-full bg-white_gray_100 dark:bg-dark_bg_100 pt-0 p-4 rounded-xl shadow-md border border-[#dcdcdc] dark:border-0">
            <div className="text-lime-500 dark:text-title py-2">HYPER STAT</div>
            <HyperStat props={queryResults?.data[1]} />
          </div>
        </div>
        <div className="desktop:w-3/6 responsive_1 rounded-xl p-4 bg-white_gray_100 dark:bg-dark_bg_100 shadow-md border border-[#dcdcdc] dark:border-0">
          <div className="text-center p-1 rounded-t-xl bg-white dark:bg-badge_1 ">
            STAT
          </div>
          <UserStat props={queryResults?.data[2]} />
        </div>

        <div className="desktop:w-3/12 responsive_3">
          <div className="w-full pt-0 p-4 rounded-xl bg-white_gray_100 dark:bg-dark_bg_100 shadow-md border border-[#dcdcdc] dark:border-0">
            <div className="text-lime-500 dark:text-title py-2">ABILITY</div>
            <Ability props={queryResults?.data[3]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;
