import React, { useEffect } from "react";
import { useNicknameQuery } from "@/hooks/queries/useNicknameQuery";
import UserInfo from "./UserInfo";
import HyperStat from "./HyperStat";
import UserStat from "./UserStat";
import Ability from "./Ability";
import dayjs from "dayjs";
import InfoCard from "../common/InfoCard";
import { useRecoilState } from "recoil";
import { recentSearchState } from "@/recoil/atoms/searchAtoms";
import { SearchProps } from "@/types";

const Stat = ({
  ocid,
  error,
  params,
}: {
  ocid: string;
  error?: any;
  params: string;
}) => {
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const { info, hyper, user, ability, pending } = useNicknameQuery(ocid, day);
  const [recentSearch, setRecentSearch] =
    useRecoilState<SearchProps[]>(recentSearchState);

  useEffect(() => {
    const search = JSON.parse(localStorage.getItem("search") || "[]");
    const name = decodeURIComponent(params);

    const {
      character_image,
      character_level,
      character_class,
      world_name,
      character_name,
    } = info;

    const newData = {
      character_image,
      character_level,
      character_class,
      world_name,
      character_name,
      name,
    };

    const filteredSearch = search.filter(
      (item: SearchProps) => item.name !== name
    );
    filteredSearch.unshift(newData);
    const limitedSearchArray = filteredSearch.slice(0, 10);

    setRecentSearch(limitedSearchArray);
    localStorage.setItem("search", JSON.stringify(limitedSearchArray));
  }, [params, info, setRecentSearch]);

  const statContent = [
    {
      title: "HYPER STAT",
      content: <HyperStat hyper={hyper} />,
      sizeStyle: "desktop:w-3/12 responsive_2 ",
      blockStyle:
        "w-full bg-white_gray_100 dark:bg-dark_bg_100 pt-0 p-4 rounded-xl shadow-md border border-userBorder dark:border-0",
    },
    {
      title: "STAT",
      content: <UserStat user={user} />,
      sizeStyle:
        "desktop:w-3/6 responsive_1 rounded-xl p-4 bg-white_gray_100 dark:bg-dark_bg_100 shadow-md border border-userBorder dark:border-0",
      blockStyle: "",
    },
    {
      title: "ABILITY",
      content: <Ability ability={ability} />,
      sizeStyle: "desktop:w-3/12 responsive_3",
      blockStyle:
        "w-full pt-0 p-4 rounded-xl bg-white_gray_100 dark:bg-dark_bg_100 shadow-md border border-userBorder dark:border-0",
    },
  ];

  if (error) return <div>{error.message}</div>;

  return (
    <div className="px-2">
      <div className="flex justify-center items-center w-3/6 m-auto tablet:w-full mobile:w-full">
        <div className="w-full bg-white_gray_100 dark:bg-dark_bg_100 pt-0 p-4 rounded-xl shadow-md border border-userBorder dark:border-0">
          <div className="text-lime-500 dark:text-title py-2">
            CHARACTER INFO
          </div>
          <UserInfo info={info} />
        </div>
      </div>
      <div className="flex flex-wrap mt-4 tablet:flex-col mobile:flex-col">
        {statContent.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            content={item.content}
            sizeStyle={item.sizeStyle}
            blockStyle={item.blockStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default Stat;
