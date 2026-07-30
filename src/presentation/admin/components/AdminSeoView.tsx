"use client";

import { useEffect, useState } from "react";
import type {
  AdminSeoContent,
  SeoMetaPair,
  SeoRouteOverride,
} from "@/domain/entities/seo-content";
import { defaultAdminSeoContent } from "@/data/datasources/seo-defaults.local";
import { createId } from "@/data/datasources/admin-storage";
import { AdminShell } from "@/presentation/admin/components/AdminShell";
import { ImagePathField } from "@/presentation/admin/components/ImagePathField";

type Tab = "global" | "routes" | "keys";

const TABS: Array<[Tab, string]> = [
  ["global", "Global SEO"],
  ["routes", "Page overrides"],
  ["keys", "Custom meta keys"],
];

function emptyMeta(): SeoMetaPair {
  return { key: "", value: "" };
}

function emptyRoute(): SeoRouteOverride {
  return {
    id: createId("seo-route"),
    route: "/new-page",
    enabled: true,
    title: "",
    description: "",
    keywordsText: "",
    ogImage: "",
    ogImageAlt: "",
    canonicalPath: "",
    noIndex: false,
    customMeta: [],
  };
}

export function AdminSeoView() {
  const [tab, setTab] = useState<Tab>("global");
  const [draft, setDraft] = useState<AdminSeoContent | null>(null);
  const [activeRouteId, setActiveRouteId] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/admin/seo");
        const data = (await response.json()) as { settings?: AdminSeoContent };
        const settings = data.settings ?? defaultAdminSeoContent();
        setDraft(settings);
        setActiveRouteId(settings.routes[0]?.id ?? "");
      } catch {
        const fallback = defaultAdminSeoContent();
        setDraft(fallback);
        setActiveRouteId(fallback.routes[0]?.id ?? "");
      }
    })();
  }, []);

  async function save() {
    if (!draft) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = (await response.json()) as {
        settings?: AdminSeoContent;
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error || "Failed to save SEO settings.");
      }
      if (data.settings) {
        setDraft(data.settings);
        setActiveRouteId((current) =>
          data.settings?.routes.some((route) => route.id === current)
            ? current
            : data.settings?.routes[0]?.id ?? "",
        );
      }
      setSuccess(
        "SEO settings saved. Public metadata, Open Graph, robots defaults, and custom meta keys now use this configuration.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (!draft) {
    return (
      <AdminShell title="SEO">
        <p>Loading…</p>
      </AdminShell>
    );
  }

  const activeRoute =
    draft.routes.find((route) => route.id === activeRouteId) ?? draft.routes[0];

  function updateRoute(routeId: string, patch: Partial<SeoRouteOverride>) {
    setDraft((current) => {
      if (!current) return current;
      return {
        ...current,
        routes: current.routes.map((route) =>
          route.id === routeId ? { ...route, ...patch } : route,
        ),
      };
    });
  }

  return (
    <AdminShell title="SEO">
      <p className="admin-help">
        Control global SEO defaults, per-page overrides, and custom meta / AI SEO
        keys. Saved values are used by public page metadata and crawlers.
      </p>

      <div className="admin-tabs">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`admin-tabs__btn${tab === id ? " is-active" : ""}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {error ? <p className="admin-alert admin-alert--error">{error}</p> : null}
      {success ? (
        <p className="admin-alert admin-alert--success">{success}</p>
      ) : null}

      {tab === "global" ? (
        <div className="admin-form admin-form--card">
          <div className="admin-form__grid">
            <label className="admin-field">
              <span>Site name</span>
              <input
                value={draft.siteName}
                onChange={(event) =>
                  setDraft({ ...draft, siteName: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Legal name</span>
              <input
                value={draft.legalName}
                onChange={(event) =>
                  setDraft({ ...draft, legalName: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Short name</span>
              <input
                value={draft.shortName}
                onChange={(event) =>
                  setDraft({ ...draft, shortName: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Locale</span>
              <input
                value={draft.locale}
                onChange={(event) =>
                  setDraft({ ...draft, locale: event.target.value })
                }
              />
            </label>
            <label className="admin-field admin-field--full">
              <span>Tagline</span>
              <input
                value={draft.tagline}
                onChange={(event) =>
                  setDraft({ ...draft, tagline: event.target.value })
                }
              />
            </label>
            <label className="admin-field admin-field--full">
              <span>Default title</span>
              <input
                value={draft.defaultTitle}
                onChange={(event) =>
                  setDraft({ ...draft, defaultTitle: event.target.value })
                }
              />
            </label>
            <label className="admin-field admin-field--full">
              <span>Title template</span>
              <input
                value={draft.titleTemplate}
                onChange={(event) =>
                  setDraft({ ...draft, titleTemplate: event.target.value })
                }
                placeholder="%s | Angel Starch & Food Inc."
              />
            </label>
            <label className="admin-field admin-field--full">
              <span>Default description</span>
              <textarea
                rows={3}
                value={draft.defaultDescription}
                onChange={(event) =>
                  setDraft({ ...draft, defaultDescription: event.target.value })
                }
              />
            </label>
            <label className="admin-field admin-field--full">
              <span>Default keywords (comma or new line)</span>
              <textarea
                rows={4}
                value={draft.defaultKeywordsText}
                onChange={(event) =>
                  setDraft({ ...draft, defaultKeywordsText: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Site URL</span>
              <input
                value={draft.fallbackSiteUrl}
                onChange={(event) =>
                  setDraft({ ...draft, fallbackSiteUrl: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Contact email</span>
              <input
                value={draft.contactEmail}
                onChange={(event) =>
                  setDraft({ ...draft, contactEmail: event.target.value })
                }
              />
            </label>
            <ImagePathField
              label="Default Open Graph image"
              value={draft.defaultOgImage}
              onChange={(defaultOgImage) => setDraft({ ...draft, defaultOgImage })}
            />
            <ImagePathField
              label="Logo"
              value={draft.logo}
              onChange={(logo) => setDraft({ ...draft, logo })}
            />
            <label className="admin-field">
              <span>Phone</span>
              <input
                value={draft.contactPhone}
                onChange={(event) =>
                  setDraft({ ...draft, contactPhone: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Street address</span>
              <input
                value={draft.streetAddress}
                onChange={(event) =>
                  setDraft({ ...draft, streetAddress: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>City</span>
              <input
                value={draft.addressLocality}
                onChange={(event) =>
                  setDraft({ ...draft, addressLocality: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>State / region</span>
              <input
                value={draft.addressRegion}
                onChange={(event) =>
                  setDraft({ ...draft, addressRegion: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Postal code</span>
              <input
                value={draft.postalCode}
                onChange={(event) =>
                  setDraft({ ...draft, postalCode: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Country</span>
              <input
                value={draft.addressCountry}
                onChange={(event) =>
                  setDraft({ ...draft, addressCountry: event.target.value })
                }
              />
            </label>
            <label className="admin-field admin-field--full">
              <span>SameAs links (one URL per line)</span>
              <textarea
                rows={3}
                value={draft.sameAsText}
                onChange={(event) =>
                  setDraft({ ...draft, sameAsText: event.target.value })
                }
              />
            </label>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={draft.robotsIndex}
                onChange={(event) =>
                  setDraft({ ...draft, robotsIndex: event.target.checked })
                }
              />
              <span>Allow search indexing by default</span>
            </label>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={draft.robotsFollow}
                onChange={(event) =>
                  setDraft({ ...draft, robotsFollow: event.target.checked })
                }
              />
              <span>Allow following links by default</span>
            </label>
          </div>
        </div>
      ) : null}

      {tab === "routes" ? (
        <div className="admin-details-layout">
          <div className="admin-form admin-form--card">
            <div className="admin-form__actions" style={{ marginTop: 0, borderTop: 0, paddingTop: 0 }}>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => {
                  const route = emptyRoute();
                  setDraft({ ...draft, routes: [...draft.routes, route] });
                  setActiveRouteId(route.id);
                }}
              >
                Add page override
              </button>
            </div>
            <div className="admin-stack">
              {draft.routes.map((route) => (
                <button
                  key={route.id}
                  type="button"
                  className={`admin-tabs__btn${activeRoute?.id === route.id ? " is-active" : ""}`}
                  onClick={() => setActiveRouteId(route.id)}
                >
                  {route.route || "(untitled route)"}
                  {!route.enabled ? " · off" : ""}
                </button>
              ))}
            </div>
          </div>

          {activeRoute ? (
            <div className="admin-form admin-form--card">
              <div className="admin-form__grid">
                <label className="admin-field">
                  <span>Route path</span>
                  <input
                    value={activeRoute.route}
                    onChange={(event) =>
                      updateRoute(activeRoute.id, {
                        route: event.target.value,
                        canonicalPath:
                          activeRoute.canonicalPath || event.target.value,
                      })
                    }
                    placeholder="/about"
                  />
                </label>
                <label className="admin-field">
                  <span>Canonical path</span>
                  <input
                    value={activeRoute.canonicalPath}
                    onChange={(event) =>
                      updateRoute(activeRoute.id, {
                        canonicalPath: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="admin-field admin-field--full">
                  <span>Title</span>
                  <input
                    value={activeRoute.title}
                    onChange={(event) =>
                      updateRoute(activeRoute.id, { title: event.target.value })
                    }
                  />
                </label>
                <label className="admin-field admin-field--full">
                  <span>Description</span>
                  <textarea
                    rows={3}
                    value={activeRoute.description}
                    onChange={(event) =>
                      updateRoute(activeRoute.id, {
                        description: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="admin-field admin-field--full">
                  <span>Keywords</span>
                  <textarea
                    rows={3}
                    value={activeRoute.keywordsText}
                    onChange={(event) =>
                      updateRoute(activeRoute.id, {
                        keywordsText: event.target.value,
                      })
                    }
                  />
                </label>
                <ImagePathField
                  label="OG image (optional override)"
                  value={activeRoute.ogImage}
                  onChange={(ogImage) => updateRoute(activeRoute.id, { ogImage })}
                />
                <label className="admin-field">
                  <span>OG image alt</span>
                  <input
                    value={activeRoute.ogImageAlt}
                    onChange={(event) =>
                      updateRoute(activeRoute.id, {
                        ogImageAlt: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={activeRoute.enabled}
                    onChange={(event) =>
                      updateRoute(activeRoute.id, {
                        enabled: event.target.checked,
                      })
                    }
                  />
                  <span>Override enabled</span>
                </label>
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={activeRoute.noIndex}
                    onChange={(event) =>
                      updateRoute(activeRoute.id, {
                        noIndex: event.target.checked,
                      })
                    }
                  />
                  <span>noindex this page</span>
                </label>
              </div>

              <div className="admin-card-block" style={{ marginTop: "1rem" }}>
                <strong>Page custom meta keys</strong>
                {activeRoute.customMeta.map((pair, index) => (
                  <div className="admin-inline-fields" key={`${activeRoute.id}-meta-${index}`}>
                    <input
                      placeholder="meta key (e.g. ai:summary)"
                      value={pair.key}
                      onChange={(event) => {
                        const customMeta = [...activeRoute.customMeta];
                        customMeta[index] = {
                          ...pair,
                          key: event.target.value,
                        };
                        updateRoute(activeRoute.id, { customMeta });
                      }}
                    />
                    <input
                      placeholder="value"
                      value={pair.value}
                      onChange={(event) => {
                        const customMeta = [...activeRoute.customMeta];
                        customMeta[index] = {
                          ...pair,
                          value: event.target.value,
                        };
                        updateRoute(activeRoute.id, { customMeta });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn--secondary"
                      onClick={() =>
                        updateRoute(activeRoute.id, {
                          customMeta: activeRoute.customMeta.filter(
                            (_, i) => i !== index,
                          ),
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() =>
                    updateRoute(activeRoute.id, {
                      customMeta: [...activeRoute.customMeta, emptyMeta()],
                    })
                  }
                >
                  Add page meta key
                </button>
              </div>

              <div className="admin-form__actions">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => {
                    const nextRoutes = draft.routes.filter(
                      (route) => route.id !== activeRoute.id,
                    );
                    setDraft({ ...draft, routes: nextRoutes });
                    setActiveRouteId(nextRoutes[0]?.id ?? "");
                  }}
                >
                  Delete override
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {tab === "keys" ? (
        <div className="admin-form admin-form--card">
          <p className="admin-help">
            Add dynamic meta keys used site-wide (AI SEO tags, verification keys,
            custom crawler hints). These map to HTML meta name/content.
          </p>
          {draft.customMeta.map((pair, index) => (
            <div className="admin-inline-fields" key={`global-meta-${index}`}>
              <input
                placeholder="key (e.g. google-site-verification)"
                value={pair.key}
                onChange={(event) => {
                  const customMeta = [...draft.customMeta];
                  customMeta[index] = { ...pair, key: event.target.value };
                  setDraft({ ...draft, customMeta });
                }}
              />
              <input
                placeholder="value"
                value={pair.value}
                onChange={(event) => {
                  const customMeta = [...draft.customMeta];
                  customMeta[index] = { ...pair, value: event.target.value };
                  setDraft({ ...draft, customMeta });
                }}
              />
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() =>
                  setDraft({
                    ...draft,
                    customMeta: draft.customMeta.filter((_, i) => i !== index),
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() =>
              setDraft({
                ...draft,
                customMeta: [...draft.customMeta, emptyMeta()],
              })
            }
          >
            Add meta key
          </button>
        </div>
      ) : null}

      <div className="admin-form__actions">
        <button
          type="button"
          className="btn btn--primary"
          disabled={saving}
          onClick={() => void save()}
        >
          {saving ? "Saving…" : "Save SEO settings"}
        </button>
      </div>
    </AdminShell>
  );
}
