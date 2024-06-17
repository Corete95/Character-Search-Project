import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useItemQuery } from "@/hooks/queries/useItemQuery";
import { order, gradeColors } from "../../_constants/equipmentItem";
import { ItemEquipment } from "@/types/apis/item.type";
import ItemDetails from "./ItemDetails";

const Equipment = ({ ocid }: { ocid: string }) => {
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { data, isLoading, isError } = useItemQuery(ocid, day);

  const orderedItems = order.map((slot) =>
    data?.item_equipment_preset_2.find(
      (item: ItemEquipment) => item.item_equipment_slot === slot
    )
  );

  const getItemColorClass = (grade: string) =>
    gradeColors[grade] || gradeColors["default"];

  const handleItemClick = (item: ItemEquipment) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
      setHoveredItem(item);
    }
  };

  const handleMouseEnter = (item: ItemEquipment) => {
    if (item) {
      setHoveredItem(item);
    }
  };

  if (isLoading) return <div>로딩...</div>;
  console.log(selectedItem);
  return (
    <div className="flex flex-wrap p-4 mobile:justify-center">
      <div className="grid grid-cols-5 gap-1 mb-4 h-[355px]">
        {orderedItems.map((item, index) => (
          <div
            key={index}
            className={`w-14 h-14 ${
              item ? "border-1" : ""
            } rounded-md flex justify-center items-center ${getItemColorClass(
              item?.potential_option_grade || ""
            )}`}
            onMouseEnter={() => handleMouseEnter(item)}
            onClick={() => handleItemClick(item)}
          >
            {item && (
              <Image
                src={item.item_icon}
                alt={item.item_equipment_slot}
                width={28}
                height={28}
              />
            )}
          </div>
        ))}
      </div>
      <div className="ml-7 py-3 w-[260px] h-full rounded-lg text-white bg-[#15181D]  mobile:ml-0">
        {selectedItem || hoveredItem ? (
          <ItemDetails item={selectedItem || hoveredItem} />
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
