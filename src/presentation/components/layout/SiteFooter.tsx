import Link from "next/link";
import Image from "next/image";
import type { HomeContent } from "@/domain/entities/home-content";

export function SiteFooter({
  brandName,
  tagline,
  navigation,
}: Pick<HomeContent, "brandName" | "tagline" | "navigation">) {
  const quickLinks = [
    ...navigation.filter((item) =>
      ["products", "applications", "about", "contact"].includes(item.id),
    ),
    { id: "shop", label: "Shop", href: "/shop" },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <Image
              src="/images/logo/angel-starch-logo.webp"
              alt={brandName}
              width={140}
              height={44}
              className="site-footer__logo"
            />
            <p>{tagline}</p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer">
            {quickLinks.map((link) => (
              <Link key={link.id} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="site-footer__contact">
            <p className="site-footer__contact-label">USA Office</p>
            <p>1250 Commerce Dr, Suite 400 - Chicago, IL 60601</p>
            <p>
              <a href="tel:+13125550148">+1 (312) 555-0148</a>
              <span aria-hidden="true"> · </span>
              <a href="mailto:usa@angelstarch.com">usa@angelstarch.com</a>
            </p>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {brandName}
          </p>
          <div className="site-footer__legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
