import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import SideNav from "@/components/Sidenav";
import HeaderMobile from "@/components/Heardermobile";
import ReactqueryProvider from "@/providers/ReactqueryProvider";
import Providers from "@/components/Providers";
import dayjs from "dayjs";
import localFont from "next/font/local";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import "dayjs/locale/ko";
import "./globals.css";

dayjs.locale("ko");
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "메소야 | Mesoya",
  description:
    "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
  keywords:
    "메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",
  robots: "index,follow",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        <meta
          name="naver-site-verification"
          content={process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION}
        />
      </head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={pretendard.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ReactqueryProvider>
          <Providers>
            <div className="flex">
              <SideNav />
              <main className="flex-1">
                <div className="flex flex-col desktop:ml-60 sm:border-r sm:border-zinc-700 h-full min-h-screen ">
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
