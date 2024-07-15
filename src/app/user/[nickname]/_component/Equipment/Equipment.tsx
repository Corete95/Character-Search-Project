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
          (item: ItemEquipment) => item?.item_equipment_slot === slot,
        ),
      ),
    [item, presetNo],
  );

  const getItemColorClass = useCallback(
    (grade: string) => gradeColors[grade] || gradeColors["default"],
    [],
  );

  const handleItemClick = useCallback((item: ItemEquipment) => {
    setSelectedItem((prev: ItemEquipment | null) =>
      prev === item ? null : item,
    );
    setHoveredItem(item);
  }, []);

  const handleMouseEnter = useCallback(
    (item: ItemEquipment) => {
      if (item) {
        setHoveredItem(item);
      }
    },
    [setHoveredItem],
  );

  const filteredSets = useMemo(
    () =>
      set?.set_effect.filter((set: any) =>
        set.set_option_full.some(
          (option: any) => set.total_set_count >= option.set_count,
        ),
      ),
    [set],
  );

  if (pending) return <Loading />;

  return (
    <div className="flex flex-wrap gap-4 px-2 py-2">
      <div className="flex h-full min-h-[665px] w-full basis-full flex-wrap gap-3 rounded border border-userBorder bg-white p-5 shadow-md dark:border-0 dark:bg-dark_bg_100 mobile:justify-center desktop:basis-[60%]">
        <div className="flex-1 mobile:flex mobile:flex-col mobile:items-center">
          <div className="min-h-[300px] min-w-[275px] max-w-[275px] mobile:flex mobile:flex-col">
            <div className="mb-4 grid grid-cols-5 gap-1 mobile:order-2">
              {orderedItems.map((item: ItemEquipment, index: number) => (
                <div
                  key={index}
                  className={`flex h-50px w-50px items-center justify-center rounded-md ${getItemColorClass(
                    item?.potential_option_grade || "",
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

        <div className="flex h-full flex-1 mobile:justify-center">
          <div className="h-full min-h-[260px] w-[265px] rounded-lg bg-[#111111ba] py-3 text-white">
            {selectedItem || hoveredItem ? (
              <ItemDetails
                item={selectedItem || hoveredItem}
                lock={selectedItem !== null}
              />
            ) : (
              <p className="flex items-center justify-center text-sm">
                장비를 선택해주세요.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex h-full w-full basis-full flex-wrap gap-3 desktop:basis-[30%] desktop:flex-col">
        <SetEffects set={filteredSets ?? []} />
        {symbol.symbol.length > 0 && (
          <SymbolDisplay symbols={symbol?.symbol || []} />
        )}
      </div>
    </div>
  );
};

export default Equipment;
