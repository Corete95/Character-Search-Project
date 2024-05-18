import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import React from "react";
import ErrorFallback from "./ErrorFallback";

interface PropsType {
  children: React.ReactNode;
  errorFallback?: any;
  suspenseFallback: ReactNode;
}

const SuspenseAndErrorBoundary = ({
  children,

  suspenseFallback: SuspenseFallback,
}: PropsType) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <Suspense fallback={SuspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseAndErrorBoundary;
