import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import SkillListDisplay from "./SkillListDisplay";
import { SkillTabType, SkillType, TabItem } from "@/types/apis/skill.type";

const SkillTabs = ({ title, data, tabData }: SkillTabType) => {
  const getDataForTab: { [key: string]: (item: TabItem, data: any) => any } = {
    LINK: (item, data) => data[item.match],
    SKILL: (item, data) =>
      data.find(
        (character: SkillType) =>
          character?.character_skill_grade === item.title,
      ),
    HYPER: (item, data) =>
      data.find(
        (character: SkillType) =>
          character?.character_skill_grade === item.match,
      ),
  };
  return (
    <div className="h-full min-h-[418px] w-full rounded border border-userBorder bg-white_gray_100 p-1 shadow-md dark:border-0 dark:bg-dark_bg_100 desktop:min-w-[350px] desktop:max-w-[350px]">
      <div className="p-2 text-center">
        <p className="text-xs text-yellow-400">{title}</p>
      </div>
      <Tabs
        color="warning"
        classNames={{
          tabList: "p-0",
        }}
      >
        {tabData?.map((item: TabItem, index: number) => {
          const matchData = getDataForTab[title](item, data);

          return (
            <Tab
              key={index}
              title={item.title}
              isDisabled={matchData === undefined}
            >
              <SkillListDisplay
                data={matchData}
                tab={title === "LINK" ? "링크" : `${item.title}`}
                type={title}
              />
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default SkillTabs;
