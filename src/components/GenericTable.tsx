import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { GenericTableProps } from "@/types/apis/rank.type";

const GenericTable = <T extends { key: string | number }>({
  columns,
  data,
  renderCell,
  cellStyle,
  tableStyle,
}: GenericTableProps<T>) => {
  return (
    <div>
      <Table isHeaderSticky className={tableStyle}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align="center"
              style={{ width: column.columns }}
              className={`${column.hidden ? "mobile:hidden" : ""}`}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data} emptyContent={"데이터가 없습니다."}>
          {(item) => (
            <TableRow
              key={item.key}
              className="px-4 py-0 hover:bg-[#E7E7E9] dark:hover:bg-[#2D2D2D] "
            >
              {(columnKey) => (
                <TableCell
                  className={`mobile:text-xs ${cellStyle} ${
                    columnKey === "character_popularity" ? "mobile:hidden" : ""
                  }`}
                >
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GenericTable;
