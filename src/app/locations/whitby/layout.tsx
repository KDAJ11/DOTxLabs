import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Whitby | SEO & Digital Agency — DOTxLabs",
  description:
    "Web design and SEO for Whitby businesses. Custom websites built to rank on Google, generate leads, and grow your local customer base. Free quote.",
  alternates: {
    canonical: "/locations/whitby",
  },
};

export default function WhitbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
