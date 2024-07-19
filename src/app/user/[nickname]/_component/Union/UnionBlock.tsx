import React, { useEffect, useState } from "react";
import Image from "next/image";
import EquipmentPresetButton from "../Equipment/EquipmentPresetButton";
import { UnionType } from "@/types/apis/union.type";

const UnionBlock = ({ union, common }: any) => {
  const [preset, setPreset] = useState(1);
  const [unionData, setUnionData] = useState<UnionType>({
    union_block: [],
    union_inner_stat: [],
    union_occupied_stat: [],
    union_raider_stat: [],
  });

  useEffect(() => {
    if (union) {
      const presetData = union[`union_raider_preset_${preset}`];
      setUnionData(presetData);
    }
  }, [union, preset]);

  const getTextAlignClass = (index: number) => {
    return [1, 4, 6, 7].includes(index) ? "text-left" : "text-right";
  };

  const renderInnerStat = (index1: number, index2: number) => (
    <div className="grid h-full w-full grid-cols-1 grid-rows-2 items-center justify-center">
      <div className={`px-[10px] ${getTextAlignClass(index1)}`}>
        {
          unionData.union_inner_stat[index1]?.stat_field_effect.split(
            "유니온",
          )[1]
        }
      </div>
      <div className={`px-[10px] ${getTextAlignClass(index2)}`}>
        {
          unionData.union_inner_stat[index2]?.stat_field_effect.split(
            "유니온",
          )[1]
        }
      </div>
    </div>
  );

  const getGrade = (level: string) => {
    const numericLevel = parseInt(level);
    if (numericLevel >= 250) return "SSS";
    if (numericLevel >= 200) return "SS";
    if (numericLevel >= 140) return "S";
    if (numericLevel >= 100) return "A";
    return "B";
  };

  return (
    <div className="userContainer flex flex-col gap-2 p-2">
      <div className="rounded bg-[#94a3b84d] p-1 text-center font-bold">
        유니온
      </div>
      <div className="flexCenter gap-3 rounded bg-[#94a3b84d] py-2">
        <div>
          <Image
            src={`/images/union/${common.union_grade}.png`}
            alt={common.union_grade}
            width={70}
            height={70}
          />
        </div>
        <div className="flexCenter flex-col font-bold">
          <p>{common.union_grade}</p>
          <p>Lv. {common.union_level}</p>
        </div>
      </div>
      <div className="flexCenter flex-col bg-[#94a3b84d] py-2">
        <div className="relative h-[318px] w-[349.5px]">
          <Image
            src="/images/union_raider_map.svg"
            alt="Union Raider Map"
            layout="fill"
            objectFit="contain"
          />
          <div className="absolute grid h-full w-full grid-cols-[repeat(22,minmax(4px,1fr))] grid-rows-[repeat(20,minmax(4px,1fr))]">
            {unionData.union_block.map((block, index) =>
              block.block_position.map((pos, posIndex) => (
                <div
                  key={`${index}-${posIndex}`}
                  className="bg-[#c09976] opacity-70"
                  style={{
                    gridColumnStart: pos.x + 12,
                    gridRowStart: 11 - pos.y,
                  }}
                />
              )),
            )}
          </div>
          <div
            className="absolute grid h-full w-full grid-cols-[22%,28%,27%,24%] grid-rows-4 items-center text-center text-xs font-bold text-white"
            style={{ textShadow: "rgba(0, 0, 0, 0.9) 0px 0px 3px" }}
          >
            <div></div>
            <div>내성</div>
            <div>경험치</div>
            <div></div>
            <div>크뎀</div>
            {renderInnerStat(0, 7)}
            {renderInnerStat(1, 2)}
            <div>크확</div>
            <div>방무</div>
            {renderInnerStat(6, 5)}
            {renderInnerStat(3, 4)}
            <div>보공</div>
            <div></div>
            <div>벞지</div>
            <div>일몹뎀</div>
            <div></div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <EquipmentPresetButton
            data={[1, 2, 3, 4, 5]}
            selected={preset}
            style="text-xs w-65px min-w-0 mobile:mb-3"
            onClick={(newPreset: number) => setPreset(newPreset)}
          />
        </div>
      </div>
      <div className="rounded bg-[#94a3b84d]">
        <p className="mb-2 pt-2 text-center text-sm font-bold">
          공격대원({unionData.union_block.length})
        </p>
        <div className="flex max-h-[460px] flex-wrap overflow-x-auto">
          {unionData.union_block
            .sort((a, b) => parseInt(b.block_level) - parseInt(a.block_level))
            .map((block, index) => (
              <div
                key={`union-${index}`}
                className="mb-2 flex basis-1/2 gap-2 text-11px desktop:basis-1/4"
              >
                <div className="relative h-8 w-8 min-w-8">
                  <Image
                    src={`/images/character/${block.block_class}.png`}
                    alt={`${block.block_class}-${index}`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    unoptimized
                  />
                </div>
                <div>
                  <span
                    className={`${block.block_level >= "250" ? "text-[#ed6c02]" : "text-[#00000099]"}`}
                  >
                    {getGrade(block.block_level)}
                  </span>
                  <p className="line-clamp-1">
                    Lv.{block.block_level} {block.block_class}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex gap-2">
        {[
          { title: "공격대 효과", location: "union_raider_stat" },
          { title: "공격대 점령 효과", location: "union_occupied_stat" },
        ].map((attack) => (
          <div key={attack.title} className="w-1/2 rounded bg-[#94a3b84d]">
            <p className="mb-1 py-1 text-center text-sm font-bold">
              {attack.title}
            </p>
            <div className="flex max-h-[250px] flex-wrap overflow-x-auto">
              <ul className="pl-5">
                {unionData[attack.location]
                  .sort()
                  .map((item: string[], index: number) => (
                    <li key={`${item}-${index}`} className="list-disc text-xs">
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnionBlock;
