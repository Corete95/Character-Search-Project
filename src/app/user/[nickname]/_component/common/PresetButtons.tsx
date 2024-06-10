import React from "react";

const PresetButtons = ({
  presetNo,
  handleChangePreset,
}: {
  presetNo: string;
  handleChangePreset: (no: string) => void;
}) => (
  <div className="flex justify-between mt-3 bg-white_gray_100 dark:bg-[#5c6874] text-14 px-5 rounded-xl">
    <span className="flex items-center">PRESETS</span>
    <div className="flex gap-3 py-1">
      {["1", "2", "3"].map((item, index) => (
        <button
          key={index}
          className={`w-5 bg-white dark:bg-[#788490] ${
            item === presetNo
              ? "border border-black dark:border-white rounded-sm"
              : ""
          }`}
          onClick={() => handleChangePreset(item)}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

export default PresetButtons;
