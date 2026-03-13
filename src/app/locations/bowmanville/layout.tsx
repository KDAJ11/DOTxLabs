import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Bowmanville | SEO & Digital Agency — DOTxLabs",
  description:
    "Web design and SEO for Bowmanville businesses. Custom websites that rank locally and drive real customers. Free consultation from DOTxLabs.",
  alternates: {
    canonical: "/locations/bowmanville",
  },
};

export default function BowmanvilleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
