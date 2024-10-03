import { Metadata } from "next";
import React from "react";
import UtilsComponent from "./_component/UtilsComponent";

export const metadata: Metadata = {
  title: "메소야 유틸 | Mesoya",
  description: "메소야 유틸 페이지",
};

const page = () => {
  return (
    <div className="mx-auto mt-10 min-h-[700px] max-w-1200">
      <UtilsComponent />
    </div>
  );
};

export default page;
