import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";

const Pagination = ({ currentPage }: { currentPage: number }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    router.push(`${pathname}?page=${newPage}`);
  };

  return (
    <div className="flex justify-between my-3">
      <Button
        size="md"
        isDisabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        이전
      </Button>
      <Button size="md" onClick={() => handlePageChange(currentPage + 1)}>
        다음
      </Button>
    </div>
  );
};

export default Pagination;
