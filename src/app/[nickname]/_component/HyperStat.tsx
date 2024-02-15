"use client";

import React, { useState } from "react";

const HyperStat = ({ props }: any) => {
  const [presetNo, setPrestNo] = useState(props.use_preset_no);
  const pick = `hyper_stat_preset_${presetNo}`;
  return (
    <div className="bg-[#86929E] rounded-lg p-3">
      {props[pick].map((item: any, index: number) => (
        <div className="flex justify-between text-[14px]" key={index}>
          <span>{item.stat_type}</span>
          <span>Lv.{item.stat_level}</span>
        </div>
      ))}
    </div>
  );
};

export default HyperStat;
