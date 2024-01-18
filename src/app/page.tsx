import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full">
      <div className="relative h-[900px]">
        <Image className="" src="/images/main.jpg" fill alt="" />
        <div className="absolute w-full h-full top-0 left-0 dark:bg-[#00000080]"></div>
        <div className="absolute w-full h-full flex justify-center items-center z-1">
          <div className="flex flex-col text-center gap-4">
            <h1 className="text-6xl font-bold dark:text-white">타이틀</h1>
            <p className="dark:text-white">타이틀 사이트 입니다.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-10 h-screen dark:bg-dark dark:text-[#c6c6c6] ">
        <hr className="border-[#0000001f] dark:border-[#ffffff1f]" />
        <span>타이틀</span>
        <span>2024 타이틀 All rights reserved.</span>
        <span>
          ©타이틀 is not associated with NEXON Korea. Data based on NEXON Open
          API.
        </span>
      </div>
    </div>
  );
}
