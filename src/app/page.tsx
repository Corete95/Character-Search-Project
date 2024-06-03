import SearchBox from "@/components/SearchBox";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full">
      <div className="relative h-full">
        <Image className="" src="/images/main.jpg" fill alt="" />
        <div className="absolute w-full h-full top-0 left-0 dark:bg-[#00000080]"></div>
        <div className="absolute w-full h-full flex justify-center items-center z-1">
          <div className="flex flex-col text-center gap-4">
            <h1 className="text-6xl font-bold dark:text-white">Mesoya</h1>
            <p className="dark:text-white">캐릭터 정보 검색 서비스</p>
            <SearchBox />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-10 dark:text-[#c6c6c6] ">
        <hr className="border-[#0000001f] dark:border-[#ffffff1f]" />
        <span>Mesoya</span>
        <span>2024 Mesoya All rights reserved.</span>
        <span>
          ©Mesoya is not associated with NEXON Korea. Data based on NEXON Open
          API.
        </span>
      </div>
    </div>
  );
}
