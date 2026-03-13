export interface LocationPageData {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
  }[];
  cta: string;
  nearbyAreas: string[];
}

export const LOCATION_PAGES: LocationPageData[] = [
  {
    slug: "oshawa",
    city: "Oshawa",
    region: "Durham Region",
    metaTitle: "Web Design Oshawa | SEO & Digital Agency — DOTxLabs",
    metaDescription:
      "Web design, SEO, and digital marketing for Oshawa businesses. Custom websites that rank on Google and bring in local customers. Free quote from DOTxLabs.",
    headline: "Web design and SEO for businesses in Oshawa.",
    intro:
      "If you run a business in Oshawa and your website isn't bringing in customers, that's fixable. We build custom websites, run SEO campaigns, and set up AI automation for businesses across Durham Region. Local expertise, real results.",
    sections: [
      {
        heading: "Why Oshawa businesses are investing in web design now",
        content:
          "Oshawa is growing. New businesses opening, established ones expanding, and the competition for local customers is getting tighter every year. The businesses that show up first on Google when someone searches \"plumber oshawa\" or \"dentist near me\" are the ones getting the calls.\n\nMost Oshawa businesses we work with come to us because their current site is outdated, slow, or invisible on search engines. Some built a Wix site five years ago and never touched it. Others paid a freelancer who disappeared after launch. The result is the same: a website that costs money to maintain and earns nothing back.",
      },
      {
        heading: "What we build for Oshawa businesses",
        content:
          "Custom websites on Next.js and Shopify. Fast, mobile-first, and built with SEO from the ground up. Every site we build for an Oshawa client includes local SEO setup: Google Business Profile optimization, Durham Region keyword targeting, schema markup that tells Google exactly where you are and what you do.\n\nWe've worked with service businesses, retail shops, restaurants, and professional firms across Oshawa. The scope varies but the approach is the same: understand the business, research the local market, build something that actually performs.",
      },
      {
        heading: "SEO that targets Oshawa and Durham Region",
        content:
          "Here's what most people don't realize about local SEO in Oshawa: the competition is low compared to downtown Toronto. Keywords like \"web design oshawa\" and \"seo services durham region\" have real search volume and relatively few businesses actively competing for them.\n\nThat's an opportunity with an expiration date. The businesses that invest in SEO now will be the ones dominating local search results for years. We handle technical SEO, content strategy, link building, and Google Business Profile management for Oshawa businesses that want to own their local market.",
      },
      {
        heading: "More than a website",
        content:
          "We don't just build a site and move on. After launch, we monitor performance, bring growth ideas to the table, and help you figure out what's next. AI chatbots for handling after-hours inquiries. Automated email sequences for following up with leads. Marketing campaigns that actually connect with the Oshawa market.\n\nYour website is the foundation. What we build on top of it is what makes the difference.",
      },
    ],
    cta: "If you're an Oshawa business ready for a website that actually works, let's talk.",
    nearbyAreas: ["Whitby", "Ajax", "Pickering", "Bowmanville", "Courtice"],
  },
  {
    slug: "pickering",
    city: "Pickering",
    region: "Durham Region",
    metaTitle: "Web Design Pickering | SEO & Digital Agency — DOTxLabs",
    metaDescription:
      "Custom web design and SEO for Pickering businesses. Websites that rank locally, load fast, and convert visitors into customers. Get a free quote.",
    headline: "Web design and SEO for businesses in Pickering.",
    intro:
      "Pickering businesses that invest in their online presence are pulling ahead of the ones that don't. We build custom websites, run local SEO, and automate the parts of your business that don't need a human. If your current site isn't generating leads, we can fix that.",
    sections: [
      {
        heading: "Pickering is competitive. Your website should be too.",
        content:
          "Pickering sits right on the edge of the GTA with a growing population and a business community that's expanding fast. Whether you're in the city centre, along Kingston Road, or near the Pickering Town Centre area, your potential customers are searching online before they pick up the phone.\n\nThe businesses that show up in those search results are winning. If you're not one of them, every day is missed revenue going to a competitor who invested in their website and SEO before you did.",
      },
      {
        heading: "Custom websites for Pickering businesses",
        content:
          "We build on Next.js and Shopify. No templates, no page builders. Every site is designed for your specific business and your specific market. For Pickering businesses, that means local keyword targeting baked into every page, fast load times that Google rewards, and a design that makes your business look as professional online as it is in person.\n\nWe handle everything: strategy, design, development, content, SEO setup, and launch. You get a staging site to review before anything goes live.",
      },
      {
        heading: "Local SEO for the Pickering market",
        content:
          "Local SEO is how you show up when someone in Pickering searches for your service. Google Business Profile optimization, local citations, location-specific content, and technical SEO that makes your site easy for Google to understand and index.\n\nPickering has less SEO competition than Toronto proper, which means a focused local strategy can put you on page one faster than you'd expect. We've seen Pickering businesses go from invisible to top three within a few months of starting consistent SEO work.",
      },
      {
        heading: "Beyond the build",
        content:
          "A website is step one. We also run digital marketing campaigns, build AI chatbots for handling customer inquiries, and set up automation that saves your team hours every week. Everything integrates with your existing tools. Nothing we build creates more work for you.",
      },
    ],
    cta: "Ready to put your Pickering business on the map? Let's talk.",
    nearbyAreas: ["Ajax", "Scarborough", "Markham", "Oshawa", "Whitby"],
  },
  {
    slug: "ajax",
    city: "Ajax",
    region: "Durham Region",
    metaTitle: "Web Design Ajax | SEO & Digital Agency — DOTxLabs",
    metaDescription:
      "Web design and SEO services for Ajax, Ontario businesses. Custom-built websites that rank on Google and generate local leads. Free consultation.",
    headline: "Web design and SEO for businesses in Ajax.",
    intro:
      "Ajax businesses deserve a web presence that matches the quality of what they actually do. We build custom websites that rank locally, run SEO campaigns that bring in the right traffic, and automate the busywork that slows your team down.",
    sections: [
      {
        heading: "Ajax businesses are leaving money on the table",
        content:
          "When someone in Ajax needs a service, they Google it. If your business doesn't show up in those results, the customer goes to whoever does. It's that simple.\n\nMost Ajax businesses we talk to have a website that was built years ago, hasn't been updated, and ranks for nothing. Or they're on Wix or Squarespace and can't figure out why they're not showing up. The answer is almost always the same: the site wasn't built with SEO in mind, and nobody's done any optimization since it launched.",
      },
      {
        heading: "What we build",
        content:
          "Custom websites on modern frameworks. Fast, responsive, designed for your business and your local market. Every Ajax project includes local SEO fundamentals: Google Business Profile setup, Durham Region keyword targeting, proper schema markup, and content that positions you for the searches your customers are actually making.\n\nWe also build Shopify stores for Ajax retailers and e-commerce businesses. Product pages optimized for search, payment and shipping configured, and a design that doesn't look like every other Shopify template on the internet.",
      },
      {
        heading: "Local SEO in Ajax",
        content:
          "Ajax is part of one of the fastest-growing corridors in the GTA. More people, more businesses, more competition for local search visibility. The window for easy local SEO wins is still open, but it's closing.\n\nWe target the keywords that Ajax customers are searching for, build content around those terms, and make sure your site's technical foundation is solid. Google Business Profile optimization, review strategy, local link building. The full picture, not just one piece of it.",
      },
      {
        heading: "We stick around after launch",
        content:
          "The website goes live, and then the real work starts. We track performance, adjust strategy based on actual data, and bring ideas you didn't ask for but probably need. New service pages to target emerging keywords. Blog content that builds authority. Automation that handles the admin tasks eating into your team's time.\n\nWe want to see your business grow. That's not just a line.",
      },
    ],
    cta: "Let's build something that puts your Ajax business in front of the right people.",
    nearbyAreas: ["Pickering", "Whitby", "Oshawa", "Scarborough", "Markham"],
  },
  {
    slug: "whitby",
    city: "Whitby",
    region: "Durham Region",
    metaTitle: "Web Design Whitby | SEO & Digital Agency — DOTxLabs",
    metaDescription:
      "Web design and SEO for Whitby businesses. Custom websites built to rank on Google, generate leads, and grow your local customer base. Free quote.",
    headline: "Web design and SEO for businesses in Whitby.",
    intro:
      "Whitby is one of the fastest-growing communities in Durham Region, and the businesses that are investing in their online presence are the ones capturing that growth. We build custom websites and run SEO campaigns that put Whitby businesses in front of local customers.",
    sections: [
      {
        heading: "Whitby's growth is an opportunity",
        content:
          "New residents, new developments, new demand for local services. Whitby's population has been climbing steadily and that means more people searching Google for businesses in the area every day.\n\nThe businesses that rank for those searches get the calls. The ones that don't are losing customers to competitors who invested in their web presence first. If you're a Whitby business without a strong website and SEO strategy, you're handing revenue to someone else.",
      },
      {
        heading: "Websites built for Whitby businesses",
        content:
          "We build custom sites on Next.js and Shopify. No templates. Every project starts with understanding your business, your customers, and what your competitors in the Whitby market are doing online. Then we design and develop a site specifically for you.\n\nLocal SEO is built into every page from the start. We're not bolting it on as an afterthought. Keyword research, site architecture, content strategy, and technical optimization are all part of the build process. When your site launches, it's ready to rank.",
      },
      {
        heading: "Owning local search in Whitby",
        content:
          "Keywords like \"web design whitby\" and \"seo whitby\" still have relatively low competition. A Whitby business that starts doing SEO now can establish itself at the top of local results before the market gets saturated.\n\nWe handle the full scope: technical audits, on-page optimization, content creation, Google Business Profile management, local link building, and monthly reporting that shows you exactly what's happening with your rankings and traffic. No mystery, no vanity metrics.",
      },
      {
        heading: "Long-term partnership, not a one-time project",
        content:
          "We treat every Whitby client the same way we'd treat our own business. That means we don't disappear after launch. We provide ongoing support, flag opportunities, bring strategy ideas, and help you scale your online presence as your business grows.\n\nWhether you need a new website, SEO, AI automation, or a full digital strategy, we're the team that sticks around to make sure it's working.",
      },
    ],
    cta: "If your Whitby business is ready for a website that performs, we should talk.",
    nearbyAreas: ["Oshawa", "Ajax", "Pickering", "Brooklin", "Courtice"],
  },
];

export function getLocationPage(slug: string): LocationPageData | undefined {
  return LOCATION_PAGES.find((l) => l.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return LOCATION_PAGES.map((l) => l.slug);
}
