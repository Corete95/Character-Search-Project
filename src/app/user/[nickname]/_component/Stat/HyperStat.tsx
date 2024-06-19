"use client";

import { HyperStatPreset, HyperStatType } from "@/types/apis/hyper";
import React, { useState } from "react";
import TooltipWrapper from "../common/TooltipWrapper";
import PresetButtons from "../common/PresetButtons";

interface Props {
  hyper: HyperStatType;
}

const HyperStat = ({ hyper }: Props) => {
  const [presetNo, setPrestNo] = useState(hyper.use_preset_no);
  const pick = `hyper_stat_preset_${presetNo}`;

  const handleChangePreset = (no: string) => {
    setPrestNo(no);
  };

  return (
    <div className="bg-white dark:bg-[#86929E] rounded-lg p-3">
      {hyper[pick]?.map((item: HyperStatPreset, index: number) => (
        <div key={index}>
          <TooltipWrapper item={item} />
        </div>
      ))}
      <PresetButtons
        presetNo={presetNo}
        handleChangePreset={handleChangePreset}
      />
      <div className="flex justify-between px-5 mt-2 rounded-xl text-14px bg-white_gray_100 dark:bg-[#5c6874]">
        <span>POINT</span>
        <span>{hyper[`hyper_stat_preset_${presetNo}_remain_point`]}</span>
      </div>
    </div>
  );
};

export default HyperStat;
