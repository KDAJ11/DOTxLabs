import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Quote — DOTxLabs Toronto",
  description:
    "Get in touch with DOTxLabs for web design, SEO, Shopify development or AI automation. Free consultations for Toronto & GTA businesses. Same-day response.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Get a Free Quote — DOTxLabs Toronto",
    description:
      "Get in touch with DOTxLabs for web design, SEO, Shopify development or AI automation. Free consultations for Toronto & GTA businesses.",
    url: "https://www.dotxlabs.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
