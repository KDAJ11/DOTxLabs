import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { NAV_SERVICES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-hero text-white" role="contentinfo">
      {/* Part 6: Gradient line at top of footer */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 1,
          background: "linear-gradient(to right, transparent, #7B35FF 30%, #7B35FF 70%, transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <nav aria-label="Footer navigation" className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/DOTxLabs.png"
                alt="DOTxLabs logo — Toronto web design and digital agency"
                width={180}
                height={60}
                className="h-[60px] w-auto brightness-110"
              />
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
              Web design, SEO & AI automation for businesses across the GTA.
            </p>
          </div>

          {/* Services column */}
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

          {/* Durham Region locations */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-accent mb-4" style={{ letterSpacing: "0.15em" }}>
              Durham Region
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/locations/oshawa" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Oshawa
                </Link>
              </li>
              <li>
                <Link href="/locations/whitby" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Whitby
                </Link>
              </li>
              <li>
                <Link href="/locations/ajax" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Ajax
                </Link>
              </li>
              <li>
                <Link href="/locations/pickering" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Pickering
                </Link>
              </li>
              <li>
                <Link href="/locations/bowmanville" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Bowmanville
                </Link>
              </li>
            </ul>
          </div>

          {/* GTA locations */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-accent mb-4" style={{ letterSpacing: "0.15em" }}>
              Greater Toronto
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/locations/toronto" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Toronto
                </Link>
              </li>
              <li>
                <Link href="/locations/scarborough" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Scarborough
                </Link>
              </li>
              <li>
                <Link href="/locations/markham" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Markham
                </Link>
              </li>
              <li>
                <Link href="/locations/mississauga" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Mississauga
                </Link>
              </li>
              <li>
                <Link href="/locations/brampton" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Brampton
                </Link>
              </li>
              <li>
                <Link href="/locations/vaughan" className="footer-link text-sm text-white/50 hover:text-white transition-colors">
                  Vaughan
                </Link>
              </li>
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
        </nav>

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
              href="/about"
              className="footer-link text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              About
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
