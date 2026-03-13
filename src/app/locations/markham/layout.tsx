import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Markham | SEO & Digital Agency — DOTxLabs",
  description:
    "Custom web design and SEO for Markham businesses. Websites built to rank on Google and generate local leads. Free consultation from DOTxLabs.",
  alternates: {
    canonical: "/locations/markham",
  },
};

export default function MarkhamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
