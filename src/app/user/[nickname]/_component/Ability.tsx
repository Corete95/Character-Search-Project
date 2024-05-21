"use client";

import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { abilityColor } from "../../../../../utility/utils";

const Ability = ({ props }: any) => {
  const [presetNo, setPrestNo] = useState(props.preset_no);

  const onChangePrestNo = (no: number) => {
    setPrestNo(no);
  };

  const color: { [key: string]: string } = {
    레전드리: "bg-legendary",
    유니크: "bg-unique",
    에픽: "bg-epic",
    레어: "bg-rare",
  };

  return (
    <div className="flex flex-col gap-1 bg-[#FEFEFF] rounded-lg p-2 ">
      <div
        className={`flex items-center p-2 rounded-lg text-white ${
          color[props[`ability_preset_${presetNo}`]?.ability_preset_grade ?? ""]
        }`}
      >
        <FaBookmark />
        <span className="ml-2">
          {`${
            props[`ability_preset_${presetNo}`]?.ability_preset_grade
          } 어빌리티` ?? ""}
        </span>
      </div>
      {props[`ability_preset_${presetNo}`]?.ability_info &&
        props[`ability_preset_${presetNo}`]?.ability_info?.map(
          (item: any, idx: number) => (
            <div
              className={`px-2 ${
                color[item.ability_grade]
              } rounded-md text-center text-white text-14`}
              key={idx}
            >
              {item.ability_value}
            </div>
          )
        )}
      <div className="flex justify-between mt-2 bg-white_gray_100 dark:bg-[#bdc4ca] text-14 px-5 rounded-xl">
        <span className="flex items-center">PRESETS</span>
        <div className="flex gap-3 py-1">
          {[1, 2, 3].map((item: number, index: number) => (
            <button
              key={index}
              className={
                "w-5 bg-white dark:bg-[#788490]" +
                (item === presetNo
                  ? " border  border-black dark:border-white rounded-sm"
                  : "")
              }
              onClick={() => onChangePrestNo(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ability;
