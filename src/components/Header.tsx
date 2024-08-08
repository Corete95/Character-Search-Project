import React from "react";
import Link from "next/link";
import Image from "next/image";
import Themetoggle from "./Themetoggle";
import SearchBox from "./SearchBox";
import MenuHeader from "./MenuHeader";

const Header = () => {
  return (
    <header className="bg-white dark:bg-dark">
      <div className="mx-auto min-h-64px w-full max-w-1200 pt-2 mobile:px-2.5">
        <nav className="flex items-center gap-5">
          <div className="hidden">메소야 Mesoya 검색</div>
          <div className="mr-5">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/images/logo250.png"
                width={44}
                height={44}
                alt="로고 이미지"
                priority
                className="mobile:h-6 mobile:w-6"
              />
              <span className="flex text-xl font-bold mobile:text-15px">
                Mesoya
              </span>
            </Link>
          </div>
          <SearchBox />
          <Themetoggle />
        </nav>
        <MenuHeader />
      </div>
    </header>
  );
};

export default Header;
