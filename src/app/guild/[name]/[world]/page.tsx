import React from "react";
import type { Metadata } from "next";
import GuildDetail from "./GuildDetail";

export const metadata: Metadata = {
  title: "메소야 길드 | Mesoya",
  description: "메소야 길드 페이지",
};

const page = ({ params }: any) => {
  return (
    <div className="mx-auto w-full max-w-1200">
      <GuildDetail params={params} />
    </div>
  );
};

export default page;
