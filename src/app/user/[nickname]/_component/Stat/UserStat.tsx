import React from "react";
import { geKoreanNumber } from "../../../../../utility/utils";
import { UserStatType } from "@/types/apis/stat";
import StatBlock from "@/app/user/[nickname]/_component/common/StatBlock";
import StatList from "@/app/user/[nickname]/_component/common/StatList";
import {
  bottomUserStat,
  middleUserStat,
  topUserStat,
} from "@/utility/userStatUtil";

interface Props {
  user: UserStatType;
}

const UserStat = ({ user }: Props) => {
  return (
    <div className="flex flex-col gap-2 py-3">
      <StatBlock
        title="전투력"
        value={geKoreanNumber(Number(user.final_stat[42].stat_value))}
      />
      <StatList stats={topUserStat(user)} />
      <StatList stats={middleUserStat(user)} />
      <StatList stats={bottomUserStat(user)} />
    </div>
  );
};

export default UserStat;
