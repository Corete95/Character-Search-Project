import React from "react";
import Image from "next/image";
import SkillTooltip from "@/components/SkillTooltip";
import { GuildSkillType } from "@/types/apis/guild.type";

interface Props {
  title: string;
  data: GuildSkillType[];
  type: string;
}

const GuildSkillList = ({ title, data, type }: Props) => {
  return (
    <div>
      <p className="mb-2 text-sm text-zinc-500">{title}</p>
      <div className="flex max-h-[156px] cursor-pointer flex-wrap gap-2 overflow-y-auto rounded-md">
        {data.map((skill, index) => (
          <div
            className="bg-slate-200 hover:bg-slate-400 dark:bg-slate-500"
            key={skill.skill_name}
            data-tooltip-id={`skill-${index}-${type}`}
          >
            <div className="p-2">
              <div className="relative h-32px w-32px min-w-32px">
                <Image
                  src={skill.skill_icon}
                  alt={skill.skill_name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  unoptimized
                />
              </div>
            </div>

            <div className="bg-slate-300 text-center font-bold dark:bg-slate-700">
              {skill.skill_level}
            </div>
            {skill && (
              <SkillTooltip
                skill={skill}
                skillIndex={index}
                type={type}
                place={"bottom"}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuildSkillList;
