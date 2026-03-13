import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { NAV_SERVICES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-hero text-white">
      {/* Part 6: Gradient line at top of footer */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 1,
          background: "linear-gradient(to right, transparent, #7c3aed 30%, #7c3aed 70%, transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="text-2xl font-display font-bold tracking-tight text-white"
            >
              DOT<span className="text-accent">x</span>Labs
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
              Web design, SEO & AI automation for businesses across Canada.
            </p>
          </div>

          {/* Services columns */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-accent mb-4" style={{ letterSpacing: "0.15em" }}>
              Services
            </h3>
            <ul className="space-y-3">
              {Object.values(NAV_SERVICES)
                .flat()
                .slice(0, 5)
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="footer-link text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase text-accent mb-4" style={{ letterSpacing: "0.15em" }}>
              More Services
            </h3>
            <ul className="space-y-3">
              {Object.values(NAV_SERVICES)
                .flat()
                .slice(5)
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="footer-link text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-accent mb-4" style={{ letterSpacing: "0.15em" }}>
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:david@dotxlabs.com"
                  className="footer-link flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Mail size={14} aria-hidden="true" />
                  david@dotxlabs.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+16474603641"
                  className="footer-link flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Phone size={14} aria-hidden="true" />
                  647-460-3641
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} DOTxLabs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/services"
              className="footer-link text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="footer-link text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="footer-link text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
