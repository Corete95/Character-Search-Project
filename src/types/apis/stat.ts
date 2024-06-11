export interface UserStatType {
  character_class: string;
  date: string;
  final_stat: FinalStat[];
  reamin_ap: number;
}

export interface FinalStat {
  stat_name: string;
  stat_value: string;
  [kery: string]: any;
}

export interface InfoType {
  character_class: string;
  character_image: string;
  character_name: string;
  character_level: number;
  character_exp_rate: number;
  character_guild_name: string;
  world_name: string;
  union_level: number;
  dojang_best_floor: number;
  popularity: number;
}
