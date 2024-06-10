import React from "react";

const InfoCard = ({
  title,
  content,
  sizeStyle,
  blockStyle,
}: {
  title: string;
  content: React.ReactNode;
  sizeStyle: string;
  blockStyle: string;
}) => (
  <div className={sizeStyle}>
    <div className={blockStyle}>
      <div
        className={`${
          title === "STAT"
            ? "text-center p-1 rounded-t-xl bg-white dark:bg-badge_1 "
            : "text-lime-500 dark:text-title py-2"
        }`}
      >
        {title}
      </div>
      {content}
    </div>
  </div>
);

export default InfoCard;
