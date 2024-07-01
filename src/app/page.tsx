import SearchBox from "@/components/SearchBox";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full">
      <div className="relative min-h-[520px]">
        <Image
          alt=""
          src="/images/main.jpg"
          style={{ objectFit: "cover" }}
          fill
          priority
        />
        <div className="absolute w-full h-full top-0 left-0 dark:bg-[#00000080]"></div>
        <div className="absolute w-full flexCenter flex-col mt-24 z-1">
          <div className="w-full flexCenter flex-col gap-4">
            <h1 className="text-6xl font-bold dark:text-white">Mesoya</h1>
            <p className="dark:text-white">캐릭터 정보 검색 서비스</p>
            <div className="desktop:w-[650px] w-full px-5">
              <SearchBox />
            </div>
          </div>
        </div>
      </div>
      <div>랭킹자리 </div>
    </div>
  );
}
