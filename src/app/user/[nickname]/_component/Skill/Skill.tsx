import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { useSkillQuery } from "@/hooks/queries/useSkillQuery";
import { SkillType } from "@/types/apis/skill.type";
import SkillListDisplay from "./SkillListDisplay";
import { tabsData } from "../../_constants/skillItem";
import SkillTabs from "./SkillTabs";

const Skill = ({ ocid }: { ocid: string }) => {
  const { skill, link, pending, error } = useSkillQuery(ocid);
  console.log("skill", link);

  const tabs = [
    { title: "LINK", data: link, tabData: tabsData.link },
    { title: "SKILL", data: skill, tabData: tabsData.skill },
  ];

  if (pending) return <div>로딩중</div>;

  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((item, index) => (
        <SkillTabs
          key={index}
          title={item.title}
          data={item.data}
          tabData={item.tabData}
        />
      ))}
      {/* <div className="h-full min-w-[350px] max-w-[350px] rounded border border-userBorder bg-white_gray_100 p-1 shadow-md dark:border-0 dark:bg-dark_bg_100">
        <div className="p-2 text-center">
          <p className="text-xs text-yellow-400">LINK</p>
        </div>
        <Tabs
          color="warning"
          classNames={{
            tabList: "p-0",
          }}
        >
          {linkTabs.map((data, index) => {
            const test = link[data.match] || [];

            return (
              <Tab key={index} title={data.title}>
                <SkillListDisplay data={test} tab="링크" type="link" />
              </Tab>
            );
          })}
        </Tabs>
      </div>

      <div className="max-w-[350px] rounded border border-userBorder bg-white_gray_100 p-1 shadow-md dark:border-0 dark:bg-dark_bg_100">
        <div className="p-2 text-center">
          <p className="text-xs text-yellow-400">SKILL</p>
        </div>
        <Tabs
          color="warning"
          classNames={{
            tabList: "p-0",
          }}
        >
          {SkillTabs.map((tab, index) => {
            const matchingData = skill.find(
              (character: SkillType) =>
                character?.character_skill_grade === tab,
            );

            return (
              <Tab
                key={index}
                title={tab}
                isDisabled={matchingData === undefined}
              >
                <SkillListDisplay
                  data={matchingData}
                  tab={`${tab}차 스킬`}
                  type="skill"
                />
              </Tab>
            );
          })}
        </Tabs>
      </div> */}
    </div>
  );
};

export default Skill;
