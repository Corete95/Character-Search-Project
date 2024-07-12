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
