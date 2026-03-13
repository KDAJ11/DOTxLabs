export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  readingTime: string;
  category: string;
  excerpt: string;
  sections: {
    heading?: string;
    content: string;
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-much-does-a-website-cost-in-canada",
    title: "How much does a website cost in Canada?",
    metaTitle: "How Much Does a Website Cost in Canada (2025) | DOTxLabs",
    metaDescription:
      "Honest breakdown of website costs in Canada for 2025. Template sites, custom builds, Shopify stores, and what actually affects the price.",
    date: "2025-03-10",
    readingTime: "3 min read",
    category: "Web Design",
    excerpt:
      "The real answer nobody wants to give you. We break down what websites actually cost in Canada, what affects the price, and when it makes sense to spend more.",
    sections: [
      {
        content:
          "If you Google this question, you'll get a range so wide it's useless. \"Anywhere from $500 to $100,000.\" Thanks. Very helpful.\n\nThe truth is, website pricing in Canada depends on what you're building, who's building it, and what you expect it to do for your business. A brochure site for a local plumber and a full e-commerce store with 500 products are completely different projects. Pricing them the same would be ridiculous.",
      },
      {
        heading: "The template route: $0 to $2,000",
        content:
          "Wix, Squarespace, and WordPress.com let you drag and drop a site together for the cost of a monthly subscription. You can get something live for under $500 if you do the work yourself.\n\nThe tradeoff is real though. You're limited to what the template allows. Load times are often slow. SEO is restricted. And your site ends up looking like every other business in your industry that picked the same template. For some businesses, that's fine. If you just need a digital business card and you're not competing online, a template can work.\n\nBut if your website needs to generate leads, rank on Google, or handle transactions, a template will hold you back.",
      },
      {
        heading: "Freelancer builds: $2,000 to $8,000",
        content:
          "Hiring a freelance web developer in Canada typically costs between $2,000 and $8,000 for a standard business website. You get more customization than a template, and a decent freelancer will build something clean and functional.\n\nThe risk with freelancers is consistency and support. Some are excellent. Some disappear after launch. You're also usually getting one skill set. A developer who writes great code might not understand SEO. A designer who makes beautiful layouts might not think about conversion. There's no team behind them to catch what they miss.",
      },
      {
        heading: "Agency builds: $8,000 to $50,000+",
        content:
          "A proper agency build in Canada starts around $8,000 to $10,000 for a well-designed, custom-coded business website. That includes strategy, design, development, SEO setup, and launch support.\n\nLarger projects like e-commerce stores, web applications, or sites with complex integrations can run $15,000 to $50,000 or higher. The jump in price gets you a team: strategist, designer, developer, sometimes a dedicated SEO or copywriter. You also get post-launch support, which matters more than people think.\n\nAt DOTxLabs, our projects are scoped individually. We don't publish a price list because every business has different needs. What we do guarantee is a fixed quote before work starts, so you know exactly what you're paying.",
      },
      {
        heading: "Shopify stores specifically",
        content:
          "Shopify itself costs $39 to $399 per month depending on your plan. On top of that, building out a custom Shopify theme, configuring products, setting up payments, and optimizing for search can cost anywhere from $3,000 for a simple store to $20,000+ for something with custom functionality.\n\nThe cost really depends on how many products you have, whether you need custom features like product configurators or subscription models, and how much SEO and copywriting you need for your product pages.",
      },
      {
        heading: "What actually drives the cost up",
        content:
          "Number of pages is the obvious one. But beyond that: custom animations, e-commerce functionality, third-party integrations (CRMs, payment gateways, booking systems), content creation, and ongoing SEO work all add up.\n\nThe biggest hidden cost is content. Most businesses underestimate how much time and effort goes into writing good copy for a website. If you're handing your developer a blank page and saying \"you figure it out,\" expect the project to take longer and cost more.\n\nAnother factor: revision rounds. Agencies that offer unlimited revisions are either padding their prices or planning to cut corners somewhere. A clear process with defined approval stages keeps the project on budget.",
      },
      {
        heading: "When it makes sense to spend more",
        content:
          "If your website is your primary source of new business, it's worth investing in. A $15,000 site that generates $5,000 in monthly revenue pays for itself in three months. A $500 template that sits there doing nothing is the more expensive option in the long run.\n\nThe question isn't \"how much does a website cost.\" It's \"how much is a bad website costing you right now.\"",
      },
    ],
  },
  {
    slug: "wix-vs-custom-website",
    title: "Wix vs custom website: which one is right for your business?",
    metaTitle:
      "Wix vs Custom Website: Which Is Right for Your Business? | DOTxLabs",
    metaDescription:
      "Honest comparison of Wix vs custom-built websites. Performance, SEO, cost, and when each option makes sense for Canadian businesses.",
    date: "2025-03-06",
    readingTime: "3 min read",
    category: "Web Design",
    excerpt:
      "Wix is easy. Custom is better. But the real answer depends on what your business actually needs. Here's how to decide.",
    sections: [
      {
        content:
          "This isn't going to be one of those articles that pretends to be balanced and then tells you to hire an agency. We build custom websites. That's our business. You should know that going in.\n\nBut I've also told people to use Wix when it was the right call for them. There are situations where a website builder makes perfect sense, and situations where it'll actively cost you money. The difference comes down to what your website needs to do.",
      },
      {
        heading: "When Wix makes sense",
        content:
          "If you need a simple online presence and your business doesn't depend on being found through Google, Wix works. A personal portfolio. A hobby site. A restaurant that gets most of its traffic from Instagram and just needs a menu and hours online.\n\nWix is fast to set up, costs about $17 to $45 per month, and doesn't require any technical knowledge. You pick a template, swap in your content, and you're live. That has real value if you're bootstrapping and can't invest in a custom build yet.\n\nThe drag-and-drop editor is also genuinely good for simple pages. Wix has improved a lot over the years.",
      },
      {
        heading: "Where Wix falls short",
        content:
          "Performance. Wix sites are consistently slower than custom-built sites. Google's own Core Web Vitals data backs this up. Slower sites rank lower, and visitors leave faster. If you've ever clicked on a small business website and waited three seconds for it to load, there's a good chance it was built on Wix or a similar platform.\n\nSEO is the bigger issue. Wix gives you basic SEO controls, but you're limited in how you structure URLs, how you handle technical SEO, and how much control you have over your site's architecture. For competitive keywords in markets like Toronto, these limitations matter. You're essentially racing with a speed limiter on.\n\nThere's also the design ceiling. Every Wix site is built from the same template library. You can customize, but you can't break out of the template's structure. If you want something that doesn't look like it was built on Wix, you need to not build it on Wix.",
      },
      {
        heading: "When custom is worth the investment",
        content:
          "If your business depends on online visibility, lead generation, or e-commerce, a custom website pays for itself. You get full control over performance, SEO, design, and functionality. Nothing is locked behind a platform's limitations.\n\nCustom sites built on frameworks like Next.js consistently outperform website builders on page speed, which directly affects your Google ranking. They're built specifically for your business, not adapted from a template that was designed to work for everyone and therefore works perfectly for no one.\n\nYou also own the code. If you want to move hosts, add features, or scale, you can. With Wix, you're locked into their ecosystem. If Wix raises prices, changes features, or goes in a direction you don't like, your options are limited.",
      },
      {
        heading: "The cost comparison people get wrong",
        content:
          "People compare Wix at $35/month to a custom site at $10,000 and think the math is obvious. But that comparison ignores what each option produces.\n\nA Wix site that doesn't rank on Google and doesn't convert visitors into customers costs you $420 per year plus all the revenue you're not getting. A custom site that ranks for your target keywords and converts at 3% instead of 0.5% might pay for itself in the first quarter.\n\nThe real cost of a website isn't what you pay to build it. It's what it earns you. Or what it costs you by not earning anything.",
      },
      {
        heading: "How to decide",
        content:
          "Ask yourself two questions. First: does my business need to be found on Google? If yes, custom. Wix's SEO limitations are real and they matter in competitive markets.\n\nSecond: is my website a brochure or a business tool? If it's just proof that your business exists, Wix is fine. If it needs to generate leads, sell products, or build trust with potential clients before they call you, invest in something built for that purpose.\n\nAnd if you're not sure, reach out to us. We'll give you an honest answer even if that answer is \"use Wix for now.\"",
      },
    ],
  },
  {
    slug: "why-every-gta-small-business-needs-seo",
    title: "Why every small business in the GTA needs SEO",
    metaTitle:
      "Why Every GTA Small Business Needs SEO in 2025 | DOTxLabs",
    metaDescription:
      "GTA small businesses are losing customers to competitors who invest in SEO. Here's why local SEO matters and what it actually takes to rank in Toronto, Oshawa, and Durham Region.",
    date: "2025-03-01",
    readingTime: "4 min read",
    category: "SEO",
    excerpt:
      "Your competitors are ranking above you on Google right now. If you're a small business in the GTA and you're not doing SEO, here's what that's costing you.",
    sections: [
      {
        content:
          "Here's what happens when someone in Oshawa needs a plumber, a lawyer, a web designer, or a dentist. They open Google and type something like \"plumber near me\" or \"web design oshawa.\" They click one of the first three results. Maybe the fourth. Almost nobody scrolls to page two.\n\nIf your business isn't in those top results, you don't exist to that person. They're not going to hunt for you. They're going to call whoever shows up first.\n\nThat's what SEO does. It puts you in front of people who are already looking for what you sell, at the exact moment they need it.",
      },
      {
        heading: "Most GTA small businesses ignore this completely",
        content:
          "The majority of small businesses in Toronto, Durham Region, and the surrounding GTA have either no SEO strategy or a website that was \"optimized\" once when it launched three years ago and hasn't been touched since.\n\nMeanwhile, their competitors who do invest in SEO are quietly capturing all the search traffic. Every month that gap gets wider. The businesses that rank on page one get more clicks, more calls, and more revenue. The businesses on page three get nothing.\n\nThis isn't theory. We see it constantly with new clients who come to us wondering why their phone stopped ringing. The answer is almost always the same: someone else started ranking above them.",
      },
      {
        heading: "Local SEO is different from regular SEO",
        content:
          "When we talk about SEO for GTA businesses, we're mostly talking about local SEO. This is a specific discipline focused on ranking in your geographic area.\n\nLocal SEO involves optimizing your Google Business Profile, building citations (your business listed consistently across directories), earning reviews, and making sure your website clearly communicates where you are and what areas you serve.\n\nThe Google Map Pack, those three business listings that show up with a map at the top of local searches, is driven by local SEO signals. If you're a service business in Whitby or Pickering and you're not showing up in the Map Pack, you're invisible to the people most likely to become your customers.",
      },
      {
        heading: "What SEO actually involves",
        content:
          "SEO isn't one thing. It's a combination of technical work on your website, content creation, and off-site authority building.\n\nTechnical SEO means making sure your website loads fast, is mobile-friendly, has clean code, and is structured so Google can understand and index it properly. Things like schema markup, canonical tags, and sitemap configuration. Not glamorous, but it's the foundation.\n\nOn-page SEO means your content. The words on your pages need to match what people are actually searching for. That means keyword research, writing useful content around those keywords, and structuring your pages so Google knows what they're about.\n\nOff-site SEO means building your website's authority through backlinks from other reputable websites, mentions in local directories, and a solid Google Business Profile with real reviews from real customers.",
      },
      {
        heading: "Durham Region is wide open",
        content:
          "Here's the thing about local SEO in the GTA: the competition varies wildly by area. In downtown Toronto, ranking for \"web design toronto\" is competitive. There are agencies with six-figure SEO budgets going after those keywords.\n\nBut in Durham Region, the opportunity is massive. Keywords like \"web design oshawa\" or \"seo services whitby\" have real search volume and far less competition. A small business in Ajax or Pickering that invests even modestly in SEO can dominate their local search results within a few months.\n\nWe work with businesses across Durham Region specifically because we see this gap. The demand is there. The competition hasn't caught up yet. That window won't stay open forever.",
      },
      {
        heading: "What it costs to not do SEO",
        content:
          "Business owners often think of SEO as an expense. It's actually the opposite. Not doing SEO is the expense.\n\nEvery potential customer who searches for your service and finds your competitor instead is revenue you lost. If ten people a day search for what you do in your area, and zero of them find you, that's ten missed opportunities daily. Over a year that adds up to thousands of potential customers who went somewhere else.\n\nPaid ads can fill some of that gap, but they stop working the moment you stop paying. SEO compounds. The work you do this month continues to bring in traffic next month, and the month after that. It's one of the few marketing investments that actually gets better over time.",
      },
      {
        heading: "Where to start",
        content:
          "If you're a GTA small business and you've never invested in SEO, start with three things. First, claim and fully optimize your Google Business Profile. Add photos, respond to reviews, and make sure your hours and contact info are accurate.\n\nSecond, make sure your website has proper technical SEO. Fast load times, mobile-friendly design, clean URLs, and a sitemap that tells Google what pages you have.\n\nThird, create content that answers the questions your customers are asking. Blog posts, FAQ pages, service descriptions. Google rewards websites that provide useful information.\n\nOr reach out to us and we'll handle all of it. Either way, doing nothing is the most expensive option.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
