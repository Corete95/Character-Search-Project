export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  disabled?: boolean;
  subMenuItems?: SideNavItem[];
};

export interface SearchProps {
  character_class: string;
  character_image: string;
  character_level: number;
  character_name: string;
  name: string;
  world_name: string;
}
