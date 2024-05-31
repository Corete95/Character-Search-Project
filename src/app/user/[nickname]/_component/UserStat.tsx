import React from "react";
import { geKoreanNumber } from "../../../../utility/utils";
import { FinalStat, UserStatType } from "@/types/apis/stat";
import {
  bottomUserStat,
  middleUserStat,
  topUserStat,
} from "../../../../utility/userStatUtil";

type Props = {
  props: UserStatType;
};

const UserStat = ({ props }: Props) => {
  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="flex justify-between items-center p-3 bg-white dark:bg-[#3d6076] rounded-lg">
        <p className="text-base text-[#adc8d1] font-bold">전투력</p>
        <div className="text-zinc-600 dark:text-[#F2F3D1] font-bold text-2xl">
          {geKoreanNumber(Number(props.final_stat[42].stat_value))}
        </div>
        <div className="w-[40px]"></div>
      </div>
      <div className="flex flex-wrap rounded-lg p-2 bg-white dark:bg-[#86929E] ">
        {topUserStat(props).map((item: FinalStat, idx: number) => (
          <div
            className="flex justify-between w-1/2 py-1 px-2 text-14 text-black dark:text-white mobile:w-full"
            key={idx}
          >
            <p>{item.stat_name}</p>
            <p>{item.stat_value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap rounded-lg p-2 bg-white dark:bg-[#6b7785] ">
        {middleUserStat(props).map((item: FinalStat, idx: number) => (
          <div
            className="flex justify-between w-1/2 py-1 px-2 text-14 text-black dark:text-white mobile:w-full"
            key={idx}
          >
            <p>{item.stat_name}</p>
            <p>{item.stat_value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap bg-white dark:bg-[#6b7785] rounded-lg p-2">
        {bottomUserStat(props).map((item: FinalStat, idx: number) => (
          <div
            className="flex justify-between w-1/2 py-1 px-2 text-14 text-black dark:text-white mobile:w-full"
            key={idx}
          >
            <p>{item.stat_name}</p>
            <p>{item.stat_value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStat;
