export const NAV_SERVICES = {
  Services: [
    { name: "Web Development", href: "/services#web-development" },
    { name: "SEO", href: "/services#seo" },
    { name: "AI Automation", href: "/services#ai-automation" },
  ],
  "More Services": [
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
      "We use AI across every workflow, from research to deployment. That means faster timelines, sharper insights, and better results for your brand.",
  },
  {
    label: "FULL-SERVICE",
    description:
      "Design, marketing, and technology under one roof. No juggling vendors or dealing with disconnected strategies. One team, one vision, full picture.",
  },
  {
    label: "BUILT FOR GROWTH",
    description:
      "Everything we build is meant to scale with your business. We create systems that compound over time, not quick fixes that expire next quarter.",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn your business, your audience, and what's not working right now. Research and strategy sessions help us find the biggest opportunities.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We build a roadmap that connects design, marketing, and technology to your goals. Every decision is backed by data.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We design, develop, and iterate. AI tools speed up our workflow without cutting corners on quality.",
  },
  {
    number: "04",
    title: "Launch & Scale",
    description:
      "We deploy, measure, and optimize. After launch, we keep refining performance so your investment compounds over time.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How much does a website cost in Toronto?",
    answer:
      "It depends on the project. A clean business site is a different scope than a full Shopify store with hundreds of products and custom features. We scope every project individually and give you a fixed quote before any work starts. No surprises. Reach out and we'll give you an honest number based on what you actually need.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "We're flexible on this. Most projects are split into milestones, with a deposit to kick things off and payments tied to deliverables. If you need a different structure, we can work something out. We'd rather find a way to make it work than lose a good project over timing.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "A business website typically takes 2 to 3 weeks. A Shopify store runs closer to 3 to 4 weeks depending on product count and custom features. We give you a realistic timeline during discovery and we stick to it.",
  },
  {
    question: "What's your design process like?",
    answer:
      "We start by understanding your business. Not just what you sell, but who buys it and why your current setup isn't doing enough. From there we build a strategy, then move into wireframes and full interactive mockups. You sign off on the design before we write a single line of code. After build, we test across devices, optimize speed, and launch. Then we stick around to make sure it's actually performing.",
  },
  {
    question: "Do I get to see the website before it goes live?",
    answer:
      "Always. You get a staging link where you can click through every page, flag changes, and approve everything. Nothing goes live without your sign-off.",
  },
  {
    question: "Do you build Shopify stores?",
    answer:
      "Yes. Big stores and small ones. We've built everything from single-product launches to full catalogs with hundreds of SKUs. We handle product descriptions, on-page SEO, payment setup, shipping config, and custom theme development. If Shopify doesn't do something out of the box, we build it.",
  },
  {
    question: "Can you help with SEO after the website is built?",
    answer:
      "That's a big part of what we do. Technical audits, keyword research, on-page optimization, content strategy, link building, local SEO. The full scope. A website nobody can find is just an expensive business card.",
  },
  {
    question: "What is AI automation and how can it help my business?",
    answer:
      "AI automation means using artificial intelligence to handle the repetitive parts of your business so you can focus on the work that actually needs you. Could be a chatbot handling customer questions at 2am. Could be automated email sequences that respond based on what a visitor did on your site. Could be cutting hours of manual data entry down to minutes. We look at where you're losing time and build systems that get it back.",
  },
  {
    question: "Do you do logo design and branding?",
    answer:
      "Yes. Full brand identity: logo, color systems, typography, brand guidelines. I have an eye for design and years of marketing experience, so I understand how branding connects to your website, your ads, your social presence. It all has to feel like one thing. We make sure it does.",
  },
  {
    question: "Do you work with small businesses in Durham Region?",
    answer:
      "Of course. We work with businesses across Durham Region: Oshawa, Whitby, Ajax, Pickering, Bowmanville, and everywhere in between. Plus the rest of the GTA and across Canada. Local businesses are the backbone of what we do. If you're in Durham and need a web presence that actually competes, we're your team.",
  },
  {
    question: "Why should I hire a local Toronto agency instead of using Wix or Squarespace?",
    answer:
      "Look at our website. Then go look at a Wix template. That's the answer. Drag-and-drop builders give you something generic that loads slow, ranks poorly, and looks like everyone else in your industry. We build custom sites that are fast, rank on Google, and are designed specifically around your business. You're not getting a template. You're getting something your competitors can't replicate.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. We do full redesigns: new architecture, new design, new code. We audit what you have, figure out what's working and what isn't, migrate your content, and build something that actually generates leads. Most clients come to us because their current site isn't pulling its weight. We fix that.",
  },
  {
    question: "What does AI-first actually mean?",
    answer:
      "It means AI isn't a marketing buzzword for us. It's how we work every day. We use AI tools throughout our process: research, content, design iteration, development, testing, optimization. That lets us move faster than agencies twice our size while keeping quality where it needs to be. For our clients, it also means we can build AI into their business. Chatbots, automated workflows, intelligent analytics. Things that used to need enterprise budgets are now accessible to businesses of any size.",
  },
  {
    question: "What makes DOTxLabs different from other agencies?",
    answer:
      "We treat every project like it's our own business. That's not a tagline, it's how we operate. We don't build a website and disappear. We provide support after launch, bring business development ideas to the table, and actually care whether the thing we built is making you money. Most agencies deliver a site and send an invoice. We deliver a site and ask what's next.",
  },
  {
    question: "Do you work with businesses outside the GTA?",
    answer:
      "Yes. We work with clients across Canada and internationally. We've got clients in West Africa right now. As long as we can get on a call and understand your business, location doesn't matter. Same quality, same commitment, wherever you are.",
  },
];
