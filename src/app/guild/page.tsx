import React from "react";
import GuildSearch from "./_component/GuildSearch";

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
