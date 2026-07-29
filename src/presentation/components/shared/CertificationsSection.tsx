"use client";

import Image from "next/image";
import type { CertificationsContent } from "@/domain/entities/certification";

export function CertificationsSection({
  content,
  id = "certifications",
}: {
  content: CertificationsContent;
  id?: string;
}) {
  return (
    <section id={id} className="cert-section" aria-labelledby={`${id}-title`}>
      <div className="cert-section__intro">
        <p className="cert-section__eyebrow">Quality & compliance</p>
        <h2 id={`${id}-title`}>{content.headline}</h2>
        <p>{content.body}</p>
      </div>

      <ul className="cert-grid">
        {content.items.map((item, index) => (
          <li
            key={item.id}
            className="cert-card reveal"
            data-reveal
            data-reveal-delay={String((index % 8) * 50)}
          >
            <span className="cert-card__media">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 640px) 33vw, 120px"
              />
            </span>
            <span className="cert-card__name">{item.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
