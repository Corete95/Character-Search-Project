import React from "react";
import { FinalStat } from "@/types/apis/stat";

const StatList = ({ stats }: { stats: FinalStat[] }) => (
  <div className="flex flex-wrap rounded-lg p-2 bg-white dark:bg-[#86929E]">
    {stats.map((item, idx) => (
      <div
        className="flex justify-between w-1/2 py-1 px-2 text-14 text-black dark:text-white mobile:w-full"
        key={idx}
      >
        <p>{item.stat_name}</p>
        <p>{item.stat_value}</p>
      </div>
    ))}
  </div>
);

export default StatList;
