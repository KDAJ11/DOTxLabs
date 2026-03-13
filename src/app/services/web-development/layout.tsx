import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Toronto | Custom Websites for GTA Businesses — DOTxLabs",
  description:
    "Custom web design and development in Toronto. Next.js, Shopify, and WordPress sites built to rank, convert, and scale. Free quote for GTA businesses.",
  alternates: {
    canonical: "/services/web-development",
  },
};

export default function WebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
