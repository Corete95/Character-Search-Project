import React from "react";
import Image from "next/image";
import TopButton from "./_component/TopButton";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="relative">
        <div className="max-w-1200 mx-auto flexCenter">
          <div className="h-[420px] mobile:h-[570px] absolute w-full top-0">
            <Image
              alt=""
              src="/images/main.jpg"
              style={{ objectFit: "cover" }}
              fill
              priority
            />
            <div className="absolute w-full h-full top-0 left-0 dark:bg-[#00000080]"></div>
          </div>
          <div className="flex justify-between items-center w-full h-200px z-10">
            <TopButton />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
