import Image from "next/image";
import Link from "next/link";
import type { ApplicationArea } from "@/domain/entities/application";

export function ApplicationsSection({
  applications,
}: {
  applications: ApplicationArea[];
}) {
  return (
    <section className="section applications">
      <div className="section__intro">
        <h2 className="reveal" data-reveal data-reveal-delay="0">
          Functional solutions for food applications
        </h2>
        <p className="reveal" data-reveal data-reveal-delay="120">
          Texture, stability, and clean-label performance across the categories
          US food brands formulate every day.
        </p>
      </div>
      <div className="applications__grid">
        {applications.map((app, index) => (
          <article
            key={app.id}
            className="application-tile reveal"
            data-reveal
            data-reveal-delay={String(120 + index * 120)}
          >
            <div className="application-tile__media">
              <Image
                src={app.imageSrc}
                alt={app.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="application-tile__body">
              <h3>{app.title}</h3>
              <p>{app.description}</p>
              <Link href={app.href}>
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
