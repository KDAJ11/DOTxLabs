import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Vaughan | SEO & Digital Agency — DOTxLabs",
  description:
    "Web design and SEO for Vaughan businesses. Custom websites built to rank on Google and bring in local customers. Free consultation from DOTxLabs.",
  alternates: {
    canonical: "/locations/vaughan",
  },
};

export default function VaughanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
