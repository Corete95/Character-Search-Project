"use client";
import React from "react";
import { useRouter } from "next/navigation";

const UtilsComponent = () => {
  const router = useRouter();
  return (
    <div>
      <div
        className="bg-red-400"
        onClick={() => router.push(`/utilitys/platinumApple`)}
      >
        플래티넘 애플
      </div>
    </div>
  );
};

export default UtilsComponent;
