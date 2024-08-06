import React from "react";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

interface Props {
  skill: any;
  skillIndex: number;
  type: string;
  place?: any;
}

const SkillTooltip = ({ skill, skillIndex, type, place = "top" }: Props) => {
  return (
    <Tooltip
      id={`skill-${skillIndex}-${type}`}
      place={place}
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
  );
};

export default SkillTooltip;
