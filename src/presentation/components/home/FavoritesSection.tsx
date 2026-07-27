import Image from "next/image";
import Link from "next/link";
import type { FavoritesSectionContent } from "@/domain/entities/home-content";

export function FavoritesSection({
  favorites,
}: {
  favorites: FavoritesSectionContent;
}) {
  return (
    <section className="section favorites" aria-labelledby="favorites-heading">
      <div className="favorites__intro reveal" data-reveal>
        <h2 id="favorites-heading">{favorites.headline}</h2>
        <p>{favorites.subheadline}</p>
      </div>

      <div className="favorites__grid">
        {favorites.items.map((item, index) => (
          <article
            key={item.id}
            className="favorite-card reveal"
            data-reveal
            data-reveal-delay={String(index * 100)}
          >
            <div className="favorite-card__media">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <h3>{item.name}</h3>
            <Link href={item.ctaHref} className="btn btn--mint">
              {item.ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
