/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.dotxlabs.com",
  generateRobotsTxt: false, // We already have a custom robots.txt
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  transform: async (config, path) => {
    // Set higher priority for key pages
    const highPriority = ["/", "/services", "/contact", "/blog"];
    const mediumPriority = [
      "/services/web-development",
      "/services/seo",
      "/services/shopify-development",
      "/services/ai-automation",
      "/services/digital-marketing",
      "/services/brand-strategy",
    ];

    let priority = config.priority;
    if (highPriority.includes(path)) priority = 1.0;
    else if (mediumPriority.includes(path)) priority = 0.9;
    else if (path.startsWith("/blog/")) priority = 0.6;

    return {
      loc: path,
      changefreq: path === "/" ? "daily" : config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
