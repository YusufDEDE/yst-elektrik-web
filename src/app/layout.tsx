import { AnnouncementTickers } from "@/components/layout/announcement-tickers";
import { AppProviders } from "@/providers/app-providers";
import { GlobalWidgets } from "@/components/layout/global-widgets";
import { YstAiAssistant } from "@/components/layout/yst-ai-assistant";
import { SiteFooter } from "@/components/layout/site-footer";
import { NavigationLoading } from "@/components/layout/navigation-loading";
import { SiteHeader } from "@/components/layout/site-header";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YST Elektrik | Enerji ve Yangın Söndürme Sistemleri",
  description:
    "YST Elektrik: Güneş enerjisi, IoT destekli paneller, ileri seviye enerji sistemleri ve yangın söndürme çözümleri.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/images/logo/logo_yst_circle.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" data-theme="light" suppressHydrationWarning>
      <body className={`${jakarta.variable} min-h-screen font-sans antialiased`}>
        <AppProviders>
          <NavigationLoading />
          <SiteHeader />
          <AnnouncementTickers />
          <main>{children}</main>
          <div className="layout-site-footer-slot">
            <SiteFooter />
          </div>
          <GlobalWidgets />
          <YstAiAssistant />
        </AppProviders>
      </body>
    </html>
  );
}
