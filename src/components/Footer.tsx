import React from "react";

const Footer = () => {
  return (
    <footer className="mx-auto mt-12 w-full max-w-1200 mobile:px-3">
      <div className="flex flex-col gap-3 dark:text-[#c6c6c6] mobile:text-sm">
        <hr className="border-[#0000001f] dark:border-[#ffffff1f]" />
        <span>Mesoya</span>
        <span>2024 Mesoya All rights reserved.</span>
        <span>
          ©Mesoya is not associated with NEXON Korea. Data based on NEXON Open
          API.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
