import Image from "next/image";
import Link from "next/link";
import type { ProductDetail } from "@/domain/entities/product-detail";

export function ProductDetailHero({ product }: { product: ProductDetail }) {
  return (
    <section className="product-detail">
      <div className="product-detail__banner">
        <Image
          src={product.heroImageSrc}
          alt={product.heroImageAlt}
          fill
          priority
          className="product-detail__banner-image"
          sizes="100vw"
        />
      </div>

      <div className="product-detail__panel">
        <nav className="product-detail__breadcrumbs" aria-label="Breadcrumb">
          {product.breadcrumbs.map((crumb, index) => {
            const isLast = index === product.breadcrumbs.length - 1;
            return (
              <span key={`${crumb.label}-${index}`} className="product-detail__crumb">
                {index > 0 ? (
                  <span className="product-detail__sep" aria-hidden="true">
                    &gt;
                  </span>
                ) : null}
                {crumb.href && !isLast ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>

        <h1 className="product-detail__headline">{product.headline}</h1>
        <p className="product-detail__date">{product.publishedAt}</p>
        <p className="product-detail__lead">{product.lead}</p>

        <div className="product-detail__body">
          {product.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="product-detail__actions">
          <Link href="/contact#sample" className="btn btn--primary btn--lg">
            Request a Sample
          </Link>
          <Link href="/products" className="btn btn--ghost">
            Back to products
          </Link>
        </div>
      </div>
    </section>
  );
}
