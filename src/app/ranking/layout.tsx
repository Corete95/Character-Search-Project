import React from "react";
import Image from "next/image";
import TopButton from "./_component/TopButton";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="relative">
        <div className="flexCenter mx-auto max-w-1200">
          <div className="absolute top-0 h-[420px] w-full mobile:h-[570px]">
            <Image
              alt=""
              src="/images/main.jpg"
              style={{ objectFit: "cover" }}
              fill
              priority
            />
            <div className="absolute left-0 top-0 h-full w-full dark:bg-[#00000080]"></div>
          </div>
          <div className="z-10 flex h-200px w-full items-center justify-between">
            <TopButton />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
