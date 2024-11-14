import { CalculationResult } from "@/types/platinum.type";
import Image from "next/image";
import React from "react";

interface ResultDisplayProps {
  results: CalculationResult[];
}

const ResultDisplay = ({ results }: ResultDisplayProps) => {
  if (results.length === 0) return null;

  return (
    <div className="mt-4 w-full overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="mt-4 rounded-md p-4">
        <h3 className="mb-2 px-1 text-lg font-semibold desktop:px-6">
          계산 결과
        </h3>
        {results[0].message ? (
          <p className="px-1 text-red-500 desktop:px-6">{results[0].message}</p>
        ) : (
          <div className="px-1 desktop:px-6">
            <div className="flex justify-between rounded-md bg-orange-400 p-1">
              <span className="w-1/3 pr-7 text-center">아이템</span>
              <span>실제 확률</span>
              <span>나의 확률</span>
            </div>
            {results.map((result, index) => (
              <div key={index} className="mt-1 flex justify-between text-sm">
                <div className="flex w-1/3">
                  <Image
                    src={`/images/platinumApple/${encodeURIComponent(
                      result.name,
                    )}.png`}
                    alt={result.name}
                    style={{ objectFit: "cover", marginRight: "4px" }}
                    width={24}
                    height={24}
                    priority
                    unoptimized
                  />
                  <span className="line-clamp-1">{result.name}</span>
                </div>
                <span className="w-1/6 text-right">
                  {result.expectedProbability}%
                </span>
                <span className="w-1/6 text-right desktop:pr-2">
                  {result.actualProbability}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
