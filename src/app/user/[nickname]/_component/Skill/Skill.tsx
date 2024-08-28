import React from "react";
import { useSkillQuery } from "@/hooks/queries/useSkillQuery";
import { tabsData } from "../../_constants/skillItem";
import SkillTabs from "./SkillTabs";
import { SkillType } from "@/types/apis/skill.type";

const Skill = ({ ocid }: { ocid: string }) => {
  const { skill, link, pending, error } = useSkillQuery(ocid);

  const hyperCheck = skill.filter((item: SkillType) =>
    ["hyperpassive", "hyperactive"].includes(item?.character_skill_grade),
  );

  const tabs = [
    { title: "LINK", data: link, tabData: tabsData.link },
    { title: "SKILL", data: skill, tabData: tabsData.skill },
    hyperCheck.length > 0 && {
      title: "HYPER",
      data: hyperCheck,
      tabData: tabsData.hyper,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 px-2">
      {tabs.filter(Boolean).map((item, index) => (
        <SkillTabs
          key={index}
          title={item.title}
          data={item.data ?? []}
          tabData={item.tabData}
        />
      ))}
    </div>
  );
};

export default Skill;
