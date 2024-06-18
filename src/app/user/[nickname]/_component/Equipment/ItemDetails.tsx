import React from "react";
import StarsDisplay from "./StarsDisplay";
import StatDisplay from "./StatDisplay";
import ItemOptions from "./ItemOptions";
import Image from "next/image";
import {
  stats,
  keConversion,
  gradeColors,
} from "../../_constants/equipmentItem";

const ItemDetails = ({ item }: any) => (
  <div>
    {Number(item.starforce) > 0 && (
      <StarsDisplay
        starforce={Number(item.starforce)}
        level={item.item_base_option?.base_equipment_level}
        flag={item.starforce_scroll_flag === "사용"}
      />
    )}
    <div className="flex items-center justify-center flex-col">
      <p className="text-14 font-bold">
        {item.item_name}{" "}
        {Number(item.scroll_upgrade) > 0 && `(+${item.scroll_upgrade})`}
      </p>
      {item.potential_option_grade && (
        <p className="text-xs">({item.potential_option_grade} 아이템)</p>
      )}
    </div>
    <hr className="border-[#ffffff1f] border-dashed my-2" />
    <div className="flex items-center p-2">
      <div
        className={`border-1.5 w-16 h-16 rounded-md flex items-center justify-center ${
          gradeColors[item.potential_option_grade || "default"]
        }`}
      >
        <Image
          src={item.item_icon}
          alt={item.item_name}
          width={45}
          height={45}
          priority
        />
      </div>
      <p className={`text-xs pl-2`}>
        REQ LEVEL : {item.item_base_option?.base_equipment_level}
      </p>
    </div>
    <hr className="border-[#ffffff1f] border-dashed my-2" />
    <div className="px-3 text-xs">
      <p>장비 분류 : {item.item_equipment_part}</p>
      {stats.map((option, index) => (
        <StatDisplay
          key={`${option} ${index}`}
          stat={option}
          value={item.item_total_option[option.value]}
          base={item.item_base_option[option.value]}
          additional={item.item_add_option[option.value]}
          etc={item.item_etc_option[option.value]}
          starforce={item.item_starforce_option[option.value]}
        />
      ))}
      {item.scroll_upgrade > 0 && item.scroll_upgradeable_count == 0 && (
        <p>
          업그레이드 가능 횟수 : {item.scroll_upgradeable_count}{" "}
          <span className="text-[#FFCC00]">
            (복구 가능 횟수 : {item.scroll_resilience_count})
          </span>
        </p>
      )}
      {item.golden_hammer_flag === "적용" && <p>황금망치 제련 적용</p>}
      {item.cuttable_count !== "255" && (
        <p className="text-[#FFCC00]">
          가위 사용 가능 횟수 : {item.cuttable_count}회
        </p>
      )}
    </div>

    {item.potential_option_grade && (
      <ItemOptions
        title="잠재옵션"
        options={[
          item.potential_option_1,
          item.potential_option_2,
          item.potential_option_3,
        ]}
        iconSrc={keConversion[item.potential_option_grade]}
        potential={item.potential_option_grade}
      />
    )}
    {item.additional_potential_option_grade && (
      <ItemOptions
        title="에디셔널 잠재옵션"
        options={[
          item.additional_potential_option_1,
          item.additional_potential_option_2,
          item.additional_potential_option_3,
        ]}
        iconSrc={keConversion[item.additional_potential_option_grade]}
        potential={item.additional_potential_option_grade}
      />
    )}
    {item.soul_name && (
      <div>
        <hr className="border-[#ffffff1f] border-dashed my-1" />
        <div className="px-3 py-1 text-xs">
          <p className="text-[#fbff44]">{item.soul_name}</p>
          <p>{item.soul_option}</p>
        </div>
      </div>
    )}
    {item.item_description && (
      <>
        <hr className="border-[#ffffff1f] border-dashed my-2" />
        <div className="px-3 py-1 text-xs">
          <p>{item.item_description}</p>
        </div>
      </>
    )}
  </div>
);

export default ItemDetails;
