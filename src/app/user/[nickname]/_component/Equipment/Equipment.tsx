import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useItemQuery } from "@/hooks/queries/useItemQuery";
import { order, gradeColors } from "../../_constants/equipmentItem";
import { ItemEquipment } from "@/types/apis/item.type";
import ItemDetails from "./ItemDetails";
import EquipmentPresetButton from "./EquipmentPresetButton";

const Equipment = ({ ocid }: { ocid: string }) => {
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { data, isLoading, isError } = useItemQuery(ocid, day);
  const [presetNo, setPresetNo] = useState(data?.preset_no || 1);

  const orderedItems: Record<string, any> = useMemo(
    () =>
      order.map((slot) =>
        data?.[`item_equipment_preset_${presetNo}`]?.find(
          (item: ItemEquipment) => item.item_equipment_slot === slot
        )
      ),
    [data, presetNo]
  );

  const getItemColorClass = useCallback(
    (grade: string) => gradeColors[grade] || gradeColors["default"],
    []
  );
  const handleItemClick = useCallback(
    (item: ItemEquipment) => {
      if (selectedItem === item) {
        setSelectedItem(null);
      } else {
        setSelectedItem(item);
        setHoveredItem(item);
      }
    },
    [selectedItem, setHoveredItem, setSelectedItem]
  );

  const handleMouseEnter = useCallback(
    (item: ItemEquipment) => {
      if (item) {
        setHoveredItem(item);
      }
    },
    [setHoveredItem]
  );

  console.log("data", data);
  if (isLoading) return <div>로딩...</div>;

  return (
    <div className="flex flex-wrap p-4 mobile:justify-center">
      <div className="mobile:flex mobile:flex-col">
        <div className="grid grid-cols-5 gap-1 mb-4 min-h-[300px] mobile:order-2">
          {orderedItems.map((item: ItemEquipment, index: number) => (
            <div
              key={index}
              className={`w-50px h-50px rounded-md flex justify-center items-center ${getItemColorClass(
                item?.potential_option_grade || ""
              )} ${item ? "border-1" : ""} `}
              onMouseEnter={() => handleMouseEnter(item)}
              onClick={() => handleItemClick(item)}
            >
              {item && (
                <Image
                  src={item.item_icon}
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
        <div className="flex justify-end mobile:order-1 mobile:mb-2">
          <EquipmentPresetButton
            data={[1, 2, 3]}
            selected={presetNo}
            style="text-xs w-65px min-w-0"
            onClick={(newPreset: number) => setPresetNo(newPreset)}
          />
        </div>
      </div>
      <div className="ml-7 py-3 w-[260px] h-full min-h-[260px] rounded-lg text-white bg-[#15181D]  mobile:ml-0">
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
  );
};

export default Equipment;
