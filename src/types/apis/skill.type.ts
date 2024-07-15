export interface SkillType {
  date: string | null;
  character_class: string;
  character_skill_grade: string;
  character_skill: CharacterSkillType[];
}

export interface CharacterSkillType {
  skill_name: string;
  skill_description: string;
  skill_level: number;
  skill_effect: string;
  skill_icon: string;
  skill_effect_next: string | null;
}

export interface TabItem {
  title: string;
  match?: string;
}
export interface TabsDataType {
  link: TabItem[];
  skill: TabItem[];
  hyper: TabItem[];
  [key: string]: any;
}

export interface SkillTabType {
  title: string;
  data: SkillType[];
  tabData: TabItem[];
}
