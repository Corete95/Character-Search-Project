import { errorStatus } from "@/utility/utils";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    const code = errorStatus(error.response.data.error.name);
    throw new Error(code);
  }
};
