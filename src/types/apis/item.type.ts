interface ItemAddOptionType {
  all_stat: string;
  armor: string;
  attack_power: string;
  boss_damage: string;
  damage: string;
  equipment_level_decrease: number;
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  magic_power: string;
  speed: string;
  jump: string;
}

interface ItemBaseOptionType {
  all_stat: string;
  armor: string;
  attack_power: string;
  base_equipment_level: number;
  boss_damage: string;
  ignore_monster_armor: string;
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  magic_power: string;
  speed: string;
  jump: string;
  max_hp_rate: string;
  max_mp_rate: string;
}

interface ItemEtcOptionType {
  armor: string;
  attack_power: string;
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  magic_power: string;
  speed: string;
  jump: string;
}

interface ItemExceptionalOptionType {
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  attack_power: string;
  magic_power: string;
}

interface ItemStarforceOptionType {
  armor: string;
  attack_power: string;
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  magic_power: string;
  speed: string;
  jump: string;
}

interface ItemTotalOptionType {
  all_stat: string;
  armor: string;
  attack_power: string;
  boss_damage: string;
  damage: string;
  equipment_level_decrease: number;
  ignore_monster_armor: string;
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  max_hp_rate: string;
  max_mp_rate: string;
  magic_power: string;
  speed: string;
  jump: string;
}

export interface ItemEquipment {
  additional_potential_option_1: string;
  additional_potential_option_2: string;
  additional_potential_option_3: string;
  additional_potential_option_grade: string;
  cuttable_count: string;
  date_expire: string;
  equipment_level_increase: number;
  golden_hammer_flag: string;
  growth_exp: number;
  growth_level: number;
  item_add_option: ItemAddOptionType;
  item_base_option: ItemBaseOptionType;
  item_description: string;
  item_equipment_part: string;
  item_equipment_slot: string;
  item_etc_option: ItemEtcOptionType;
  item_exceptional_option: ItemExceptionalOptionType;
  item_gender: string;
  item_icon: string;
  item_name: string;
  item_shape_icon: string;
  item_shape_name: string;
  item_starforce_option: ItemStarforceOptionType;
  item_total_option: ItemTotalOptionType;
  potential_option_1: string;
  potential_option_2: string;
  potential_option_3: string;
  potential_option_grade: string;
  scroll_resilience_count: string;
  scroll_upgrade: string;
  scroll_upgradeable_count: string;
  soul_name: string;
  soul_option: string;
  special_ring_level: number;
  starforce: string;
  starforce_scroll_flag: string;
}

export interface ItemEquipmenType {
  character_class: string;
  character_gender: string;
  date: string;
  dragon_equipment: ItemEquipment[];
  item_equipment: ItemEquipment[];
  item_equipment_preset_1: ItemEquipment[];
  item_equipment_preset_2: ItemEquipment[];
  item_equipment_preset_3: ItemEquipment[];
  mechanic_equipment: ItemEquipment[];
  preset_no: number;
  title: {
    title_icon: string;
    title_name: string;
    title_description: string;
    date_option_expire: string;
    date_expire: string;
  };
}

export interface SetEffectInfo {
  set_count: number;
  set_option: string;
}

export interface EquipmentSet {
  set_name: string;
  total_set_count: number;
  set_effect_info: SetEffectInfo[];
  set_option_full: SetEffectInfo[];
}
