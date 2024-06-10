import React from 'react';

const StatBlock = ({ title, value }: { title: string; value: string }) => (
    <div className="flex justify-between items-center p-3 bg-white dark:bg-[#3d6076] rounded-lg">
      <p className="text-base text-[#adc8d1] font-bold">{title}</p>
      <div className="text-zinc-600 dark:text-[#F2F3D1] font-bold text-2xl">{value}</div>
      <div className="w-[40px]"></div>
    </div>
  );

export default StatBlock;