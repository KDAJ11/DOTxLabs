import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import "./globals.css";

/* Dynamic imports — these are desktop-only or non-critical, so skip SSR */
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const ScrollProgressBar = dynamic(() => import("@/components/ui/ScrollProgressBar"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });

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
    google: "f48cRzUxDkSRkKREOU-1kUTx9GNtRSL_zFHhy5SuYoE",
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
        <link rel="icon" href="/DOTxLabsF.png" type="image/png" />
        <link rel="shortcut icon" href="/DOTxLabsF.png" />
        <link rel="apple-touch-icon" href="/DOTxLabsF.png" />
        <SchemaMarkup />
      </head>
      <body className="font-sans antialiased">
        {/* Skip to main content — WCAG 2.1 AA keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgressBar />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
