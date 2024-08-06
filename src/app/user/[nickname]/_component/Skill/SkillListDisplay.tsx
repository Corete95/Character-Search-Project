import React from "react";
import Image from "next/image";
import { CharacterSkillType } from "@/types/apis/skill.type";
import { Tooltip } from "react-tooltip";
import SkillTooltip from "@/components/SkillTooltip";

const SkillListDisplay = ({
  data,
  tab,
  type,
}: {
  data: any;
  tab: string;
  type: string;
}) => {
  const spaceArray = new Array(13)
    .fill(null)
    .map((_, index) => (data && data.length > 0 ? data[index] : null));

  return (
    <div>
      <div className="mx-1 rounded bg-[#1177AA] p-2 text-center">{tab}</div>
      <div className="mt-0.5 flex flex-wrap">
        {(type === "LINK" ? spaceArray : data?.character_skill)?.map(
          (skill: CharacterSkillType, skillIndex: number) => (
            <div
              key={skillIndex}
              className={`${
                type === "LINK" && skillIndex === 0 ? "w-full" : "w-1/2"
              } mt-1`}
              data-tooltip-id={`skill-${skillIndex}-${type}`}
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
                <SkillTooltip
                  skill={skill}
                  skillIndex={skillIndex}
                  type={type}
                />
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default SkillListDisplay;
