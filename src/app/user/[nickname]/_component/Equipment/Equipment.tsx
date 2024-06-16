import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useItemQuery } from "@/hooks/queries/useItemQuery";
import {
  order,
  gradeColors,
  textColors,
  keConversion,
} from "../../_constants/equipmentItem";
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

  const renderStat = (stat, value, base, additional, etc, starforce) => {
    const shouldShowPercent = [
      "boss_damage",
      "ignore_monster_armor",
      "all_stat",
      "damage",
    ].includes(stat.value);
    const displayValue = `${value}${shouldShowPercent ? "%" : ""}`;
    const displayBase = `${base || 0}${shouldShowPercent ? "%" : ""}`;

    return (
      value > 0 && (
        <p>
          <span
            className={`${
              value !== base ? "text-[#65ffff]" : "text-[#FFFFFF]"
            }`}
          >
            {stat.key}: {value !== base ? `+${displayValue}` : displayValue}
          </span>
          {value !== base && (
            <>
              ({displayBase}
              {additional > 0 && (
                <span className="text-[#ccff02]">
                  +{additional}
                  {shouldShowPercent ? "%" : ""}
                </span>
              )}
              {etc > 0 && (
                <span className="text-[#AAAAFF]">
                  +{etc}
                  {shouldShowPercent ? "%" : ""}
                </span>
              )}
              {starforce > 0 && (
                <span className="text-[#FFCC00]">
                  +{starforce}
                  {shouldShowPercent ? "%" : ""}
                </span>
              )}
              )
            </>
          )}
        </p>
      )
    );
  };

  const stats = [
    {
      key: "STR",
      value: "str",
    },
    {
      key: "DEX",
      value: "dex",
    },
    {
      key: "INT",
      value: "int",
    },
    {
      key: "LUK",
      value: "luk",
    },
    {
      key: "최대 HP",
      value: "max_hp",
    },
    {
      key: "최대 MP",
      value: "max_mp",
    },
    {
      key: "공격력",
      value: "attack_power",
    },
    {
      key: "마력",
      value: "magic_power",
    },
    {
      key: "방어력",
      value: "armor",
    },
    {
      key: "이동속도",
      value: "speed",
    },
    {
      key: "점프력",
      value: "jump",
    },
    {
      key: "보스 공격 시 데미지 증가",
      value: "boss_damage",
    },
    {
      key: "몬스터 방어율 무시",
      value: "ignore_monster_armor",
    },
    {
      key: "올스탯",
      value: "all_stat",
    },
    {
      key: "데미지",
      value: "damage",
    },
    {
      key: "착용 레벨 감소",
      value: "equipment_level_decrease",
    },
  ];
  const renderItemDetails = (item) => (
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
          />
        </div>
        <p className="pl-2 text-xs">
          REQ LEVEL : {item.item_base_option?.base_equipment_level}
        </p>
      </div>
      <hr className="border-[#ffffff1f] border-dashed mb-2" />
      <div className="px-3 text-xs">
        <p>장비 분류 : {item.item_equipment_part}</p>
        {stats.map((option) =>
          renderStat(
            option,
            item.item_total_option[option.value],
            item.item_base_option[option.value],
            item.item_add_option[option.value],
            item.item_etc_option[option.value],
            item.item_starforce_option[option.value]
          )
        )}
        {item.scroll_upgrade > 0 && item.scroll_upgradeable_count == 0 && (
          <p>
            업그레이드 가능 횟수 : {item.scroll_upgradeable_count}{" "}
            <span className="text-[#FFCC00]">
              (복구 가능 횟수 : {item.scroll_resilience_count})
            </span>
          </p>
        )}
        {item.golden_hammer_flag === "적용" && <p> 황금망치 제련 적용</p>}
        {item.cuttable_count !== "255" && (
          <p className="text-[#FFCC00]">
            가위 사용 가능 횟수 : {item.cuttable_count}회
          </p>
        )}
      </div>
      <hr className="border-[#ffffff1f] border-dashed mt-2" />
      {item.potential_option_grade && (
        <div className="px-3 py-1 text-xs">
          <p className={`flex ${textColors[item.potential_option_grade]}`}>
            <Image
              src={`/images/item/${keConversion[item.potential_option_grade]}`}
              alt={item.potential_option_grade}
              width={13}
              height={13}
              className="mr-1 object-contain"
            />
            잠재옵션
          </p>
          <p>{item.potential_option_1}</p>
          <p>{item.potential_option_2}</p>
          <p>{item.potential_option_3}</p>
        </div>
      )}

      {item.additional_potential_option_grade && (
        <>
          <hr className="border-[#ffffff1f] border-dashed " />
          <div className="px-3 py-1 text-xs">
            <p
              className={`flex ${
                textColors[item.additional_potential_option_grade]
              }`}
            >
              <Image
                src={`/images/item/${
                  keConversion[item.additional_potential_option_grade]
                }`}
                alt={item.additional_potential_option_grade}
                width={13}
                height={13}
                className="mr-1 object-contain"
              />
              잠재옵션
            </p>
            <p>{item.additional_potential_option_1}</p>
            <p>{item.additional_potential_option_2}</p>
            <p>{item.additional_potential_option_3}</p>
          </div>
        </>
      )}
      {item.item_description && (
        <div className="px-3 py-1 text-xs">
          <p>{item.item_description}</p>
        </div>
      )}
    </div>
  );

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
      <div className="ml-7 py-3 w-[260px] h-auto rounded-lg text-white bg-[#15181D]  mobile:ml-0">
        {selectedItem || hoveredItem ? (
          renderItemDetails(selectedItem || hoveredItem)
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
