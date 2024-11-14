import { CalculationResult, PlatinumAppleItem } from "@/types/platinum.type";
import { useState } from "react";

interface CalculatorReturn {
  totalUsed: string;
  itemCounts: string[];
  calculationResult: CalculationResult[];
  handleTotalUsedChange: (value: string) => void;
  handleItemCountChange: (index: number, value: string) => void;
  calculateResults: () => void;
}

export const usePlatinumAppleCalculator = (
  items: PlatinumAppleItem[],
): CalculatorReturn => {
  const [totalUsed, setTotalUsed] = useState<string>("0");
  const [itemCounts, setItemCounts] = useState<string[]>(items.map(() => "0"));
  const [calculationResult, setCalculationResult] = useState<
    CalculationResult[]
  >([]);

  const handleTotalUsedChange = (value: string) => {
    setTotalUsed(value);
  };

  const handleItemCountChange = (index: number, value: string) => {
    const newCounts = [...itemCounts];
    newCounts[index] = value;
    setItemCounts(newCounts);
  };

  const createError = (message: string): CalculationResult => ({
    name: "오류",
    message,
    expectedProbability: "",
    actualProbability: "",
  });

  const calculateResults = () => {
    if (totalUsed === "0") {
      return setCalculationResult([createError("총 사용횟수를 입력해주세요.")]);
    }

    const totalUsedInt = parseInt(totalUsed);
    const totalItemCount = itemCounts.reduce(
      (sum, count) => sum + parseInt(count || "0"),
      0,
    );

    if (totalUsedInt !== totalItemCount) {
      return setCalculationResult([
        createError(
          `총 사용 횟수,아이템 획득 횟수가 틀립니다. 총 사용 횟수:${totalUsed}, 아이템 획득 횟수:${totalItemCount}`,
        ),
      ]);
    }

    const results = items.map((item, index) => {
      const count = parseInt(itemCounts[index] || "0");
      const actualProbability = (count / totalUsedInt) * 100;

      return {
        name: item.name,
        expectedProbability: item.probability.toFixed(2),
        actualProbability: actualProbability.toFixed(2),
      };
    });

    setCalculationResult(results);
  };

  return {
    totalUsed,
    itemCounts,
    calculationResult,
    handleTotalUsedChange,
    handleItemCountChange,
    calculateResults,
  };
};
