import React, { useCallback } from "react";
import { calculatePriceChanges } from "../_constants/conversion";
import { CoinDataType } from "@/types/apis/coninage.type";
import { getKeyValue } from "@nextui-org/react";
import { COINAGE_COLUMNS } from "@/app/coinage/_constants/constants";
import { formatNumber } from "@/utility/utils";
import GenericTable from "@/components/GenericTable";

interface ChartComponentProps {
  data: CoinDataType[];
}

const TableComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const tableData = calculatePriceChanges(data);

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
    <div className="mx-auto mb-8">
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
