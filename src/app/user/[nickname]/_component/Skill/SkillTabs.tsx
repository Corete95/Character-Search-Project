import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import SkillListDisplay from "./SkillListDisplay";

const SkillTabs = ({ title, data, tabData }: any) => {
  return (
    <div className="h-full min-w-[350px] max-w-[350px] rounded border border-userBorder bg-white_gray_100 p-1 shadow-md dark:border-0 dark:bg-dark_bg_100">
      <div className="p-2 text-center">
        <p className="text-xs text-yellow-400">LINK</p>
      </div>
      <Tabs
        color="warning"
        classNames={{
          tabList: "p-0",
        }}
      >
        {tabData.map((item, index) => {
          const test =
            title === "LINK"
              ? data[item.match]
              : data.find(
                  (character: any) =>
                    character?.character_skill_grade === item.title,
                );

          return (
            <Tab key={index} title={data.title}>
              <SkillListDisplay data={test} tab="링크" type="link" />
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default SkillTabs;
