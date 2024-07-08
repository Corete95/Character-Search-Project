import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactqueryProvider from "@/providers/ReactqueryProvider";
import RecoilWrapperProvider from "@/providers/RecoilWrapperProvider";
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
  applicationName: "Mesoya",
  creator: "Mesoya",
  metadataBase: new URL("https://mesoya.vercel.app"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    siteName: "메소야",
    type: "website",
    title: "메소야 | Mesoya",
    description:
      '"메이플스토리,캐릭터 검색,전적 검색,메소야,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온",',
    url: "https://mesoya.vercel.app",
    images: [
      {
        url: "/images/main.jpg",
        width: 1200,
        height: 630,
      },
    ],
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
          <RecoilWrapperProvider>
            <Providers>
              <main className="min-h-screen h-fulll flex flex-col bg-modeWhite dark:bg-dark_gray">
                <Header />
                {children}
                <Footer />
              </main>
            </Providers>
          </RecoilWrapperProvider>
        </ReactqueryProvider>
      </body>
    </html>
  );
}
