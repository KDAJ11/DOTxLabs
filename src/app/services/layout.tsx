import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Services | Web Design, SEO & AI Automation Toronto",
  description:
    "Explore DOTxLabs digital services: web design, SEO, Shopify development, AI automation, digital marketing & brand strategy for Toronto & GTA businesses.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Services | Web Design, SEO & AI Automation Toronto",
    description:
      "Explore DOTxLabs digital services: web design, SEO, Shopify development, AI automation & brand strategy for Toronto & GTA businesses.",
    url: "https://www.dotxlabs.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
