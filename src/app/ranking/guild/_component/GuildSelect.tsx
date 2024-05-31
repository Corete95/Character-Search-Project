"use client";
import React from "react";
import { GUILDLIST } from "../_constants/constants";
import WorldCommonSelect from "@/components/WorldCommonSelect";
import { useGuildSelectState } from "@/hooks/useGuildSelect";

const GuildSelect = () => {
  const { selectedWorldValue, selectedRankingType, handleChange } =
    useGuildSelectState();

  const selectCategories = [
    { key: "common", label: "월드" },
    { key: "item", label: "항목" },
  ];

  return (
    <div className="mb-3">
      <div>
        <div className="flex gap-2 mb-3">
          {selectCategories.map(({ key, label }) => (
            <WorldCommonSelect
              key={label}
              label={label}
              placeholder="선택"
              items={GUILDLIST[key]}
              selectedKey={
                key === "common" ? selectedWorldValue : selectedRankingType
              }
              onChange={(value) =>
                handleChange(key === "common" ? "world" : "ranking", value)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuildSelect;
