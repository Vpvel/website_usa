"use client";

import { useEffect, useState } from "react";
import type { AdminHomeContent } from "@/domain/entities/admin";
import type { BannerSlide } from "@/domain/entities/home-content";
import {
  getAdminHomeContentUseCase,
  updateAdminHomeContentUseCase,
} from "@/di/container";
import { notifyAdminContentChanged } from "@/data/datasources/admin-media.local";
import { createId } from "@/data/datasources/admin-storage";
import { AdminShell } from "@/presentation/admin/components/AdminShell";
import { ImagePathField } from "@/presentation/admin/components/ImagePathField";

type Tab =
  | "brand"
  | "hero"
  | "shopBanners"
  | "spotlights"
  | "trust"
  | "applications"
  | "stats"
  | "whyPartner"
  | "favorites";

const TABS: Array<[Tab, string]> = [
  ["brand", "Brand"],
  ["hero", "Hero"],
  ["shopBanners", "Shop banners"],
  ["spotlights", "Home banners"],
  ["trust", "Trust bar"],
  ["applications", "Applications"],
  ["stats", "Stats"],
  ["whyPartner", "Why Partner"],
  ["favorites", "Favorites"],
];

export function AdminHomeView() {
  const [tab, setTab] = useState<Tab>("brand");
  const [draft, setDraft] = useState<AdminHomeContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const content = await getAdminHomeContentUseCase.execute();
      setDraft({
        ...content,
        shopBanners: content.shopBanners ?? [],
      });
    })();
  }, []);

  async function save() {
    if (!draft) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const saved = await updateAdminHomeContentUseCase.execute(draft);
      setDraft(saved);
      notifyAdminContentChanged();
      setSuccess("Content saved. Storefront pages now use this live data.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function updateBanner(index: number, patch: Partial<BannerSlide>) {
    if (!draft) return;
    const shopBanners = [...(draft.shopBanners ?? [])];
    shopBanners[index] = { ...shopBanners[index], ...patch };
    setDraft({ ...draft, shopBanners });
  }

  if (!draft) {
    return (
      <AdminShell title="Content CMS">
        <p>Loading…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Content CMS">
      {error ? <p className="admin-alert admin-alert--error">{error}</p> : null}
      {success ? <p className="admin-alert admin-alert--success">{success}</p> : null}
      <p className="admin-help">
        Banner images, hero media, and all home/shop content are editable here.
        Changes apply live on the storefront after save.
      </p>

      <div className="admin-tabs">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`admin-tabs__btn${tab === key ? " is-active" : ""}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="admin-form admin-form--card">
        {tab === "brand" ? (
          <>
            <label className="admin-field">
              <span>Brand name</span>
              <input
                value={draft.brandName}
                onChange={(event) =>
                  setDraft({ ...draft, brandName: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Tagline</span>
              <input
                value={draft.tagline}
                onChange={(event) =>
                  setDraft({ ...draft, tagline: event.target.value })
                }
              />
            </label>
          </>
        ) : null}

        {tab === "hero" ? (
          <>
            <label className="admin-field">
              <span>Headline</span>
              <input
                value={draft.hero.headline}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    hero: { ...draft.hero, headline: event.target.value },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Subheadline</span>
              <textarea
                rows={3}
                value={draft.hero.subheadline}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    hero: { ...draft.hero, subheadline: event.target.value },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>CTA label</span>
              <input
                value={draft.hero.ctaLabel}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    hero: { ...draft.hero, ctaLabel: event.target.value },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>CTA link</span>
              <input
                value={draft.hero.ctaHref}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    hero: { ...draft.hero, ctaHref: event.target.value },
                  })
                }
              />
            </label>
            <ImagePathField
              label="Hero image / poster"
              value={draft.hero.imageSrc}
              onChange={(imageSrc) =>
                setDraft({
                  ...draft,
                  hero: { ...draft.hero, imageSrc },
                })
              }
              required
            />
            <label className="admin-field">
              <span>Image alt text</span>
              <input
                value={draft.hero.imageAlt}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    hero: { ...draft.hero, imageAlt: event.target.value },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Hero video path</span>
              <input
                value={draft.hero.videoSrc ?? ""}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    hero: {
                      ...draft.hero,
                      videoSrc: event.target.value || undefined,
                    },
                  })
                }
                placeholder="/video/..."
              />
            </label>
          </>
        ) : null}

        {tab === "shopBanners" ? (
          <div className="admin-stack">
            <p className="admin-help">
              These slides power the shop page banner carousel (`/shop`).
            </p>
            {(draft.shopBanners ?? []).map((banner, index) => (
              <div key={banner.id} className="admin-card-block">
                <div className="admin-inline-fields">
                  <label className="admin-field">
                    <span>Banner ID</span>
                    <input
                      value={banner.id}
                      onChange={(event) =>
                        updateBanner(index, { id: event.target.value })
                      }
                    />
                  </label>
                  <label className="admin-field">
                    <span>Sort order</span>
                    <input
                      type="number"
                      value={banner.sortOrder}
                      onChange={(event) =>
                        updateBanner(index, {
                          sortOrder: Number(event.target.value),
                        })
                      }
                    />
                  </label>
                </div>
                <ImagePathField
                  label="Banner image"
                  value={banner.imageSrc}
                  onChange={(imageSrc) => updateBanner(index, { imageSrc })}
                  required
                />
                <label className="admin-field">
                  <span>Alt text</span>
                  <input
                    value={banner.imageAlt}
                    onChange={(event) =>
                      updateBanner(index, { imageAlt: event.target.value })
                    }
                  />
                </label>
                <label className="admin-field">
                  <span>Optional link</span>
                  <input
                    value={banner.href ?? ""}
                    onChange={(event) =>
                      updateBanner(index, {
                        href: event.target.value || undefined,
                      })
                    }
                  />
                </label>
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={banner.isPublished}
                    onChange={(event) =>
                      updateBanner(index, { isPublished: event.target.checked })
                    }
                  />
                  <span>Published</span>
                </label>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      shopBanners: draft.shopBanners.filter((_, i) => i !== index),
                    })
                  }
                >
                  Remove banner
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn--primary"
              onClick={() =>
                setDraft({
                  ...draft,
                  shopBanners: [
                    ...(draft.shopBanners ?? []),
                    {
                      id: createId("banner"),
                      imageSrc: "/images/shop_banner/shop_banner_1.png",
                      imageAlt: "Shop banner",
                      href: "/shop",
                      sortOrder: draft.shopBanners?.length ?? 0,
                      isPublished: true,
                    },
                  ],
                })
              }
            >
              Add shop banner
            </button>
          </div>
        ) : null}

        {tab === "spotlights" ? (
          <div className="admin-stack">
            <p className="admin-help">
              Home hero capability slides (images shown in the homepage carousel).
            </p>
            {draft.products.map((item, index) => (
              <div key={item.id} className="admin-card-block">
                <label className="admin-field">
                  <span>Name</span>
                  <input
                    value={item.name}
                    onChange={(event) => {
                      const products = [...draft.products];
                      products[index] = {
                        ...products[index],
                        name: event.target.value,
                      };
                      setDraft({ ...draft, products });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Summary</span>
                  <textarea
                    rows={2}
                    value={item.summary}
                    onChange={(event) => {
                      const products = [...draft.products];
                      products[index] = {
                        ...products[index],
                        summary: event.target.value,
                      };
                      setDraft({ ...draft, products });
                    }}
                  />
                </label>
                <ImagePathField
                  label="Banner image"
                  value={item.imageSrc}
                  onChange={(imageSrc) => {
                    const products = [...draft.products];
                    products[index] = { ...products[index], imageSrc };
                    setDraft({ ...draft, products });
                  }}
                  required
                />
                <label className="admin-field">
                  <span>Link</span>
                  <input
                    value={item.href}
                    onChange={(event) => {
                      const products = [...draft.products];
                      products[index] = {
                        ...products[index],
                        href: event.target.value,
                      };
                      setDraft({ ...draft, products });
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "trust" ? (
          <div className="admin-stack">
            {draft.trustFeatures.map((item, index) => (
              <div key={item.id} className="admin-card-block">
                <label className="admin-field">
                  <span>Title</span>
                  <input
                    value={item.title}
                    onChange={(event) => {
                      const trustFeatures = [...draft.trustFeatures];
                      trustFeatures[index] = {
                        ...trustFeatures[index],
                        title: event.target.value,
                      };
                      setDraft({ ...draft, trustFeatures });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Description</span>
                  <input
                    value={item.description}
                    onChange={(event) => {
                      const trustFeatures = [...draft.trustFeatures];
                      trustFeatures[index] = {
                        ...trustFeatures[index],
                        description: event.target.value,
                      };
                      setDraft({ ...draft, trustFeatures });
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "applications" ? (
          <div className="admin-stack">
            {draft.applications.map((item, index) => (
              <div key={item.id} className="admin-card-block">
                <label className="admin-field">
                  <span>Title</span>
                  <input
                    value={item.title}
                    onChange={(event) => {
                      const applications = [...draft.applications];
                      applications[index] = {
                        ...applications[index],
                        title: event.target.value,
                      };
                      setDraft({ ...draft, applications });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Description</span>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(event) => {
                      const applications = [...draft.applications];
                      applications[index] = {
                        ...applications[index],
                        description: event.target.value,
                      };
                      setDraft({ ...draft, applications });
                    }}
                  />
                </label>
                <ImagePathField
                  label="Image"
                  value={item.imageSrc}
                  onChange={(imageSrc) => {
                    const applications = [...draft.applications];
                    applications[index] = { ...applications[index], imageSrc };
                    setDraft({ ...draft, applications });
                  }}
                />
                <label className="admin-field">
                  <span>Link</span>
                  <input
                    value={item.href}
                    onChange={(event) => {
                      const applications = [...draft.applications];
                      applications[index] = {
                        ...applications[index],
                        href: event.target.value,
                      };
                      setDraft({ ...draft, applications });
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "stats" ? (
          <div className="admin-stack">
            {draft.stats.map((stat, index) => (
              <div key={stat.id} className="admin-inline-fields">
                <input
                  value={stat.value}
                  onChange={(event) => {
                    const stats = [...draft.stats];
                    stats[index] = { ...stats[index], value: event.target.value };
                    setDraft({ ...draft, stats });
                  }}
                  placeholder="Value"
                />
                <input
                  value={stat.label}
                  onChange={(event) => {
                    const stats = [...draft.stats];
                    stats[index] = { ...stats[index], label: event.target.value };
                    setDraft({ ...draft, stats });
                  }}
                  placeholder="Label"
                />
              </div>
            ))}
          </div>
        ) : null}

        {tab === "whyPartner" ? (
          <>
            <label className="admin-field">
              <span>Headline</span>
              <input
                value={draft.whyPartner.headline}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    whyPartner: {
                      ...draft.whyPartner,
                      headline: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Body paragraphs (one per line)</span>
              <textarea
                rows={4}
                value={draft.whyPartner.body.join("\n")}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    whyPartner: {
                      ...draft.whyPartner,
                      body: event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Bullet points (one per line)</span>
              <textarea
                rows={4}
                value={draft.whyPartner.points.join("\n")}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    whyPartner: {
                      ...draft.whyPartner,
                      points: event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Experience callout</span>
              <input
                value={draft.whyPartner.experienceValue}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    whyPartner: {
                      ...draft.whyPartner,
                      experienceValue: event.target.value,
                    },
                  })
                }
              />
            </label>
          </>
        ) : null}

        {tab === "favorites" ? (
          <>
            <label className="admin-field">
              <span>Section headline</span>
              <input
                value={draft.favorites.headline}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    favorites: {
                      ...draft.favorites,
                      headline: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Section subheadline</span>
              <textarea
                rows={2}
                value={draft.favorites.subheadline}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    favorites: {
                      ...draft.favorites,
                      subheadline: event.target.value,
                    },
                  })
                }
              />
            </label>
            <div className="admin-stack">
              {draft.favorites.items.map((item, index) => (
                <div key={item.id} className="admin-card-block">
                  <label className="admin-field">
                    <span>Product name</span>
                    <input
                      value={item.name}
                      onChange={(event) => {
                        const items = [...draft.favorites.items];
                        items[index] = { ...items[index], name: event.target.value };
                        setDraft({
                          ...draft,
                          favorites: { ...draft.favorites, items },
                        });
                      }}
                    />
                  </label>
                  <ImagePathField
                    label="Image"
                    value={item.imageSrc}
                    onChange={(imageSrc) => {
                      const items = [...draft.favorites.items];
                      items[index] = { ...items[index], imageSrc };
                      setDraft({
                        ...draft,
                        favorites: { ...draft.favorites, items },
                      });
                    }}
                  />
                  <label className="admin-field">
                    <span>Alt text</span>
                    <input
                      value={item.imageAlt}
                      onChange={(event) => {
                        const items = [...draft.favorites.items];
                        items[index] = {
                          ...items[index],
                          imageAlt: event.target.value,
                        };
                        setDraft({
                          ...draft,
                          favorites: { ...draft.favorites, items },
                        });
                      }}
                    />
                  </label>
                  <label className="admin-field">
                    <span>CTA label</span>
                    <input
                      value={item.ctaLabel}
                      onChange={(event) => {
                        const items = [...draft.favorites.items];
                        items[index] = {
                          ...items[index],
                          ctaLabel: event.target.value,
                        };
                        setDraft({
                          ...draft,
                          favorites: { ...draft.favorites, items },
                        });
                      }}
                    />
                  </label>
                  <label className="admin-field">
                    <span>CTA link</span>
                    <input
                      value={item.ctaHref}
                      onChange={(event) => {
                        const items = [...draft.favorites.items];
                        items[index] = {
                          ...items[index],
                          ctaHref: event.target.value,
                        };
                        setDraft({
                          ...draft,
                          favorites: { ...draft.favorites, items },
                        });
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </>
        ) : null}
        <div className="admin-form__actions">
          <button
            type="button"
            className="btn btn--primary"
            disabled={saving}
            onClick={() => void save()}
          >
            {saving ? "Saving…" : "Save content"}
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
