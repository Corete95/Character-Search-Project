import React from "react";
import { UserStatType } from "@/types/apis/stat";
import { geKoreanNumber } from "@/utilitys/utils";
import StatBlock from "../common/StatBlock";
import StatList from "../common/StatList";
import {
  bottomUserStat,
  middleUserStat,
  topUserStat,
} from "@/utilitys/userStatUtil";

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
