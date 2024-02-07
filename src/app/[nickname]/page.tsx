"use client";

import { getBasic } from "@/hooks/queries/basic";
import { getOcid } from "@/hooks/queries/ocid";
import { useQueries, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";

const NickNamePage = () => {
  const params = usePathname();
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getOcid(params),
  });

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["basic"],
        queryFn: () => getBasic(data?.ocid),
        enabled: !!data?.ocid,
      },
    ],
  });

  console.log("parmas", decodeURI(params));

  if (isLoading) return <div>asdasdasd</div>;

  return <div>{data?.ocid}</div>;
};

export default NickNamePage;
