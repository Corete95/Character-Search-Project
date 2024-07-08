import React from "react";

const Footer = () => {
  return (
    <footer className="w-full max-w-1200 mx-auto mt-12">
      <div className="flex flex-col gap-4  dark:text-[#c6c6c6] ">
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
