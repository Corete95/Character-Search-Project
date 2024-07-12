import React, { useCallback, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { EquipmentSet } from "@/types/apis/item.type";

interface Props {
  set: EquipmentSet[];
}

const SetEffects = ({ set }: Props) => {
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | boolean>(
    false,
  );

  const handleMouseEnter = useCallback((index: number) => {
    setOpenTooltipIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpenTooltipIndex(false);
  }, []);

  return (
    <div className="flex h-full w-full min-w-[260px] flex-col items-center border border-userBorder bg-white py-3 shadow-md dark:border-0 dark:bg-dark_bg_100">
      <p>세트 효과</p>
      <div>
        {set.map((item, index: number) => (
          <Tooltip
            key={index}
            showArrow={true}
            placement="right"
            closeDelay={0}
            isOpen={openTooltipIndex === index}
            onOpenChange={(open) => {
              if (open) {
                setOpenTooltipIndex(index);
              } else {
                setOpenTooltipIndex(false);
              }
            }}
            content={
              <div
                className="max-h-[400px] overflow-x-auto px-2 pt-3"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.set_option_full.map((set, index) => (
                  <div
                    key={index}
                    className="mb-2 whitespace-pre-line text-12px leading-4"
                  >
                    <p className="text-[#ccff00]">{set.set_count}세트효과</p>
                    <p
                      className={`${
                        item.total_set_count < set.set_count
                          ? "text-[#00000059] dark:text-[#ffffff59]"
                          : ""
                      }`}
                    >
                      {set.set_option.replace(/, /g, "\n")}
                    </p>
                  </div>
                ))}
              </div>
            }
          >
            <div
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="flex h-10 items-center rounded px-2 hover:bg-[#ffffff29]"
            >
              <p className="text-lg">
                {item.total_set_count}
                <span className="ml-2 text-sm">
                  {item.set_name.replace(/\([^\)]*\)/g, "")}
                </span>
              </p>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default SetEffects;
