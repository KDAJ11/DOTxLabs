export interface ServicePageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
  }[];
  cta: string;
}

export const SERVICE_PAGES: ServicePageData[] = [
  {
    slug: "web-development",
    metaTitle: "Web Design Toronto | Custom Websites for GTA Businesses",
    metaDescription:
      "Custom web design and development in Toronto. Next.js, Shopify, and WordPress sites built to rank, convert, and scale. Free quote for GTA businesses.",
    headline: "Websites that work as hard as you do.",
    intro:
      "A website is either making you money or it's not. We build custom sites on Next.js, Shopify, and WordPress that load fast, rank on Google, and turn visitors into customers. No templates, no page builders, no shortcuts.",
    sections: [
      {
        heading: "What we build",
        content:
          "Business websites, e-commerce stores, landing pages, and web applications. Every project gets custom design, custom code, and a strategy session before we touch a pixel. We've built single-page sites for local trades companies and full Shopify stores with 500+ products. The scope changes, the standard doesn't.",
      },
      {
        heading: "How we build it",
        content:
          "We start with research. Your market, your competitors, what keywords people in your area are actually searching. That informs the site architecture, the content, and the design decisions. Then we build in Next.js or Shopify depending on what your business needs, test across every device, optimize Core Web Vitals, and launch with SEO baked in from day one.\n\nYou get a staging link before anything goes live. Nothing launches without your approval.",
      },
      {
        heading: "Why it matters",
        content:
          "Page speed affects your Google ranking. So does mobile usability, code quality, and site architecture. A custom build gives us control over all of it. Template builders like Wix and Squarespace lock you into their limitations. We don't have those constraints. If you need a feature that doesn't exist out of the box, we build it.",
      },
      {
        heading: "After launch",
        content:
          "We don't hand over the keys and disappear. Post-launch support, performance monitoring, and ongoing optimization are part of how we work. Your site should get better over time, not decay.",
      },
    ],
    cta: "Tell us what you need built. We'll give you a fixed quote and a realistic timeline.",
  },
  {
    slug: "seo",
    metaTitle:
      "SEO Services Toronto & Durham Region | Get Found on Google",
    metaDescription:
      "SEO for Toronto, Oshawa, and GTA businesses. Technical audits, keyword strategy, content, and link building that gets you ranking where it matters.",
    headline: "Get found by the people who are already looking.",
    intro:
      "Every day, potential customers in your area are searching for exactly what you sell. If they're finding your competitors instead of you, that's not bad luck. It's a fixable problem. We do the technical work, the content strategy, and the authority building that gets your business ranking on page one.",
    sections: [
      {
        heading: "Technical SEO",
        content:
          "This is the foundation. We audit your site's code, fix crawl errors, implement schema markup, optimize page speed, configure sitemaps, and make sure Google can actually understand what your pages are about. Most sites we audit have technical issues that are silently killing their rankings. We find them and fix them.",
      },
      {
        heading: "Keyword strategy and content",
        content:
          "We research what people in your market are actually typing into Google. Not assumptions, real data. Then we build a content plan around those keywords. Blog posts, service pages, FAQ sections, location pages. Content that answers questions your customers are asking and positions your business as the authority.",
      },
      {
        heading: "Local SEO for the GTA",
        content:
          "If you serve a geographic area, local SEO is where the biggest wins are. We optimize your Google Business Profile, build consistent citations across directories, and create location-specific content that tells Google exactly where you operate.\n\nFor businesses in Durham Region (Oshawa, Whitby, Ajax, Pickering), the competition is still low and the opportunity is wide open.",
      },
      {
        heading: "Link building and authority",
        content:
          "Google ranks websites it trusts. Trust comes from other reputable sites linking to yours. We build those links through digital PR, local partnerships, and content that earns backlinks organically. No spam, no bought links. Sustainable authority that compounds over time.",
      },
      {
        heading: "What you get",
        content:
          "Monthly reporting that shows real numbers: rankings, traffic, conversions. Not vanity metrics. We track the keywords that matter to your business and show you exactly what's moving.",
      },
    ],
    cta: "Find out where you stand. We'll audit your site and show you what's holding you back.",
  },
  {
    slug: "ai-automation",
    metaTitle:
      "AI Automation for Business | Custom AI Solutions Toronto",
    metaDescription:
      "Custom AI automation for Toronto and GTA businesses. Chatbots, workflow automation, and intelligent systems that save time and scale operations.",
    headline: "Stop doing work a machine could do for you.",
    intro:
      "Most businesses have people spending hours on tasks that could be automated. Customer inquiries at 2am with nobody to answer. Manual data entry that eats half a workday. Follow-up emails that fall through the cracks. We build AI systems that handle the repetitive work so your team can focus on the parts that actually need a human.",
    sections: [
      {
        heading: "What we automate",
        content:
          "Chatbots that handle customer questions around the clock. Email sequences that trigger based on visitor behavior. Data processing that used to take hours, done in minutes. CRM integrations that keep your pipeline updated without anyone touching a spreadsheet.\n\nThe specifics depend on your business. We audit your workflows, identify where you're losing time, and build systems that get it back.",
      },
      {
        heading: "How it works",
        content:
          "We start by mapping your operations. Where does your team spend time on repetitive tasks? Where are things falling through the cracks? Then we scope a solution that fits your budget and your tech stack. Could be a simple Zapier integration. Could be a custom AI agent built on GPT-4 or Claude. The tool depends on the problem.",
      },
      {
        heading: "This isn't enterprise-only anymore",
        content:
          "Five years ago, this kind of automation needed a six-figure budget and a dev team. That's changed. The tools are accessible now, and the implementation cost has dropped dramatically. A local service business can have an AI chatbot handling bookings and inquiries for a fraction of what it would have cost in 2020. We make that happen.",
      },
      {
        heading: "Built to integrate",
        content:
          "We don't build isolated tools that create more work. Everything we build plugs into what you're already using. Your CRM, your email platform, your booking system, your website. The automation should feel invisible to your team. It just works.",
      },
    ],
    cta: "Tell us where you're losing time. We'll show you what AI can take off your plate.",
  },
];

export function getServicePage(slug: string): ServicePageData | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_PAGES.map((s) => s.slug);
}
