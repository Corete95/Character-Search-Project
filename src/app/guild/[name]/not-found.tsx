import React from "react";
import GuildSearch from "../_component/GuildSearch";

const NotFound = () => {
  return (
    <div className="mx-auto min-h-[700px] max-w-1200">
      <div className="my-10 flex flex-col items-center gap-2">
        <p className="text-2xl">길드를 찾지 못했습니다.</p>
        <p>2023년 12월 21일 이후 접속 기록이 있어야 조회가 가능합니다.</p>
      </div>
      <GuildSearch />
    </div>
  );
};

export default NotFound;
