import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  
  return (
    <div>
      <p>{error.toString()}</p>
      <button onClick={resetErrorBoundary}>재시도</button>
    </div>
  );
};

export default ErrorFallback;
