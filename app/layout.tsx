import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import InteractiveBg from "@/components/InteractiveBg";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NUSA team feedback — Anonymous peer feedback",
  description: "Give and view anonymous peer feedback for the NUSA team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen bg-outer-bg text-body-text antialiased">
        <InteractiveBg />
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 relative z-10 pb-16 md:pb-0">
            <main className="animate-page-in min-h-screen">{children}</main>
          </div>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
