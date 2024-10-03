import { formatNumber } from "@/utilitys/utils";
import React from "react";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

const CardComponent = ({
  date,
  price,
  percentage_change,
  price_change,
}: any) => {
  const isPositive = percentage_change >= 0;
  const changeColor = isPositive ? "text-red-500" : "text-blue-500";
  const TrendIcon = isPositive ? MdTrendingUp : MdTrendingDown;

  return (
    <div className="userContainer p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-gray-400">{date}</span>
        <TrendIcon className={`h-5 w-5 ${changeColor}`} />
      </div>
      <div className="mb-2 text-xl font-bold">{formatNumber(price)} 메소</div>
      <div className={`flex items-center ${changeColor}`}>
        <span className="mr-2">{percentage_change}%</span>
        <span>{formatNumber(price_change)}</span>
      </div>
    </div>
  );
};
export default CardComponent;
