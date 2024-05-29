import { ReactNode } from "react";

export interface RankingListType {
  date: string;
  world_name: string;
  ranking: number;
  character_name: string;
  character_level: number;
  character_exp: number;
  class_name: string;
  sub_class_name: string;
  character_popularity: number;
  character_guildname: string | null;
  key?: number;
}

export interface Column {
  key: string;
  label: string;
  columns: string;
}

export interface GenericTableProps<T> {
  columns: Column[];
  data: T[];
  renderCell: (item: T, columnKey: string | number) => ReactNode;
}
