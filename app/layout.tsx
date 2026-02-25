import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
  weight: ["400"],
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
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen bg-outer-bg text-body-text antialiased">
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 bg-app-shell-bg">
            <main className="animate-page-in min-h-screen">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
