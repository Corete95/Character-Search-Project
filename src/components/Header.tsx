import React from "react";
import Link from "next/link";
import Image from "next/image";
import Themetoggle from "./Themetoggle";
import SearchBox from "./SearchBox";
import MenuHeader from "./MenuHeader";

const Header = () => {
  return (
    <header className="bg-white dark:bg-dark">
      <div className="w-full max-w-1200 min-h-64px mx-auto pt-2 mobile:px-2.5">
        <nav className="flex items-center gap-5">
          <h1 className="hidden">메소야 Mesoya 검색</h1>
          <div className="mr-5">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/images/logo250.png"
                width={44}
                height={44}
                alt="로고 이미지"
                priority
                className="mobile:w-6 mobile:h-6"
              />
              <span className="font-bold text-xl flex mobile:text-15px">
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
