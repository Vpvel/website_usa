"use client";

import { useEffect, useState } from "react";
import type { AdminAboutContent } from "@/domain/entities/admin";
import {
  getAdminAboutContentUseCase,
  updateAdminAboutContentUseCase,
} from "@/di/container";
import { notifyAdminContentChanged } from "@/data/datasources/admin-media.local";
import { AdminShell } from "@/presentation/admin/components/AdminShell";
import { ImagePathField } from "@/presentation/admin/components/ImagePathField";

type Tab =
  | "hero"
  | "story"
  | "leadership"
  | "quality"
  | "infrastructure"
  | "sectors"
  | "markets";

const TABS: Array<[Tab, string]> = [
  ["hero", "Hero"],
  ["story", "Story"],
  ["leadership", "Leadership"],
  ["quality", "Quality"],
  ["infrastructure", "Infrastructure"],
  ["sectors", "Sectors"],
  ["markets", "Markets"],
];

export function AdminAboutView() {
  const [tab, setTab] = useState<Tab>("hero");
  const [draft, setDraft] = useState<AdminAboutContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      setDraft(await getAdminAboutContentUseCase.execute());
    })();
  }, []);

  async function save() {
    if (!draft) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const saved = await updateAdminAboutContentUseCase.execute(draft);
      setDraft(saved);
      notifyAdminContentChanged();
      setSuccess("About Us content saved. Public /about now uses this data.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (!draft) {
    return (
      <AdminShell title="About Us CMS">
        <p>Loading…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="About Us CMS">
      {error ? <p className="admin-alert admin-alert--error">{error}</p> : null}
      {success ? <p className="admin-alert admin-alert--success">{success}</p> : null}
      <p className="admin-help">
        Edit About Us copy, hero image, leadership, quality, and market content.
        Changes appear live on `/about` after save.
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
        {tab === "hero" ? (
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
              <span>Hero title</span>
              <input
                value={draft.heroTitle}
                onChange={(event) =>
                  setDraft({ ...draft, heroTitle: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Hero subtitle</span>
              <textarea
                rows={3}
                value={draft.heroSubtitle}
                onChange={(event) =>
                  setDraft({ ...draft, heroSubtitle: event.target.value })
                }
              />
            </label>
            <ImagePathField
              label="Hero image"
              value={draft.heroImageSrc}
              onChange={(heroImageSrc) => setDraft({ ...draft, heroImageSrc })}
              required
            />
            <label className="admin-field">
              <span>Image alt text</span>
              <input
                value={draft.heroImageAlt}
                onChange={(event) =>
                  setDraft({ ...draft, heroImageAlt: event.target.value })
                }
              />
            </label>
          </>
        ) : null}

        {tab === "story" ? (
          <label className="admin-field">
            <span>Story paragraphs (one per line)</span>
            <textarea
              rows={8}
              value={draft.story.join("\n")}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  story: event.target.value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>
        ) : null}

        {tab === "leadership" ? (
          <>
            <label className="admin-field">
              <span>Leader name</span>
              <input
                value={draft.leadership.name}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    leadership: {
                      ...draft.leadership,
                      name: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Experience line</span>
              <input
                value={draft.leadership.experience}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    leadership: {
                      ...draft.leadership,
                      experience: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Statement</span>
              <textarea
                rows={4}
                value={draft.leadership.statement}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    leadership: {
                      ...draft.leadership,
                      statement: event.target.value,
                    },
                  })
                }
              />
            </label>
          </>
        ) : null}

        {tab === "quality" ? (
          <>
            <label className="admin-field">
              <span>Headline</span>
              <input
                value={draft.quality.headline}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    quality: { ...draft.quality, headline: event.target.value },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Body</span>
              <textarea
                rows={4}
                value={draft.quality.body}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    quality: { ...draft.quality, body: event.target.value },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Quality checks (one per line)</span>
              <textarea
                rows={5}
                value={draft.quality.checks.join("\n")}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    quality: {
                      ...draft.quality,
                      checks: event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </label>
          </>
        ) : null}

        {tab === "infrastructure" ? (
          <>
            <label className="admin-field">
              <span>Headline</span>
              <input
                value={draft.infrastructure.headline}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    infrastructure: {
                      ...draft.infrastructure,
                      headline: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Points (one per line)</span>
              <textarea
                rows={5}
                value={draft.infrastructure.points.join("\n")}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    infrastructure: {
                      ...draft.infrastructure,
                      points: event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </label>
          </>
        ) : null}

        {tab === "sectors" ? (
          <>
            <label className="admin-field">
              <span>Sectors headline</span>
              <input
                value={draft.sectorsHeadline}
                onChange={(event) =>
                  setDraft({ ...draft, sectorsHeadline: event.target.value })
                }
              />
            </label>
            <label className="admin-field">
              <span>Sectors (one per line)</span>
              <textarea
                rows={8}
                value={draft.sectors.join("\n")}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    sectors: event.target.value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
          </>
        ) : null}

        {tab === "markets" ? (
          <>
            <label className="admin-field">
              <span>Markets headline</span>
              <input
                value={draft.markets.headline}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    markets: { ...draft.markets, headline: event.target.value },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Markets body</span>
              <textarea
                rows={4}
                value={draft.markets.body}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    markets: { ...draft.markets, body: event.target.value },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Membership note</span>
              <textarea
                rows={3}
                value={draft.membership}
                onChange={(event) =>
                  setDraft({ ...draft, membership: event.target.value })
                }
              />
            </label>
          </>
        ) : null}
        <div className="admin-form__actions">
          <button
            type="button"
            className="btn btn--primary"
            disabled={saving}
            onClick={() => void save()}
          >
            {saving ? "Saving…" : "Save About"}
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
