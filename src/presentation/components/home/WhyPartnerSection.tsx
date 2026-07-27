import Link from "next/link";
import type { HomeContent } from "@/domain/entities/home-content";

export function WhyPartnerSection({
  whyPartner,
}: {
  whyPartner: HomeContent["whyPartner"];
}) {
  return (
    <section className="section why-partner">
      <div className="why-partner__panel">
        <h2 className="reveal" data-reveal data-reveal-delay="0">
          {whyPartner.headline}
        </h2>
        <ul>
          {whyPartner.points.map((point, index) => (
            <li
              key={point}
              className="reveal"
              data-reveal
              data-reveal-delay={String(120 + index * 120)}
            >
              {point}
            </li>
          ))}
        </ul>
        <Link
          href={whyPartner.ctaHref}
          className="btn btn--primary btn--lg reveal"
          data-reveal
          data-reveal-delay="720"
        >
          {whyPartner.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
