import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useItemQuery } from "@/hooks/queries/useItemQuery";
import { order, gradeColors } from "../../_constants/equipmentItem";
import { ItemEquipment } from "@/types/apis/item.type";
import ItemDetails from "./ItemDetails";
import EquipmentPresetButton from "./EquipmentPresetButton";
import SetEffects from "./SetEffects";
import SymbolDisplay from "./SymbolDisplay";
import Loading from "./Loading";

const Equipment = ({ ocid }: { ocid: string }) => {
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { item, symbol, set, pending, error } = useItemQuery(ocid, day);
  const [presetNo, setPresetNo] = useState(item?.preset_no);

  useEffect(() => {
    if (item && item.preset_no) {
      setPresetNo(item.preset_no);
    }
  }, [item]);

  const orderedItems: Record<string, any> = useMemo(
    () =>
      order.map((slot) =>
        item?.[`item_equipment_preset_${presetNo}`]?.find(
          (item: ItemEquipment) => item?.item_equipment_slot === slot
        )
      ),
    [item, presetNo]
  );

  const getItemColorClass = useCallback(
    (grade: string) => gradeColors[grade] || gradeColors["default"],
    []
  );

  const handleItemClick = useCallback((item: ItemEquipment) => {
    setSelectedItem((prev: ItemEquipment | null) =>
      prev === item ? null : item
    );
    setHoveredItem(item);
  }, []);

  const handleMouseEnter = useCallback(
    (item: ItemEquipment) => {
      if (item) {
        setHoveredItem(item);
      }
    },
    [setHoveredItem]
  );

  const filteredSets = useMemo(
    () =>
      set?.set_effect.filter((set: any) =>
        set.set_option_full.some(
          (option: any) => set.total_set_count >= option.set_count
        )
      ),
    [set]
  );
  console.log("item", orderedItems);
  if (pending) return <Loading />;

  return (
    <div className="flex flex-wrap gap-4 py-2 px-2">
      <div className="flex flex-wrap desktop:basis-[65%] basis-full gap-3 rounded p-5 w-full min-h-[665px] h-full border dark:border-0 border-userBorder shadow-md bg-white dark:bg-dark_bg_100 mobile:justify-center">
        <div className="flex-1 mobile:flex mobile:flex-col mobile:items-center">
          <div className="max-w-[275px] min-w-[275px] min-h-[300px] mobile:flex mobile:flex-col">
            <div className="grid grid-cols-5 gap-1 mb-4 mobile:order-2">
              {orderedItems.map((item: ItemEquipment, index: number) => (
                <div
                  key={index}
                  className={`w-50px h-50px rounded-md flex justify-center items-center ${getItemColorClass(
                    item?.potential_option_grade || ""
                  )} ${item ? "border-1" : ""} `}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onClick={() => handleItemClick(item)}
                >
                  {item?.item_icon && (
                    <Image
                      src={item.item_icon || ""}
                      alt={item.item_equipment_slot}
                      width={25}
                      height={25}
                      priority
                      unoptimized
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-right">
              <EquipmentPresetButton
                data={[1, 2, 3]}
                selected={presetNo}
                style="text-xs w-65px min-w-0 mobile:mb-3"
                onClick={(newPreset: number) => setPresetNo(newPreset)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 mobile:justify-center h-full">
          <div className=" py-3 w-[265px] h-full min-h-[260px] rounded-lg text-white bg-[#111111ba]">
            {selectedItem || hoveredItem ? (
              <ItemDetails
                item={selectedItem || hoveredItem}
                lock={selectedItem !== null}
              />
            ) : (
              <p className="flex justify-center items-center text-sm">
                장비를 선택해주세요.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap desktop:flex-col desktop:basis-[30%] basis-full gap-3 w-full h-full   ">
        <SetEffects set={filteredSets ?? []} />
        {symbol.symbol.length > 0 && (
          <SymbolDisplay symbols={symbol?.symbol || []} />
        )}
      </div>
    </div>
  );
};

export default Equipment;
