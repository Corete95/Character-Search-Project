import React from "react";
import type { Metadata } from "next";
import OverallList from "./_component/OverallList";
import OverallSelect from "./_component/OverallSelect";
import { QueryClient } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "메소야 랭킹 | Mesoya",
  description: "메소야 통합 랭킹 페이지",
};

const page = async () => {
  return (
    <div className="max-w-1200 w-full mx-auto ">
      <div className="flex flex-wrap p-3">
        <div className="w-full ">
          <OverallSelect />
          <OverallList />
        </div>
      </div>
    </div>
  );
};

export default page;
