"use client";

import { getCharacter } from "@/hooks/queries/character";
import { getOcid } from "@/hooks/queries/ocid";
import { useQueries, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import React from "react";
import Loading from "./loading";
import UserInfo from "./_component/UserInfo";
import HyperStat from "./_component/HyperStat";
import UserStat from "./_component/UserStat";
import Ability from "./_component/Ability";
import dayjs from "dayjs";

const NickNamePage = () => {
  const params = usePathname();
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const [step, setStep] = useState(0);
  const tabs = [
    { key: "stat", title: "스탯" },
    { key: "equipment", title: "장비" },
    { key: "skill", title: "스킬" },
    { key: "union", title: "유니온" },
  ];
  // const key = ["basic", "stat", "popularity", "hyper-stat"];
  const key = ["basic", "hyper-stat", "stat", "ability"];
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getOcid(params),
  });

  const queryResults = useQueries({
    queries: key.map((id) => ({
      queryKey: [id],
      queryFn: () => getCharacter(id, data?.ocid, day),
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
    <div className="mt-4">
      {/* <Suspense fallback={<Loading />}> */}
      <div className="mb-4">
        <Tabs key="underlined" variant="underlined" aria-label="Tabs variants ">
          {tabs.map((item) => (
            <Tab key={item.key} title={item.title} className="text-lg p-3" />
          ))}
        </Tabs>
      </div>
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
      {/* </Suspense> */}
    </div>
  );
};

export default NickNamePage;
