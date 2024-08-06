export interface GuildListType {
  date: string;
  world_name: string;
  guild_name: string;
  guild_level: number;
  guild_mark: string;
  guild_point: number;
  ranking: number;
  guild_master_name: string;
  key: number;
}

export interface SearchParams {
  page?: number;
  world_name?: string;
  class?: string;
  world_type?: string;
  ranking_type?: string;
  [key: string]: any;
}
export interface InitialParams {
  date: string;
  page: number;
  world_name?: string;
  ranking_type?: string;
  [key: string]: any;
}

export interface GuildSkillType {
  skill_name: string;
  skill_description: string;
  skill_level: number;
  skill_effect: string;
  skill_icon: string;
}

export interface GuildDataType {
  title: string;
  content: string;
}

interface Character {
  character_name: string;
  character_level: number;
  character_class: string;
}

interface SortFunction {
  (a: Character, b: Character): number;
}

export interface SortFunctionsType {
  [key: string]: SortFunction;
}
