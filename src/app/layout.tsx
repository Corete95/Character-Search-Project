import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactqueryProvider from "@/providers/ReactqueryProvider";
import RecoilWrapperProvider from "@/providers/RecoilWrapperProvider";
import Providers from "@/components/Providers";
import NavigationSchemaScript from "@/components/NavigationSchemaScript";
import dayjs from "dayjs";
import localFont from "next/font/local";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import "dayjs/locale/ko";
import "react-tooltip/dist/react-tooltip.css";
import "./globals.css";

dayjs.locale("ko");
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "메소야 | Mesoya",
  description:
    "메이플스토리,캐릭터 검색,전적 검색,메소야,mesoya,메소야kr,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온,플래티넘 애플,",
  keywords:
    "메이플스토리,캐릭터 검색,전적 검색,메소야,mesoya,메소야kr,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온,플래티넘 애플",
  applicationName: "Mesoya",
  creator: "Mesoya",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_NAME}`),
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
      "메이플스토리,캐릭터 검색,전적 검색,메소야,mesoya,메소야kr,큐브,장비,전투력,길드,랭킹,주화,무릉,유니온,플래티넘 애플,",
    url: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
    images: [
      {
        url: "/images/main.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
              <main className="h-fulll flex min-h-screen flex-col bg-modeWhite dark:bg-dark_gray">
                <Header />
                {children}
                <Footer />
              </main>
            </Providers>
          </RecoilWrapperProvider>
        </ReactqueryProvider>
        <NavigationSchemaScript />
      </body>
    </html>
  );
}
