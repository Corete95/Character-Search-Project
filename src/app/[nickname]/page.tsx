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
import Stat from "./Stat";
import Equipment from "./Equipment";

const NickNamePage = () => {
  const params = usePathname();
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const [step, setStep] = useState("stat");
  const tabs = [
    { key: "stat", title: "스탯", tsx: <Stat /> },
    { key: "equipment", title: "장비", tsx: <Equipment /> },
    { key: "skill", title: "스킬", tsx: <Equipment /> },
    { key: "union", title: "유니온", tsx: <Equipment /> },
  ];

  // const key = ["basic", "stat", "popularity", "hyper-stat"];
  // const key = ["basic", "hyper-stat", "stat", "ability"];
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () => getOcid(params),
  // });

  // const queryResults = useQueries({
  //   queries: key.map((id) => ({
  //     queryKey: [id],
  //     queryFn: () => getCharacter(id, data?.ocid, day),
  //     enabled: !!data?.ocid,
  //     // suspense: true,
  //   })),
  //   combine: (results) => {
  //     return {
  //       data: results.map((result) => result.data),
  //       pending: results.some((result) => result.isPending),
  //     };
  //   },
  // });
  const test = (item: any) => {
    console.log("item", item);
    setStep(item.key);
  };
  // console.log("queryResults", queryResults);
  console.log("step", step);

  // if (queryResults.pending) return <div>asdasdasd</div>;

  return (
    <div className="mt-4">
      {/* <Suspense fallback={<Loading />}> */}
      <div className="mb-4">
        <Tabs
          key="underlined"
          variant="underlined"
          aria-label="Tabs variants "
          // onSelectionChange={test}
        >
          {tabs.map((item) => (
            <Tab key={item.key} title={item.title} className="text-lg p-3" />
          ))}
        </Tabs>
      </div>
      {tabs.find((item) => item.key === step).tsx}
      {/* </Suspense> */}
    </div>
  );
};

export default NickNamePage;
