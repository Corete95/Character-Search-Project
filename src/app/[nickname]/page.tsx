"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";

export async function getUsers(name: string) {
  console.log("sss", name);
  const url = `https://open.api.nexon.com/maplestory/v1/id?character_name=${name.slice(
    1
  )}`;
  const res = await fetch(url, {
    headers: {
      "x-nxopen-api-key": `${process.env.NEXT_PUBLIC_NEXON_KEY}`,
    },
  });
  const users = await res.json();
  console.log("user", users);
  return users;
}

const NickNamePage = ({ parmas, searchParams }: any) => {
  const params = usePathname();
  getUsers(params);
  const { data, isLoading, error } = useQuery({
    queryKey: "users",
    queryFn: () => getUsers(params),
  });
  console.log("parmas", decodeURI(params));
  if (isLoading) return <div>asdasdasd</div>;
  return <div>{data?.ocid}</div>;
};

export default NickNamePage;
