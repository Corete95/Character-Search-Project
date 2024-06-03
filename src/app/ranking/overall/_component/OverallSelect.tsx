"use client";

import React from "react";
import CommonSelect from "@/components/CommonSelect";
import { JOB_LIST, WORLD_LIST } from "../_constants/constants";
import { useSelectState } from "@/hooks/useSelectState";
import WorldCommonSelect from "@/components/WorldCommonSelect";

const OverallSelect = () => {
  const {
    selectedJobValue,
    selectedWorldValue,
    handleChange,
    isJobResetNeeded,
    isWorldResetNeeded,
  } = useSelectState();

  const selectCategories = [
    { key: "warrior", label: "전사" },
    { key: "wizard", label: "마법사" },
    { key: "archer", label: "궁수" },
    { key: "thief", label: "도적" },
    { key: "pirate", label: "해적" },
  ];

  const selectWorldCategories = [
    { key: "common", label: "월드" },
    { key: "reboot", label: "리부트" },
  ];

  return (
    <div className="mb-3">
      <div>
        <div className="flex gap-2 mb-3">
          {selectWorldCategories.map(({ key, label }) => (
            <WorldCommonSelect
              key={label}
              label={label}
              placeholder="서버 선택"
              items={WORLD_LIST[key]}
              selectedKey={
                isWorldResetNeeded(label) ? null : selectedWorldValue
              }
              onChange={(value) => handleChange("world", value, label)}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 ">
          {selectCategories.map(({ key, label }) => (
            <CommonSelect
              key={label}
              label={label}
              placeholder="선택"
              items={JOB_LIST[key]}
              selectedKey={isJobResetNeeded(label) ? null : selectedJobValue}
              onChange={(value) => handleChange("job", value, label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverallSelect;
