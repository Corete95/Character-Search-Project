"use client";

import React from "react";
import { platinumAppleProbability } from "./_constants/data";
import { usePlatinumAppleCalculator } from "@/hooks/usePlatinumAppleCalculator";
import ItemList from "./_component/ItemList";
import InputForm from "./_component/InputForm";
import ResultDisplay from "./_component/ResultDisplay";

const PlatinumApplePage = () => {
  const {
    totalUsed,
    itemCounts,
    calculationResult,
    handleTotalUsedChange,
    handleItemCountChange,
    calculateResults,
  } = usePlatinumAppleCalculator(platinumAppleProbability);

  return (
    <div className="mx-auto mt-10 min-h-[700px] w-full max-w-1200">
      <div className="flex flex-wrap justify-between mobile:px-1">
        <ItemList items={platinumAppleProbability} />
        <InputForm
          totalUsed={totalUsed}
          itemCounts={itemCounts}
          onTotalUsedChange={handleTotalUsedChange}
          onItemCountChange={handleItemCountChange}
          onCalculate={calculateResults}
          items={platinumAppleProbability}
        />
        <ResultDisplay results={calculationResult} />
      </div>
    </div>
  );
};

export default PlatinumApplePage;
