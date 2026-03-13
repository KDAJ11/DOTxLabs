import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services Toronto & Durham Region | Get Found on Google — DOTxLabs",
  description:
    "SEO for Toronto, Oshawa, and GTA businesses. Technical audits, keyword strategy, content, and link building that gets you ranking where it matters.",
  alternates: {
    canonical: "/services/seo",
  },
};

export default function SEOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
