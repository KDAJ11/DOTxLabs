import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Oshawa | SEO & Digital Agency — DOTxLabs",
  description:
    "Web design, SEO, and digital marketing for Oshawa businesses. Custom websites that rank on Google and bring in local customers. Free quote from DOTxLabs.",
  alternates: {
    canonical: "/locations/oshawa",
  },
};

export default function OshawaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
