import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useItemQuery } from "@/hooks/queries/useItemQuery";
import { order } from "../../_constants/equipmentItem";
import { ItemEquipmenType, ItemEquipment } from "@/types/apis/item.type";

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

  const getItemColorClass = (grade: string) => {
    const gradeColors: { [key: string]: string } = {
      레전드리: "border-[#6ff300] bg-[#6fb46429]",
      유니크: "border-yellow-500 bg-[#faf08929]",
      에픽: "border-purple-500 bg-[#b77dc729]",
      레어: "border-blue-500 bg-[#5393ca29]",
      default: "border-gray-500 bg-gray-100",
    };
    return gradeColors[grade] || gradeColors["default"];
  };

  const handleMouseEnter = (item: ItemEquipment) => {
    if (!selectedItem) setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    if (!selectedItem) setHoveredItem(null);
  };

  const handleClick = (item: ItemEquipment) => {
    setSelectedItem(selectedItem === item ? null : item);
  };

  const renderStars = (starforce: number) => {
    const totalStars = 25;
    const starArray = Array(totalStars).fill(0);
    return (
      <div className="flex flex-wrap place-content-center gap-1 pb-1">
        <div className="flex">
          {starArray.slice(0, 15).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill={index < starforce ? "#e4ce00" : "#555555"}
              viewBox="0 0 24 24"
              style={{
                marginRight: (index + 1) % 5 === 0 ? "5px" : "0",
              }}
            >
              <path d="m4.178 20.801 6.758-4.91 6.756 4.91-2.58-7.946 6.758-4.91h-8.352L10.936 0 8.354 7.945H0l6.758 4.91-2.58 7.946z" />
            </svg>
          ))}
        </div>
        <div className="flex">
          {starArray.slice(15).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill={index + 15 < starforce ? "#e4ce00" : "#555555"}
              viewBox="0 0 24 24"
              style={{
                marginRight: (index + 1) % 5 === 0 ? "5px" : "0",
              }}
            >
              <path d="m4.178 20.801 6.758-4.91 6.756 4.91-2.58-7.946 6.758-4.91h-8.352L10.936 0 8.354 7.945H0l6.758 4.91-2.58 7.946z" />
            </svg>
          ))}
        </div>
      </div>
    );
  };

  const renderItemDetails = (item: ItemEquipment) => (
    <div>
      {Number(item.starforce) > 0 && renderStars(Number(item.starforce))}
      <div className="flex items-center justify-center flex-col">
        <p className="text-14">
          {item.item_name}{" "}
          {Number(item.scroll_upgrade) > 0 && `(+${item.scroll_upgrade})`}
        </p>
        {item.potential_option_grade && (
          <p className="text-xs">({item.potential_option_grade} 아이템)</p>
        )}
      </div>
      <hr className="border-[#ffffff1f] border-dashed mt-2" />
      <div className="flex items-center p-2">
        <div
          className={`border-1.5 w-16 h-16 rounded-md flex items-center justify-center ${getItemColorClass(
            item?.potential_option_grade
          )}`}
        >
          <Image
            src={item.item_icon}
            alt={item.item_name}
            width={45}
            height={45}
            className=""
          />
        </div>
        <p className="pl-2 text-xs">
          REQ LEVEL : {item.item_base_option.base_equipment_level}
        </p>
      </div>
      <hr className="border-[#ffffff1f] border-dashed mt-2" />
    </div>
  );

  console.log(orderedItems);
  return (
    <div className="flex flex-wrap p-4 mobile:justify-center">
      <div className="grid grid-cols-5 gap-1 mb-4">
        {orderedItems.map((item, index) => (
          <div
            key={index}
            className={`w-14 h-14 ${
              item ? "border-1" : ""
            } rounded-md flex justify-center items-center ${getItemColorClass(
              item?.potential_option_grade || ""
            )}`}
            onMouseEnter={() => handleMouseEnter(item!)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(item!)}
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
      <div className="ml-7 py-3 w-[260px] h-auto rounded text-white bg-[#15181D]  mobile:ml-0">
        {selectedItem || hoveredItem ? (
          renderItemDetails(selectedItem || hoveredItem)
        ) : (
          <p>장비를 선택해주세요.</p>
        )}
      </div>
    </div>
  );
};

export default Equipment;
