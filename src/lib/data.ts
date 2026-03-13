export const NAV_SERVICES = {
  SERVICES: [
    { name: "Web Development", href: "/services#web-development" },
    { name: "SEO", href: "/services#seo" },
    { name: "AI Automation", href: "/services#ai-automation" },
  ],
  "MORE SERVICES": [
    { name: "Brand Strategy & Visual Identity", href: "/services#brand-strategy" },
    { name: "Logo Design", href: "/services#logo-design" },
    { name: "Digital Marketing", href: "/services#digital-marketing" },
    { name: "Social Media Marketing", href: "/services#social-media-marketing" },
    { name: "Full-Scale Marketing Campaigns", href: "/services#marketing-campaigns" },
  ],
};

export type ServiceCategory = "Design" | "Marketing" | "Technology";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  headline: string;
  description: string;
  deliverables: string[];
}

export const SERVICES: Service[] = [
  {
    id: "web-development",
    name: "Web Development",
    category: "Technology",
    headline: "Fast, Beautiful, Conversion-Ready.",
    description:
      "Custom web development with React, Next.js, and Shopify. We build performant, accessible websites and e-commerce stores that turn visitors into customers.",
    deliverables: [
      "Custom React/Next.js or Shopify development",
      "Responsive, mobile-first design implementation",
      "CMS integration & content management",
      "Performance optimization (Core Web Vitals)",
      "Launch support & documentation",
    ],
  },
  {
    id: "seo",
    name: "SEO",
    category: "Technology",
    headline: "Get Found. Stay Found.",
    description:
      "Technical and content SEO that earns you sustainable organic traffic. We optimize your site architecture, content, and authority to rank where it matters.",
    deliverables: [
      "Technical SEO audit & implementation",
      "Keyword research & content strategy",
      "On-page optimization",
      "Link building & digital PR",
      "Monthly ranking & traffic reports",
    ],
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    category: "Technology",
    headline: "Work Smarter. Scale Faster.",
    description:
      "Custom AI solutions that automate repetitive work and unlock new capabilities. From chatbots to workflow automation, we integrate AI where it creates the most value.",
    deliverables: [
      "AI opportunity audit & strategy",
      "Custom chatbot & conversational AI",
      "Workflow automation (Zapier, Make, custom)",
      "AI-powered content & analytics tools",
      "Integration with existing tech stack",
    ],
  },
  {
    id: "brand-strategy",
    name: "Brand Strategy & Visual Identity",
    category: "Design",
    headline: "Define Your Brand. Own Your Market.",
    description:
      "We build brand systems that resonate. From positioning and messaging to full visual identity kits, we craft the foundation your business needs to stand out in crowded markets.",
    deliverables: [
      "Brand positioning & messaging framework",
      "Visual identity system (colors, typography, imagery)",
      "Brand guidelines document",
      "Competitive landscape analysis",
      "Tone of voice guide",
    ],
  },
  {
    id: "logo-design",
    name: "Logo Design",
    category: "Design",
    headline: "A Mark That Speaks Volumes.",
    description:
      "Your logo is the first impression your brand makes. We design distinctive, versatile marks that capture your essence and work beautifully across every medium.",
    deliverables: [
      "Primary logo + wordmark",
      "Logo variations (stacked, horizontal, icon-only)",
      "Full color, monochrome, and reversed versions",
      "Scalable vector files (SVG, EPS, PDF)",
      "Logo usage guidelines",
    ],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    category: "Marketing",
    headline: "Reach the Right People. Drive Real Results.",
    description:
      "Data-driven digital marketing strategies that connect you with your ideal audience. We manage PPC, email, and content marketing campaigns that deliver measurable ROI.",
    deliverables: [
      "Digital marketing strategy & roadmap",
      "Google Ads & Meta Ads management",
      "Email marketing sequences",
      "Content marketing calendar",
      "Monthly analytics & reporting",
    ],
  },
  {
    id: "social-media-marketing",
    name: "Social Media Marketing",
    category: "Marketing",
    headline: "Build Community. Amplify Your Voice.",
    description:
      "Strategic social media management that builds engaged communities around your brand. We create scroll-stopping content and foster meaningful conversations.",
    deliverables: [
      "Social media strategy & content calendar",
      "Platform-specific content creation",
      "Community management & engagement",
      "Influencer partnership coordination",
      "Performance reporting & optimization",
    ],
  },
  {
    id: "marketing-campaigns",
    name: "Full-Scale Marketing Campaigns",
    category: "Marketing",
    headline: "Orchestrated Campaigns. Maximum Impact.",
    description:
      "End-to-end campaign strategy and execution across all channels. We unify your messaging, creative, and distribution for campaigns that move the needle.",
    deliverables: [
      "Integrated campaign strategy",
      "Multi-channel creative production",
      "Media planning & buying",
      "Launch coordination & project management",
      "Post-campaign analysis & insights",
    ],
  },
];

export const CORE_SERVICES = SERVICES.filter((s) => s.category === "Technology");
export const MORE_SERVICES = SERVICES.filter((s) => s.category !== "Technology");

export const CLIENT_TYPES = [
  "Startups",
  "E-Commerce Brands",
  "SaaS Companies",
  "Professional Services",
  "Restaurants & Hospitality",
  "Real Estate",
  "Health & Wellness",
  "Tech Companies",
  "Creative Agencies",
  "Non-Profits",
  "Local Businesses",
  "Enterprise Teams",
];

export const PHILOSOPHY_ROWS = [
  {
    label: "AI-FIRST",
    description:
      "We integrate AI into every workflow — from strategy to execution. Smarter tools mean faster timelines, sharper insights, and better outcomes for your brand.",
  },
  {
    label: "FULL-SERVICE",
    description:
      "Design, marketing, and technology under one roof. No juggling vendors, no disconnected strategies — just cohesive work from a team that sees the full picture.",
  },
  {
    label: "BUILT FOR GROWTH",
    description:
      "Every deliverable is engineered to scale with your business. We build systems and strategies that compound over time, not quick fixes that expire next quarter.",
  },
];
