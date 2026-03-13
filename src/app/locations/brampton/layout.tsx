import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Brampton | SEO & Digital Agency — DOTxLabs",
  description:
    "Custom web design and SEO for Brampton businesses. Websites that rank locally, generate leads, and grow your customer base. Free consultation from DOTxLabs.",
  alternates: {
    canonical: "/locations/brampton",
  },
};

export default function BramptonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
