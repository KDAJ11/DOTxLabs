import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import { MotionConfig } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DOTxLabs — AI-First Digital Agency | Toronto / GTA",
    template: "%s | DOTxLabs",
  },
  description:
    "DOTxLabs is an AI-first full-service digital agency in Toronto/GTA. We deliver brand strategy, digital marketing, web development, and AI automation for brands that mean business.",
  metadataBase: new URL("https://www.dotxlabs.com"),
  openGraph: {
    title: "DOTxLabs — AI-First Digital Agency",
    description:
      "Full-service digital agency delivering design, marketing, and technology for brands across the GTA.",
    url: "https://www.dotxlabs.com",
    siteName: "DOTxLabs",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOTxLabs — AI-First Digital Agency",
    description:
      "Full-service digital agency delivering design, marketing, and technology for brands across the GTA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <CustomCursor />
          <ScrollProgressBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
