import React from "react";
import Image from "next/image";
import { CharacterSkillType } from "@/types/apis/skill.type";
import { Tooltip } from "react-tooltip";

const SkillListDisplay = ({ data, tab, type, children }: any) => {
  const spaceArray = new Array(13)
    .fill(null)
    .map((_, index) => data[index] || null);

  return (
    <div>
      <div className="rounded bg-[#1177AA] p-2 text-center">{tab}</div>
      <div className="mt-0.5 flex flex-wrap">
        {(type === "skill" ? data.character_skill : spaceArray)?.map(
          (skill: CharacterSkillType, skillIndex: number) => (
            <div
              key={skillIndex}
              className={`${
                type === "link" && skillIndex === 0 ? "w-full" : "w-1/2"
              } mt-1`}
              data-tooltip-id={`skill-${skillIndex}-${type}`}
              // data-tooltip-delay-hide={100000}
            >
              <div className="flex items-center gap-1 px-1">
                {skill && (
                  <Image
                    src={skill?.skill_icon}
                    alt={skill?.skill_name}
                    width={32}
                    height={32}
                    priority
                    unoptimized
                  />
                )}
                <div className="flex min-h-36px w-full flex-col border border-[#999999] bg-[#dddddd] text-11px text-black dark:bg-[#ddddddb3]">
                  <p className="White-space: pre-wrap line-clamp-1 border-b-1 border-dashed border-[#999999] px-1">
                    {skill?.skill_name}&nbsp;
                  </p>
                  <p className="px-1">{skill?.skill_level}</p>
                </div>
              </div>
              {skill && (
                <Tooltip
                  id={`skill-${skillIndex}-${type}`}
                  place="top"
                  className="z-50 max-w-[430px]"
                >
                  <div className="text-11px">
                    <div className="mb-2 text-center">{skill?.skill_name}</div>
                    <div className="flex gap-2">
                      <div className="relative h-64px w-64px min-w-64px">
                        <Image
                          src={skill?.skill_icon}
                          alt={skill.skill_name}
                          fill
                          style={{ objectFit: "cover" }}
                          priority
                          unoptimized
                        />
                      </div>
                      <p className="whitespace-pre-wrap text-11px">
                        {skill.skill_description}
                      </p>
                    </div>
                    <div className="my-3 border-b-1 border-dashed border-[#999999]"></div>
                    <div className="whitespace-pre-wrap">
                      <p>{`[현재레벨 ${skill.skill_level}]`}</p>
                      <p>{skill.skill_effect}</p>
                      {skill.skill_effect_next && (
                        <div className="mt-2">
                          <p>{`[다음레벨 ${skill.skill_level + 1}]`}</p>
                          <p>{skill.skill_effect_next}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Tooltip>
              )}
            </div>
          ),
        )}
      </div>
      {children}
    </div>
  );
};

export default SkillListDisplay;
