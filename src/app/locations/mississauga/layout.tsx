import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Mississauga | SEO & Digital Agency — DOTxLabs",
  description:
    "Web design and SEO for Mississauga businesses. Custom websites that rank on Google, load fast, and convert visitors into customers. Free quote from DOTxLabs.",
  alternates: {
    canonical: "/locations/mississauga",
  },
};

export default function MississaugaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
