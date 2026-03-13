import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Toronto | Custom Websites & SEO Services — DOTxLabs",
  description:
    "Custom web design and SEO for Toronto businesses. We build websites that rank, convert, and actually reflect your brand. Free consultation from DOTxLabs.",
  alternates: {
    canonical: "/locations/toronto",
  },
};

export default function TorontoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
