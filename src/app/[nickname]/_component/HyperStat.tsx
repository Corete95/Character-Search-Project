"use client";

import { HyperStatPreset, HyperStatType } from "@/types/apis/hyper";
import React, { useState } from "react";

const HyperStat = ({ props }: { props: HyperStatType }) => {
  const [presetNo, setPrestNo] = useState(props.use_preset_no);
  const pick = `hyper_stat_preset_${presetNo}`;

  const onChangePrestNo = (no: string) => {
    setPrestNo(no);
  };

  return (
    <div className="bg-[#86929E] rounded-lg p-3">
      {props[pick].map((item: HyperStatPreset, index: number) => (
        <div className="flex justify-between text-14 leading-loose" key={index}>
          <span>{item.stat_type}</span>
          <span>Lv.{item.stat_level}</span>
        </div>
      ))}
      <div className="flex justify-between mt-3 bg-[#5c6874] text-14 px-5 rounded-xl">
        <span className="flex items-center">PRESETS</span>
        <div className="flex gap-3 py-1">
          {["1", "2", "3"].map((item: string, index: number) => (
            <button
              key={index}
              className={
                "w-5 bg-[#788490]" +
                (item === presetNo ? " border border-white rounded-sm" : "")
              }
              onClick={() => onChangePrestNo(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between px-5 mt-2 rounded-xl text-14 bg-[#5c6874]">
        <span>POINT</span>
        <span>{props[`hyper_stat_preset_${presetNo}_remain_point`]}</span>
      </div>
    </div>
  );
};

export default HyperStat;
