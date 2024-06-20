import {
  useQueries,
  useQuery,
  useSuspenseQueries,
} from "@tanstack/react-query";
import axios from "axios";
import api from "../../api/axios";

import { errorStatus } from "../../utility/utils";
import { ItemEquipment, ItemEquipmenType } from "@/types/apis/item.type";

const fetchItem = async (endpoint: string, ocid: string, day: string) => {
  try {
    const { data } = await api.get(
      `character/${endpoint}?ocid=${ocid}&date=${day}`
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

const conversion = (item: ItemEquipmenType | any, android: any) => {
  const titleData = {
    item_equipment_slot: "칭호",
    item_icon: item.title.title_icon,
    item_name: item.title.title_name,
    item_description: item.title.title_description,
    date_option_expire: item.title.date_option_expire,
  };
  const androidData = {
    item_equipment_slot: "안드로이드",
    item_icon: android.android_icon,
    item_name: android.android_name,
    item_description: android.android_description,
  };

  const appendTitleData = (preset: ItemEquipment[]) => [
    ...preset,
    titleData,
    android.android_icon && androidData,
  ];

  return {
    ...item,
    item_equipment_preset_1: appendTitleData(item.item_equipment_preset_1),
    item_equipment_preset_2: appendTitleData(item.item_equipment_preset_2),
    item_equipment_preset_3: appendTitleData(item.item_equipment_preset_3),
  };
};

export const useItemQuery = (ocid: string, day: string) => {
  const keys = [
    "item-equipment",
    "android-equipment",
    "symbol-equipment",
    "set-effect",
  ];

  const queryResults: any = useQueries({
    queries: keys.map((key) => ({
      queryKey: [key, ocid],
      queryFn: () => fetchItem(key, ocid, day),
      enabled: !!ocid,
    })),
    combine: (results) => {
      const isPending = results.some((result) => result.isPending);
      const isError = results.some((result) => result.isError);
      const data = results.map((result) => result.data);

      const updatedFirstItem = data[0] ? conversion(data[0], data[1]) : null;

      const combinedData = [updatedFirstItem, ...data.slice(1)];

      return {
        data: combinedData,
        pending: isPending,
        error: isError,
      };
    },
  });

  const { data, pending, error } = queryResults;
  return {
    item: data[0],
    symbol: data[2],
    set: data[3],
    pending,
    error,
  };
};
