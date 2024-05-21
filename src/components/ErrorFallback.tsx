import { useRouter } from "next/navigation";
import React from "react";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const router = useRouter();

  return (
    <div className="text-center mt-5">
      <p>{error?.toString().replace(/^Error:\s*/, "")}</p>
      <button
        className="mt-3 w-20 h-10 rounded-lg bg-neutral-400 dark:bg-dark"
        onClick={() => router.push("/")}
      >
        홈으로
      </button>
      <button
        className="mt-3 w-20 h-10 rounded-lg bg-neutral-400 dark:bg-dark ml-4"
        onClick={resetErrorBoundary}
      >
        재시도
      </button>
    </div>
  );
};

export default ErrorFallback;
