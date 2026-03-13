import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import { MotionConfig } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import CustomCursor from "@/components/ui/CustomCursor";
import SchemaMarkup from "@/components/SchemaMarkup";
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
    default:
      "Web Design Toronto | AI-First Digital Agency — DOTxLabs",
    template: "%s | DOTxLabs",
  },
  description:
    "Toronto web design & digital agency powered by AI. Custom websites, SEO, Shopify & automation for GTA businesses. Get a free quote today.",
  metadataBase: new URL("https://www.dotxlabs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Web Design Toronto | AI-First Digital Agency — DOTxLabs",
    description:
      "Toronto web design & digital agency powered by AI. Custom websites, SEO, Shopify & automation for GTA businesses.",
    url: "https://www.dotxlabs.com",
    siteName: "DOTxLabs",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DOTxLabs — AI-First Digital Agency in Toronto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Toronto | AI-First Digital Agency — DOTxLabs",
    description:
      "Toronto web design & digital agency powered by AI. Custom websites, SEO, Shopify & automation for GTA businesses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "PASTE_YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE_HERE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <head>
        <SchemaMarkup />
      </head>
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
