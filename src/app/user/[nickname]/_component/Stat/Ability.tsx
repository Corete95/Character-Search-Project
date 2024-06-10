"use client";

import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import PresetButtons from "../common/PresetButtons";

interface Props {
  preset_no: number;
  [key: string]: any;
}

const Ability = ({ ability }: { ability: Props }) => {
  const [presetNo, setPresetNo] = useState(String(ability.preset_no));
  const color: { [key: string]: string } = {
    레전드리: "bg-legendary",
    유니크: "bg-unique",
    에픽: "bg-epic",
    레어: "bg-rare",
  };

  const handleChangePresetNo = (no: string) => {
    setPresetNo(no);
  };

  const preset = ability[`ability_preset_${presetNo}`];

  return (
    <div className="flex flex-col gap-1 bg-[#FEFEFF] rounded-lg p-2 ">
      <div
        className={`flex items-center p-2 rounded-lg text-white ${
          color[preset?.ability_preset_grade ?? ""]
        }`}
      >
        <FaBookmark />
        <span className="ml-2">
          {`${preset?.ability_preset_grade} 어빌리티` ?? ""}
        </span>
      </div>
      {preset?.ability_info?.map((item: any, idx: number) => (
        <div
          key={idx}
          className={`px-2 ${
            color[item.ability_grade]
          } rounded-md text-center text-white text-14`}
        >
          {item.ability_value}
        </div>
      ))}
      <PresetButtons
        presetNo={presetNo}
        handleChangePreset={handleChangePresetNo}
      />
    </div>
  );
};

export default Ability;
