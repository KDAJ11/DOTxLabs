import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Scarborough | SEO & Digital Agency — DOTxLabs",
  description:
    "Web design and SEO services for Scarborough businesses. Custom websites built to rank locally and generate leads. Get a free quote from DOTxLabs.",
  alternates: {
    canonical: "/locations/scarborough",
  },
};

export default function ScarboroughLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
