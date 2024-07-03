"use client";

import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

interface RankingProprs {
  name: string;
  key: string;
}
const rankingData: RankingProprs[] = [
  { name: "종합", key: "overall" },
  { name: "길드", key: "guild" },
];

const TopButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const checkPathForValue = (path: string, value: string): boolean => {
    const regex = new RegExp(`/${value}$`);
    return regex.test(path);
  };

  const getNameForPath = (
    path: string,
    data: RankingProprs[]
  ): string | null => {
    const lastPart = path.split("/").pop();
    const match = data.find((item) => item.key === lastPart);
    return match ? match.name : null;
  };

  return (
    <div className="pl-5">
      <div className="text-2xl font-bold mb-4">
        {getNameForPath(pathname, rankingData)}{" "}
        <span className="opacity-70 font-normal">랭킹</span>
      </div>
      <div>
        <ButtonGroup>
          {rankingData.map((type) => (
            <Button
              key={type.key}
              className={`${
                checkPathForValue(pathname, type.key)
                  ? "bg-white text-black"
                  : ""
              } rounded-s-sm`}
              onClick={() => router.push(`/ranking/${type.key}`)}
            >
              {type.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TopButton;
