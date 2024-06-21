import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { EquipmentSet } from "@/types/apis/item.type";

interface Props {
  set: EquipmentSet[];
}

const SetEffects = ({ set }: Props) => {
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | boolean>(
    false
  );

  return (
    <div className="min-w-[260px] h-full flex flex-col items-center p-4 bg-white dark:bg-[#15181D] mobile:mt-3">
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
              <div className="px-2 pt-3  max-h-[400px] overflow-scroll">
                {item.set_option_full.map((set: any, index: number) => (
                  <div
                    key={index}
                    className="text-12px whitespace-pre-line leading-4 mb-2"
                  >
                    <p className="text-[#ccff00]">{set.set_count}세트효과</p>
                    <p
                      className={`${
                        item.total_set_count < set.set_count
                          ? "text-[#00000059] dark:text-[#ffffff59] "
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
              onMouseEnter={() => setOpenTooltipIndex(index)}
              onMouseLeave={() => setOpenTooltipIndex(false)}
              className="h-10 px-2 flex items-center rounded hover:bg-[#ffffff29]"
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
