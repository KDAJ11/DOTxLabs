import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | How DOTxLabs Operates — Toronto Digital Agency",
  description:
    "DOTxLabs is a Toronto-based digital agency built on excellence, AI, and long-term client growth. Web design, SEO & automation for businesses across the GTA and Canada.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
