export interface UnionInnerStat {
  stat_field_id: string;
  stat_field_effect: string;
}

export interface BlockPosition {
  x: number;
  y: number;
}

export interface UnionBlockType {
  block_type: string;
  block_class: string;
  block_level: string;
  block_control_point: BlockPosition;
  block_position: BlockPosition[];
}

export interface UnionType {
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_block: UnionBlockType[];
  union_inner_stat: UnionInnerStat[];
  [key: string]: any;
}
