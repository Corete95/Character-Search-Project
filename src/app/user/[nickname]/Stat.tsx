import React from "react";
import { useOcidQuery } from "@/hooks/queries/useOcidQuery";
import { useNicknameQuery } from "@/hooks/queries/useNicknameQuery";
import { useParams } from "next/navigation";
import UserInfo from "./_component/UserInfo";
import HyperStat from "./_component/HyperStat";
import UserStat from "./_component/UserStat";
import Ability from "./_component/Ability";
import dayjs from "dayjs";

const Stat = () => {
  const params: { nickname: string } = useParams();
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");

  const { data, isLoading, isError, error } = useOcidQuery(params.nickname);
  const { info, hyper, user, ability, pending } = useNicknameQuery(
    data?.ocid,
    day
  );

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <div className="flex justify-center items-center w-3/6 m-auto tablet:w-full mobile:w-full">
        <div className="w-full bg-white_gray_100 dark:bg-dark_bg_100 pt-0 p-4 rounded-xl shadow-md border border-[#dcdcdc] dark:border-0">
          <div className="text-lime-500 dark:text-title py-2">
            CHARACTER INFO
          </div>
          <UserInfo props={info} />
        </div>
      </div>
      <div className="flex flex-wrap mt-4 tablet:flex-col mobile:flex-col">
        <div className="desktop:w-3/12 responsive_2 ">
          <div className="w-full bg-white_gray_100 dark:bg-dark_bg_100 pt-0 p-4 rounded-xl shadow-md border border-[#dcdcdc] dark:border-0">
            <div className="text-lime-500 dark:text-title py-2">HYPER STAT</div>
            <HyperStat props={hyper} />
          </div>
        </div>
        <div className="desktop:w-3/6 responsive_1 rounded-xl p-4 bg-white_gray_100 dark:bg-dark_bg_100 shadow-md border border-[#dcdcdc] dark:border-0">
          <div className="text-center p-1 rounded-t-xl bg-white dark:bg-badge_1 ">
            STAT
          </div>
          <UserStat props={user} />
        </div>

        <div className="desktop:w-3/12 responsive_3">
          <div className="w-full pt-0 p-4 rounded-xl bg-white_gray_100 dark:bg-dark_bg_100 shadow-md border border-[#dcdcdc] dark:border-0">
            <div className="text-lime-500 dark:text-title py-2">ABILITY</div>
            <Ability props={ability} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;
