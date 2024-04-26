import { FinalStat, UserStatType } from "@/types/apis/stat";
import { geKoreanNumber } from "./utils";

const topArray = ["HP", "MP", "STR", "DEX", "INT", "LUK"];
const middleArray = [
  "최대 스탯공격력",
  "데미지",
  "최종 데미지",
  "보스 몬스터 데미지",
  "방어율 무시",
  "일반 몬스터 데미지",
  "공격력",
  "크리티컬 확률",
  "마력",
  "크리티컬 데미지",
  "재사용 대기시간 감소 (초)",
  "재사용 대기시간 감소 (%)",
  "버프 지속시간",
  "재사용 대기시간 미적용",
  "속성 내성 무시",
  "상태이상 추가 데미지",
  "소환수 지속시간 증가",
];
const bottomArray = [
  "메소 획득량",
  "스타포스",
  "아이템 드롭률",
  "아케인포스",
  "추가 경험치 획득",
  "어센틱포스",
];

const dataMix = (array: string[], b: UserStatType) => {
  return array.reduce((acc: FinalStat[], statName) => {
    const statValue = b.final_stat.find(
      (stat) => stat.stat_name === statName
    )?.stat_value;
    if (statValue !== undefined) {
      acc.push({ stat_name: statName, stat_value: statValue });
    }
    return acc;
  }, []);
};
export const topUserStat = (stat: UserStatType) => {
  const result = dataMix(topArray, stat);

  return result.map((item: FinalStat) => ({
    ...item,
    stat_value: Number(item.stat_value).toLocaleString(),
  }));
};

export const middleUserStat = (stat: UserStatType) => {
  const result = dataMix(middleArray, stat);

  return result
    .map((a, index) => {
      const { stat_name, stat_value } = a;

      switch (index) {
        case 0:
          return {
            stat_name: "스탯 공격력",
            stat_value: geKoreanNumber(Number(stat_value)),
          };
        case 10:
        case 11:
          if (index === 10)
            return {
              stat_name: "재사용 대기시간 감소",
              stat_value: `${result[index].stat_value}초 / ${
                result[index + 1].stat_value
              }%`,
            };
          break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 7:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
          return { stat_name, stat_value: `${stat_value}%` };
        default:
          return a;
      }
    })
    .filter(Boolean);
};

export const bottomUserStat = (stat: UserStatType) => {
  const result = dataMix(bottomArray, stat);

  return result.map((item: FinalStat, idx: number) => ({
    ...item,
    stat_value: idx % 2 == 0 ? `${item.stat_value}%` : `${item.stat_value}`,
  }));
};
