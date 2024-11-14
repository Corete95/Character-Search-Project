"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UtilsComponent = () => {
  const router = useRouter();
  return (
    <div>
      <div
        className="userContainer flex w-28 cursor-pointer flex-col items-center gap-2 p-4 hover:bg-zinc-200 dark:hover:bg-slate-500"
        onClick={() => router.push(`/utilitys/platinumApple`)}
      >
        <Image
          src={"images/platinumApple/플래티넘 애플.png"}
          alt="애플"
          width={32}
          height={32}
          priority
          unoptimized
        />
        <p className="text-center text-sm"> 플래티넘 애플 확률 계산기</p>
      </div>
    </div>
  );
};

export default UtilsComponent;
