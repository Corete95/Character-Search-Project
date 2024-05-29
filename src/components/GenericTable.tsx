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
}: GenericTableProps<T>) => {
  return (
    <Table>
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn
            key={column.key}
            align="center"
            style={{ width: column.columns }}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data} emptyContent={"데이터가 없습니다."}>
        {(item) => (
          <TableRow
            key={item.key}
            className="hover:bg-[#E7E7E9] dark:hover:bg-[#2D2D2D]"
          >
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default GenericTable;
