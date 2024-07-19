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

export interface UnionArtifactEffect {
  name: string;
  level: number;
}

export interface UnionArtifactCrystal {
  name: string;
  validity_flag: string;
  date_expire: string;
  level: number;
  crystal_option_name_1: string;
  crystal_option_name_2: string;
  crystal_option_name_3: string;
  [key: string]: any;
}

export interface ArtrifactType {
  date: string | null;
  union_artifact_effect: UnionArtifactEffect[];
  union_artifact_crystal: UnionArtifactCrystal[];
  union_artifact_remain_ap: number;
}
