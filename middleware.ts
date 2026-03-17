import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Suspicious query patterns — common injection/scanning probes
const SUSPICIOUS_PATTERNS = [
  /(\<|%3C).*script.*(\>|%3E)/gi, // XSS script injection
  /(union|select|insert|update|delete|drop|alter)\s/gi, // SQL injection
  /\.\.\//g, // Path traversal
  /\/etc\/passwd/gi, // Unix file access
  /\/proc\/self/gi, // Linux proc access
  /\beval\s*\(/gi, // eval() injection
  /javascript:/gi, // JavaScript protocol
  /data:text\/html/gi, // Data URI XSS
  /on(load|error|click|mouseover)\s*=/gi, // Event handler injection
  /\bexec\s*\(/gi, // exec() injection
];

/**
 * Checks if a URL's search params contain suspicious injection patterns
 */
function hasSuspiciousQuery(url: URL): boolean {
  const fullQuery = url.search;
  if (!fullQuery) return false;
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(fullQuery));
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // 1. Force HTTPS in production
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-forwarded-proto") !== "https"
  ) {
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  // 2. Block requests with suspicious query parameters
  try {
    if (hasSuspiciousQuery(url)) {
      return new NextResponse("Bad Request", { status: 400 });
    }
  } catch {
    // Malformed URL — block it
    return new NextResponse("Bad Request", { status: 400 });
  }

  // 3. Block common scanner/exploit paths
  const pathname = url.pathname.toLowerCase();
  const blockedPaths = [
    "/wp-admin",
    "/wp-login",
    "/wp-content",
    "/xmlrpc.php",
    "/.env",
    "/config.php",
    "/admin.php",
    "/phpmyadmin",
    "/.git",
    "/.svn",
    "/cgi-bin",
  ];

  if (blockedPaths.some((blocked) => pathname.startsWith(blocked))) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // 4. Continue with security headers already applied via next.config.mjs
  const response = NextResponse.next();

  // Remove server identification headers
  response.headers.delete("x-powered-by");
  response.headers.delete("server");

  return response;
}

export const config = {
  // Run on all routes except static files and Next.js internals
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)).*)",
  ],
};
