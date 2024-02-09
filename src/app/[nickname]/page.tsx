"use client";

import { getCharacter } from "@/hooks/queries/character";
import { getOcid } from "@/hooks/queries/ocid";
import { useQueries, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import React from "react";
import Loading from "./loading";
import UserStat from "./_component/UserStat";

const NickNamePage = () => {
  const params = usePathname();
  // const key = ["basic", "stat", "popularity", "hyper-stat"];
  const key = ["basic", "stat"];
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () => getOcid(params),
  // });

  // const queryResults = useQueries({
  //   queries: key.map((id) => ({
  //     queryKey: [id],
  //     queryFn: () => getCharacter(id, data?.ocid, ""),
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

  // console.log("queryResults", queryResults);
  // console.log("data", data);

  // if (queryResults.pending) return <div>asdasdasd</div>;

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-wrap m-10 tablet:flex-col">
          <div className="w-3/12 tablet:order-2">1</div>
          <div className="w-3/6 tablet:order-1">
            <UserStat />
          </div>
          <div className="w-3/12 tablet:order-3">3</div>
        </div>
      </Suspense>
    </div>
  );
};

export default NickNamePage;
