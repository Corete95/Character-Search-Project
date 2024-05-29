"use client";

import React from "react";
import CommonSelect from "@/components/CommonSelect";
import { JOB_LIST } from "../_constants/constants";
import { useSelectState } from "@/hooks/useSelectState";

const OverallSelect = () => {
  const { selectedValue, handleChange, isResetNeeded } = useSelectState();

  const selectCategories = [
    { key: "warrior", label: "전사" },
    { key: "wizard", label: "마법사" },
    { key: "archer", label: "궁수" },
    { key: "thief", label: "도적" },
    { key: "pirate", label: "해적" },
  ];

  return (
    <div className="flex gap-2 mb-3">
      {selectCategories.map(({ key, label }) => (
        <CommonSelect
          key={label}
          label={label}
          placeholder="선택"
          items={JOB_LIST[key]}
          selectedKey={isResetNeeded(label) ? null : selectedValue}
          onChange={(value) => handleChange(value, label)}
        />
      ))}
    </div>
  );
};

export default OverallSelect;
