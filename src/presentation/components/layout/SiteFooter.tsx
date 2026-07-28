import Link from "next/link";
import Image from "next/image";
import type { HomeContent } from "@/domain/entities/home-content";

export function SiteFooter({
  brandName,
  tagline,
  navigation,
}: Pick<HomeContent, "brandName" | "tagline" | "navigation">) {
  const columns = navigation.filter((item) =>
    ["products", "applications", "resources", "about"].includes(item.id),
  );

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Image
            src="/images/logo/angel-starch-logo.webp"
            alt={brandName}
            width={160}
            height={50}
          />
          <p>{tagline}</p>
        </div>

        <div className="site-footer__columns">
          {columns.map((column) => (
            <div key={column.id}>
              <h3>{column.label}</h3>
              <ul>
                {(column.children ?? [column]).map((link) => (
                  <li key={link.id}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3>Contact Us</h3>
            <ul>
              <li>Angel Starch & Food Inc.</li>
              <li>1250 Commerce Drive, Suite 400</li>
              <li>Chicago, IL 60601, USA</li>
              <li>
                <a href="tel:+13125550148">+1 (312) 555-0148</a>
              </li>
              <li>
                <a href="mailto:usa@angelstarch.com">usa@angelstarch.com</a>
              </li>
              <li>
                <Link href="/contact">Contact form</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
        <div>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
