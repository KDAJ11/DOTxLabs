import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Pickering | SEO & Digital Agency — DOTxLabs",
  description:
    "Custom web design and SEO for Pickering businesses. Websites that rank locally, load fast, and convert visitors into customers. Get a free quote.",
  alternates: {
    canonical: "/locations/pickering",
  },
};

export default function PickeringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
