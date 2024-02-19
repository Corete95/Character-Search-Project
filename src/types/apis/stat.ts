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
