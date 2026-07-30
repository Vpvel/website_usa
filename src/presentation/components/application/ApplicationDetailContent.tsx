import Image from "next/image";
import Link from "next/link";
import type { ApplicationDetail } from "@/domain/entities/application-detail";
import { absoluteUrl } from "@/presentation/seo/site-url";

export function ApplicationDetailContent({
  application,
}: {
  application: ApplicationDetail;
}) {
  const relatedHeading = `Related ingredients in ${application.title.toLowerCase()}`;
  const ingredientKeywords = application.ingredientCards
    .map((item) => item.name)
    .join(", ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${application.title} Applications | Angel Starch & Food Inc.`,
    description: application.pageHeadline,
    url: absoluteUrl(`/applications/${application.slug}`),
    about: {
      "@type": "Thing",
      name: application.title,
    },
    mainEntity: {
      "@type": "ItemList",
      name: relatedHeading,
      itemListElement: application.ingredientCards.map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: card.name,
        url: absoluteUrl(card.learnMoreHref ?? card.href),
      })),
    },
    hasPart: application.ingredientCards.map((card) => ({
      "@type": "Product",
      name: card.name,
      brand: {
        "@type": "Brand",
        name: "Angel Starch & Food Inc.",
      },
      url: absoluteUrl(card.learnMoreHref ?? card.href),
    })),
  };

  return (
    <article
      className="app-detail"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <meta itemProp="keywords" content={ingredientKeywords} />

      <section className="app-detail__hero">
        <Image
          src={application.heroImageSrc}
          alt={application.heroImageAlt}
          fill
          priority
          className="app-detail__hero-image"
          sizes="100vw"
        />
        <div className="app-detail__hero-overlay" />
        <div className="app-detail__hero-copy reveal" data-reveal>
          <h1 itemProp="headline">{application.heroTitle}</h1>
          <p>{application.heroSubtitle}</p>
        </div>
      </section>

      <div className="app-detail__container">
        <nav
          className="app-detail__breadcrumbs reveal"
          data-reveal
          aria-label="Breadcrumb"
        >
          {application.breadcrumbs.map((crumb, index) => {
            const isLast = index === application.breadcrumbs.length - 1;
            return (
              <span key={`${crumb.label}-${index}`}>
                {index > 0 ? <span className="app-detail__sep">&gt;</span> : null}
                {crumb.href && !isLast ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <strong>{crumb.label}</strong>
                )}
              </span>
            );
          })}
        </nav>

        <section className="app-detail__intro reveal" data-reveal data-reveal-delay="80">
          <h2 itemProp="alternativeHeadline">{application.pageHeadline}</h2>
          {application.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <h3>{application.needsHeading}</h3>
          <ul>
            {application.needs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>{application.growthHeading}</h3>
          <ul>
            {application.growthAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="app-detail__webinar">
        <div className="app-detail__webinar-media reveal" data-reveal>
          <Image
            src={application.webinar.imageSrc}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div
          className="app-detail__webinar-copy reveal"
          data-reveal
          data-reveal-delay="120"
        >
          <h2>{application.webinar.title}</h2>
          <p>{application.webinar.description}</p>
          <ul>
            {application.webinar.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link href={application.webinar.ctaHref} className="btn btn--ghost-light">
            {application.webinar.ctaLabel}
          </Link>
        </div>
      </section>

      <section className="app-detail__texture">
        <div className="app-detail__container">
          <div className="reveal" data-reveal>
            <h2>{application.texture.boostHeadline}</h2>
            <p className="app-detail__texture-boost">{application.texture.boostBody}</p>
          </div>
          <div className="app-detail__texture-grid">
            <div className="reveal" data-reveal data-reveal-delay="80">
              <h3>{application.texture.headline}</h3>
              <p>{application.texture.body}</p>
              <Link href={application.texture.ctaHref} className="btn btn--primary">
                {application.texture.ctaLabel}
              </Link>
            </div>
            <div
              className="app-detail__texture-visual reveal"
              data-reveal
              data-reveal-delay="160"
            >
              <Image
                src={application.texture.imageSrc}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
              <div className="app-detail__texture-marks" aria-hidden="true" />
              <div className="app-detail__texture-words">
                {application.texture.visualWords.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-detail__goals reveal" data-reveal>
        <div className="app-detail__goals-inner">
          <div>
            <h2>{application.goalsCta.headline}</h2>
            <p>{application.goalsCta.body}</p>
          </div>
          <Link href={application.goalsCta.ctaHref} className="btn btn--ghost-light">
            {application.goalsCta.ctaLabel}
          </Link>
        </div>
      </section>

      <section
        className="app-detail__related"
        aria-labelledby="related-in-app-heading"
      >
        <div className="app-detail__container">
          <h2 id="related-in-app-heading" className="reveal" data-reveal>
            {relatedHeading}
          </h2>
          <div
            className="app-detail__related-list"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <meta itemProp="name" content={relatedHeading} />
            {application.ingredientCards.map((card, index) => {
              const detailHref = card.learnMoreHref ?? card.href;
              return (
                <article
                  key={card.id}
                  className="app-detail__related-card reveal"
                  data-reveal
                  data-reveal-delay={String((index % 6) * 70)}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <meta itemProp="position" content={String(index + 1)} />
                  <div>
                    <h3 itemProp="name">{card.name}</h3>
                    <meta
                      itemProp="brand"
                      content="Angel Starch & Food Inc."
                    />
                    <div className="app-detail__related-links">
                      <Link href={detailHref}>
                        <span
                          className="material-symbols-outlined"
                          aria-hidden="true"
                        >
                          visibility
                        </span>
                        View All Documents
                      </Link>
                      <Link href="/contact#sample">
                        <span
                          className="material-symbols-outlined"
                          aria-hidden="true"
                        >
                          download
                        </span>
                        Download All Documents
                      </Link>
                    </div>
                  </div>
                  <div className="app-detail__related-actions">
                    <Link
                      href="/contact#sample"
                      className="btn btn--primary btn--block"
                    >
                      Add Sample
                    </Link>
                    <Link
                      href={detailHref}
                      className="btn btn--outline-green btn--block"
                      itemProp="url"
                    >
                      Learn More
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}
