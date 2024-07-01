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
