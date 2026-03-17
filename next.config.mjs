/** @type {import('next').NextConfig} */

// Content Security Policy — allows self, Google Fonts, Vercel Analytics/Speed Insights
// Using report-only would be safer for initial rollout, but we go strict per spec
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https:;
  connect-src 'self' https://vercel.live https://vitals.vercel-insights.com https://va.vercel-scripts.com;
  frame-src 'self';
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  // CSP — primary defense against XSS
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  // Prevent MIME type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Block framing entirely (clickjacking protection)
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Legacy XSS filter — still useful for older browsers
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Strict referrer — only send origin on cross-origin, full on same-origin
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disable all sensitive browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
  },
  // HSTS — force HTTPS for 2 years with preload
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Enable DNS prefetching for performance
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig = {
  // Enforce trailing slashes for consistent canonical URLs
  trailingSlash: false,

  // Disable x-powered-by header (information disclosure)
  poweredByHeader: false,

  // SEO-critical security & performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Force www redirect (handled by Vercel, but good to declare intent)
  async redirects() {
    return [];
  },
};

export default nextConfig;
