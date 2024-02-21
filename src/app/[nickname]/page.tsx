"use client";

import { getCharacter } from "@/hooks/queries/character";
import { getOcid } from "@/hooks/queries/ocid";
import { useQueries, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import React from "react";
import Loading from "./loading";
import UserInfo from "./_component/UserInfo";
import HyperStat from "./_component/HyperStat";
import UserStat from "./_component/UserStat";
import Ability from "./_component/Ability";

const NickNamePage = () => {
  const params = usePathname();
  // const key = ["basic", "stat", "popularity", "hyper-stat"];
  const key = ["basic", "hyper-stat", "stat", "ability"];
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getOcid(params),
  });

  const queryResults = useQueries({
    queries: key.map((id) => ({
      queryKey: [id],
      queryFn: () => getCharacter(id, data?.ocid, ""),
      enabled: !!data?.ocid,
      // suspense: true,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  console.log("queryResults", queryResults);
  // console.log("data", data);

  if (queryResults.pending) return <div>asdasdasd</div>;

  return (
    <div>
      {/* <Suspense fallback={<Loading />}> */}

      <div className="flex justify-center items-center w-3/6 m-auto tablet:w-full">
        <div className="w-full bg-asd pt-0 p-4 rounded-xl">
          <div className="text-title py-2">CHARACTER INFO</div>
          <UserInfo props={queryResults?.data[0]} />
        </div>
      </div>
      <div className="flex flex-wrap mt-8 tablet:flex-col mobile:flex-col">
        <div className="desktop:w-3/12 responsive_2 max-w-[330px] m-auto">
          <div className="w-full bg-asd pt-0 p-4 rounded-xl ">
            <div className="text-title py-2">HYPER STAT</div>
            <HyperStat props={queryResults?.data[1]} />
          </div>
        </div>
        <div className="desktop:w-3/6 responsive_1 bg-asd rounded-xl p-4">
          <div className="text-center p-1 rounded-t-xl bg-badge_1 ">STAT</div>
          <UserStat props={queryResults?.data[2]} />
        </div>

        <div className="desktop:w-3/12 responsive_3 max-w-[330px] m-auto">
          <div className="w-full bg-asd pt-0 p-4 rounded-xl ">
            <div className="text-title py-2">ABILITY</div>
            <Ability props={queryResults?.data[3]} />
          </div>
        </div>
      </div>
      {/* </Suspense> */}
    </div>
  );
};

export default NickNamePage;
