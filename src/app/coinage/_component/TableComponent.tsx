import React, { useCallback } from "react";
import {
  calculatePriceChangePercentage,
  calculatePriceChanges,
} from "../_constants/conversion";
import { CoinDataType } from "@/types/apis/coninage.type";
import { getKeyValue } from "@nextui-org/react";
import { COINAGE_COLUMNS } from "@/app/coinage/_constants/constants";
import { formatNumber } from "@/utility/utils";
import GenericTable from "@/components/GenericTable";
import Image from "next/image";

interface ChartComponentProps {
  data: CoinDataType[];
}

const TableComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const tableData = calculatePriceChanges(data);
  const goldPrice = calculatePriceChangePercentage(tableData);

  const renderCell = useCallback((user: any, columnKey: string | number) => {
    switch (columnKey) {
      case "percentage_change":
        return (
          <div
            className={`${
              user.percentage_change > 0 ? "text-[#dc3545]" : "text-[#007bff]"
            }`}
          >
            <p>{user.percentage_change}%</p>
            <p>{formatNumber(user.price_change)} </p>
          </div>
        );
      case "price":
        return <div>{formatNumber(user.price)} 메소</div>;

      default:
        return getKeyValue(user, columnKey);
    }
  }, []);

  return (
    <div className="max-w-[600px] mx-auto mb-8">
      <div className="flex justify-center gap-3 mb-4">
        <Image
          src="/images/gold.png"
          alt="골드 주화"
          width={35}
          height={35}
          priority
        />
        <div className="text-sm">
          <p>골드 첫날 대비</p>
          <p
            className={`${
              Number(goldPrice.percentageIncrease) > 0
                ? "text-[#dc3545]"
                : "text-[#007bff]"
            }`}
          >
            {goldPrice.priceDifference} / {goldPrice.percentageIncrease}%
          </p>
        </div>
      </div>
      <GenericTable
        columns={COINAGE_COLUMNS}
        data={tableData}
        renderCell={renderCell}
        cellStyle="p-1"
        tableStyle="h-[500px] [&>div]:p-0"
      />
    </div>
  );
};

export default TableComponent;
