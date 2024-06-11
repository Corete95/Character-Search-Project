import React from "react";

const Badge = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: number | string;
  className?: string;
}) => (
  <div
    className={`badge flex justify-between px-3 dark:bg-badge_2 ${className}`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default Badge;
