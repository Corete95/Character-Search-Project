import React from "react";
import GuildSearch from "../_component/GuildSearch";
import GuildSearchDetail from "./GuildSearchDetail";

const GuildSearchPage = ({ params }: { params: { name: string } }) => {
  return (
    <div className="mx-auto min-h-[700px] max-w-1200">
      <GuildSearch />
      <div>
        <GuildSearchDetail params={params.name} />
      </div>
    </div>
  );
};

export default GuildSearchPage;
