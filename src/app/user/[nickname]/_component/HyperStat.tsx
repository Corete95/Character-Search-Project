"use client";

import { HyperStatPreset, HyperStatType } from "@/types/apis/hyper";
import { Tooltip } from "@nextui-org/react";
import React, { useState } from "react";

const HyperStat = ({ props }: { props: HyperStatType }) => {
  const [presetNo, setPrestNo] = useState(props.use_preset_no);
  const pick = `hyper_stat_preset_${presetNo}`;

  const onChangePrestNo = (no: string) => {
    setPrestNo(no);
  };

  return (
    <div className="bg-white dark:bg-[#86929E] rounded-lg p-3">
      {props[pick]?.map((item: HyperStatPreset, index: number) => (
        <div key={index}>
          {item.stat_increase ? (
            <Tooltip
              showArrow={true}
              placement="bottom"
              closeDelay={0}
              content={item.stat_increase}
            >
              <div className="flex justify-between text-14 leading-loose hover:bg-white_gray_100 dark:hover:bg-dark_bg_100">
                <span>{item.stat_type}</span>
                <span>Lv.{item.stat_level}</span>
              </div>
            </Tooltip>
          ) : (
            <div className="flex justify-between text-14 leading-loose">
              <span>{item.stat_type}</span>
              <span>Lv.{item.stat_level}</span>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-between mt-3 bg-white_gray_100 dark:bg-[#5c6874] text-14 px-5 rounded-xl">
        <span className="flex items-center">PRESETS</span>
        <div className="flex gap-3 py-1">
          {["1", "2", "3"].map((item: string, index: number) => (
            <button
              key={index}
              className={
                "w-5 bg-white dark:bg-[#788490]" +
                (item === presetNo
                  ? " border border-black dark:border-white rounded-sm"
                  : "")
              }
              onClick={() => onChangePrestNo(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between px-5 mt-2 rounded-xl text-14 bg-white_gray_100 dark:bg-[#5c6874]">
        <span>POINT</span>
        <span>{props[`hyper_stat_preset_${presetNo}_remain_point`]}</span>
      </div>
    </div>
  );
};

export default HyperStat;
