"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  error: string;
}
const ErrorPage = ({ error }: Props) => {
  const router = useRouter();
  const parts = error.split(". ");
  return (
    <div className="flexCenter min-h-[600px] px-5">
      <div className="flex flex-col items-center">
        {parts.map((part, index) => (
          <p key={index}>{part}</p>
        ))}

        <button
          className="mt-3 w-20 h-10 rounded-lg bg-neutral-400 dark:bg-dark"
          onClick={() => router.push("/")}
        >
          홈으로
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
