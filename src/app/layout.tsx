import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import SideNav from "@/components/Sidenav";
import HeaderMobile from "@/components/Heardermobile";
import ReactqueryProvider from "@/providers/ReactqueryProvider";
import Providers from "@/components/Providers";
import dayjs from "dayjs";
import localFont from "next/font/local";
import "dayjs/locale/ko";
import "./globals.css";
import dynamic from "next/dynamic";

dayjs.locale("ko");
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "메소야 | Mesoya",
  description: "캐릭터 정보 검색 사이트",
  icons: {
    icon: "/favicon.ico",
  },
};

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

// ${inter.className}

// const Providers = dynamic(() => import("@/components/Providers"), {
//   ssr: false,
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <body className={pretendard.className}>
        <ReactqueryProvider>
          <Providers>
            <div className="flex">
              <SideNav />
              <main className="flex-1">
                <div className="flex flex-col md:ml-60 sm:border-r sm:border-zinc-700 h-full min-h-screen ">
                  <Header />
                  <HeaderMobile />
                  <div className="bg-white_bg dark:bg-dark_gray h-full">
                    {children}
                  </div>
                </div>
              </main>
            </div>
          </Providers>
        </ReactqueryProvider>
      </body>
    </html>
  );
}
