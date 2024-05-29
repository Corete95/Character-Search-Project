import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useSelectState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const handleChange = (value: string, category: string) => {
    setSelectedValue(value);
    setCategory(category);
    router.push(`${pathname}?page=${pageParam}&class=${value}`);
  };

  const isResetNeeded = (currentCategory: string) => {
    return category !== null && category !== currentCategory;
  };

  return { selectedValue, category, handleChange, isResetNeeded };
};
