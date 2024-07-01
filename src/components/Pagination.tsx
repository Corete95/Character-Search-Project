import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ currentPage }: { currentPage: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updatePage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handlePageChange = (direction: string) => {
    const newPage =
      direction === "next" ? Number(currentPage) + 1 : currentPage - 1;
    updatePage(newPage);
  };

  return (
    <div className="flex justify-between my-3">
      <Button
        size="md"
        isDisabled={currentPage <= 1}
        onClick={() => handlePageChange("prev")}
      >
        이전
      </Button>

      <Button size="md" onClick={() => handlePageChange("next")}>
        다음
      </Button>
    </div>
  );
};

export default Pagination;
