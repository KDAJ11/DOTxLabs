import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Web Design & SEO Insights for GTA Businesses",
  description:
    "Practical articles on web design, SEO, and digital marketing for small businesses in Toronto, Durham Region, and the GTA. No fluff, just useful information.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Web Design & SEO Insights for GTA Businesses",
    description:
      "Practical articles on web design, SEO, and digital marketing for small businesses in Toronto, Durham Region, and the GTA.",
    url: "https://www.dotxlabs.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
