import Link from "next/link";
import type { HomeContent } from "@/domain/entities/home-content";

export function WhyPartnerSection({
  whyPartner,
}: {
  whyPartner: HomeContent["whyPartner"];
}) {
  return (
    <section className="section why-partner" aria-labelledby="why-partner-heading">
      <div className="why-partner__layout">
        <div className="why-partner__visual reveal" data-reveal>
          <span className="why-partner__leaf" aria-hidden="true">
            <span className="material-symbols-outlined">spa</span>
          </span>
          <div className="why-partner__badge" aria-label={`${whyPartner.experienceValue} years of experience`}>
            <span>{whyPartner.experienceValue}</span>
          </div>
        </div>

        <div className="why-partner__content">
          <h2 id="why-partner-heading" className="reveal" data-reveal>
            {whyPartner.headline}
          </h2>
          {whyPartner.body.map((paragraph, index) => (
            <p
              key={paragraph}
              className="reveal"
              data-reveal
              data-reveal-delay={String(80 + index * 80)}
            >
              {paragraph}
            </p>
          ))}
          <ul>
            {whyPartner.points.map((point, index) => (
              <li
                key={point}
                className="reveal"
                data-reveal
                data-reveal-delay={String(200 + index * 90)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  check
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href={whyPartner.ctaHref}
            className="btn btn--ghost btn--lg reveal"
            data-reveal
            data-reveal-delay="620"
          >
            {whyPartner.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
