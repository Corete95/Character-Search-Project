import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../../api/axios";

import { errorStatus } from "../../utility/utils";
import { ItemEquipment, ItemEquipmenType } from "@/types/apis/item.type";

const fetchItem = async (ocid: string, day: string) => {
  try {
    const { data } = await api.get(
      `character/item-equipment?ocid=${ocid}&date=${day}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
    throw error;
  }
};

const conversion = (item: ItemEquipmenType | any) => {
  const titleData = {
    item_equipment_slot: "칭호",
    item_icon: item.title.title_icon,
    item_name: item.title.title_name,
    item_description: item.title.title_description,
    date_option_expire: item.title.date_option_expire,
  };

  const appendTitleData = (preset: ItemEquipment[]) => [...preset, titleData];

  return {
    ...item,
    item_equipment_preset_1: appendTitleData(item.item_equipment_preset_1),
    item_equipment_preset_2: appendTitleData(item.item_equipment_preset_2),
    item_equipment_preset_3: appendTitleData(item.item_equipment_preset_3),
  };
};

export const useItemQuery = (ocid: string, day: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["item", ocid],
    queryFn: () => fetchItem(ocid, day),
    select: (item) => conversion(item),
    retry: false,
  });

  return { data, isLoading, isError };
};
