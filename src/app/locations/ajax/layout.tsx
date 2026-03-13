import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Ajax | SEO & Digital Agency — DOTxLabs",
  description:
    "Web design and SEO services for Ajax, Ontario businesses. Custom-built websites that rank on Google and generate local leads. Free consultation.",
  alternates: {
    canonical: "/locations/ajax",
  },
};

export default function AjaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
