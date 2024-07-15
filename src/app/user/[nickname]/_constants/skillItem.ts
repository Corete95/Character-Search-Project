import { TabsDataType } from "@/types/apis/skill.type";

export const tabsData: TabsDataType = {
  link: [
    { title: "적용중", match: "character_link_skill" },
    { title: "1", match: "character_link_skill_preset_1" },
    { title: "2", match: "character_link_skill_preset_2" },
    { title: "3", match: "character_link_skill_preset_3" },
  ],
  skill: [
    { title: "0" },
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
  ],
  hyper: [
    { title: "하이퍼-패시브", match: "hyperpassive" },
    { title: "하이퍼-액티브", match: "hyperactive" },
  ],
};
