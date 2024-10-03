import React from "react";
import GuildSearch from "./_component/GuildSearch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "메소야 길드 | Mesoya",
  description: "메소야 길드 검색 페이지",
};

const page = () => {
  return (
    <div className="mx-auto min-h-[700px] max-w-1200">
      <div className="mobile:px-2">
        <GuildSearch />
      </div>
    </div>
  );
};

export default page;
