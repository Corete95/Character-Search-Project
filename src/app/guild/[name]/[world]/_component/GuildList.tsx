import React from "react";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import Image from "next/image";

const GuildList = ({ list }: any) => {
  const { data, isLoading, isError } = useFetchData(list, "/api/guild-data");

  if (isLoading) return <div>로딩중</div>;

  console.log("data", data);
  return (
    <div className="-ml-3">
      <div className="flex flex-wrap">
        {data.map((item) => (
          <div
            className="w-full pl-3 pt-3 tablet:w-1/2 desktop:w-1/4"
            key={item}
          >
            <Link href={`/user/${item.character_name}`}>
              <div className="rounded-lg border border-userBorder bg-white_gray_100 p-2 shadow-md dark:border-0 dark:bg-dark_bg_100">
                <div className="flex">
                  <Image
                    src={item.character_image}
                    alt={item.character_name}
                    width={96}
                    height={96}
                    property="1"
                    unoptimized
                  />

                  <div className="ml-2 flex flex-col justify-center text-sm">
                    <div className="flex items-center">
                      <div className="relative mr-1 h-4 w-4 min-w-4">
                        <Image
                          src={`/images/world/${item.world_name}.png`}
                          alt={item.character_name}
                          fill
                          property="1"
                          unoptimized
                        />
                      </div>
                      <p className="text-xl"> {item?.character_name}</p>
                    </div>
                    <p>Lv.{item.character_level}</p>
                    <p>{item.character_class}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuildList;
