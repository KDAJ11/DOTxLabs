/**
 * JSON-LD Schema Markup for DOTxLabs
 * Includes: Organization, LocalBusiness, WebSite, FAQPage schemas
 * These help Google understand business info for rich results & local pack.
 */

import { FAQ_ITEMS } from "@/lib/data";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DOTxLabs",
  url: "https://www.dotxlabs.com",
  logo: "https://www.dotxlabs.com/logo.png",
  description:
    "AI-first full-service digital agency in Toronto & the GTA specializing in web design, SEO, Shopify development, and AI automation.",
  foundingDate: "2024",
  founders: [
    {
      "@type": "Person",
      name: "David Ajai",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["English"],
    url: "https://www.dotxlabs.com/contact",
  },
  sameAs: [
    // Add your social profiles here:
    // "https://www.linkedin.com/company/dotxlabs",
    // "https://www.instagram.com/dotxlabs",
    // "https://x.com/dotxlabs",
  ],
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.dotxlabs.com/#business",
  name: "DOTxLabs",
  image: "https://www.dotxlabs.com/og-image.png",
  url: "https://www.dotxlabs.com",
  telephone: "", // Add phone number
  description:
    "Toronto & GTA web design agency offering custom websites, SEO, Shopify development, digital marketing, and AI automation.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6532,
    longitude: -79.3832,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Toronto",
    },
    {
      "@type": "City",
      name: "Oshawa",
    },
    {
      "@type": "City",
      name: "Pickering",
    },
    {
      "@type": "City",
      name: "Ajax",
    },
    {
      "@type": "City",
      name: "Whitby",
    },
    {
      "@type": "City",
      name: "Markham",
    },
    {
      "@type": "City",
      name: "Mississauga",
    },
    {
      "@type": "City",
      name: "Brampton",
    },
    {
      "@type": "GeoCircle",
      name: "Durham Region",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 43.8975,
        longitude: -78.8658,
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "Greater Toronto Area",
    },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Design & Development",
          description:
            "Custom website design and development using modern frameworks like Next.js and React for Toronto & GTA businesses.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Services",
          description:
            "Search engine optimization including technical SEO, local SEO, and content strategy for GTA businesses.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Shopify Development",
          description:
            "Custom Shopify store development, theme customization, and e-commerce solutions.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Automation",
          description:
            "AI-powered business automation, chatbots, and workflow optimization.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Marketing",
          description:
            "Full-service digital marketing including PPC, social media, and content marketing for Toronto businesses.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Strategy",
          description:
            "Brand identity, positioning, and visual design for startups and growing businesses.",
        },
      },
    ],
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.dotxlabs.com/#website",
  url: "https://www.dotxlabs.com",
  name: "DOTxLabs",
  description:
    "AI-first digital agency in Toronto offering web design, SEO, Shopify development, and AI automation.",
  publisher: {
    "@id": "https://www.dotxlabs.com/#business",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function SchemaMarkup() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZATION_SCHEMA),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WEBSITE_SCHEMA),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_SCHEMA),
        }}
      />
    </>
  );
}
