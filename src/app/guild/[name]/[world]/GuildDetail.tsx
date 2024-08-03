"use client";

import React from "react";
import { useGuildBasicQuery } from "../../../../hooks/queries/useGuildBasicQuery";
import GuildList from "./_component/GuildList";

const GuildDetail = ({ params }: any) => {
  const { data, isLoading, isError, error } = useGuildBasicQuery(
    params.name,
    params.world,
  );

  console.log("data12312", data);
  return (
    <div className="mt-3 px-2">
      <div className="h-[300px] w-full bg-slate-500">길드 데이터 자리</div>
      <GuildList list={data?.guild_member} />
    </div>
  );
};

export default GuildDetail;
