"use client";

import { useEffect, useState } from "react";
import type { AdminContactContent } from "@/domain/entities/admin";
import {
  defaultEmailSettings,
  type EmailProvider,
  type EmailSettings,
} from "@/domain/entities/email-settings";
import {
  getAdminContactContentUseCase,
  updateAdminContactContentUseCase,
} from "@/di/container";
import { notifyAdminContentChanged } from "@/data/datasources/admin-media.local";
import { createId } from "@/data/datasources/admin-storage";
import { AdminShell } from "@/presentation/admin/components/AdminShell";

type Tab = "hero" | "offices" | "forms" | "email";

const TABS: Array<[Tab, string]> = [
  ["hero", "Hero"],
  ["offices", "Offices"],
  ["forms", "Forms"],
  ["email", "Email sending"],
];

export function AdminContactView() {
  const [tab, setTab] = useState<Tab>("hero");
  const [draft, setDraft] = useState<AdminContactContent | null>(null);
  const [email, setEmail] = useState<EmailSettings>(defaultEmailSettings());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      setDraft(await getAdminContactContentUseCase.execute());
      try {
        const response = await fetch("/api/admin/email-settings");
        const data = (await response.json()) as { settings?: EmailSettings };
        if (data.settings) setEmail(data.settings);
      } catch {
        // Keep defaults if settings API is unavailable.
      }
    })();
  }, []);

  async function saveContent() {
    if (!draft) return;
    const saved = await updateAdminContactContentUseCase.execute(draft);
    setDraft(saved);
    notifyAdminContentChanged();
    setSuccess("Contact Us content saved. Public /contact now uses this data.");
  }

  async function saveEmailSettings() {
    const response = await fetch("/api/admin/email-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    });
    const data = (await response.json()) as {
      settings?: EmailSettings;
      error?: string;
    };
    if (!response.ok) {
      throw new Error(data.error || "Failed to save email settings.");
    }
    if (data.settings) setEmail(data.settings);
    setSuccess(
      email.enabled
        ? "Email sending is ON. Contact forms will email your configured recipients."
        : "Email settings saved. Sending is currently OFF.",
    );
  }

  async function save() {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      if (tab === "email") await saveEmailSettings();
      else await saveContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (!draft) {
    return (
      <AdminShell title="Contact Us CMS">
        <p>Loading…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Contact Us CMS">
      {error ? <p className="admin-alert admin-alert--error">{error}</p> : null}
      {success ? <p className="admin-alert admin-alert--success">{success}</p> : null}
      <p className="admin-help">
        Edit Contact Us page content, then configure email sending once. When
        email is turned on, sample and message forms send to your recipients.
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
          </>
        ) : null}

        {tab === "offices" ? (
          <div className="admin-stack">
            {draft.offices.map((office, index) => (
              <div key={`${office.label}-${index}`} className="admin-card-block">
                <label className="admin-field">
                  <span>Office label</span>
                  <input
                    value={office.label}
                    onChange={(event) => {
                      const offices = [...draft.offices];
                      offices[index] = {
                        ...offices[index],
                        label: event.target.value,
                      };
                      setDraft({ ...draft, offices });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Company line</span>
                  <input
                    value={office.companyLine}
                    onChange={(event) => {
                      const offices = [...draft.offices];
                      offices[index] = {
                        ...offices[index],
                        companyLine: event.target.value,
                      };
                      setDraft({ ...draft, offices });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Address lines (one per line)</span>
                  <textarea
                    rows={3}
                    value={office.lines.join("\n")}
                    onChange={(event) => {
                      const offices = [...draft.offices];
                      offices[index] = {
                        ...offices[index],
                        lines: event.target.value
                          .split("\n")
                          .map((item) => item.trim())
                          .filter(Boolean),
                      };
                      setDraft({ ...draft, offices });
                    }}
                  />
                </label>
                <div className="admin-inline-fields">
                  <label className="admin-field">
                    <span>Phone</span>
                    <input
                      value={office.phone}
                      onChange={(event) => {
                        const offices = [...draft.offices];
                        offices[index] = {
                          ...offices[index],
                          phone: event.target.value,
                        };
                        setDraft({ ...draft, offices });
                      }}
                    />
                  </label>
                  <label className="admin-field">
                    <span>Email</span>
                    <input
                      type="email"
                      value={office.email}
                      onChange={(event) => {
                        const offices = [...draft.offices];
                        offices[index] = {
                          ...offices[index],
                          email: event.target.value,
                        };
                        setDraft({ ...draft, offices });
                      }}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      offices: draft.offices.filter((_, i) => i !== index),
                    })
                  }
                >
                  Remove office
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn--primary"
              onClick={() =>
                setDraft({
                  ...draft,
                  offices: [
                    ...draft.offices,
                    {
                      label: `Office ${draft.offices.length + 1}`,
                      companyLine: "Angel Starch & Food Inc.",
                      lines: ["Address line"],
                      phone: "",
                      email: `office${createId("mail").slice(0, 6)}@angelstarch.com`,
                    },
                  ],
                })
              }
            >
              Add office
            </button>
          </div>
        ) : null}

        {tab === "forms" ? (
          <>
            <label className="admin-field">
              <span>Sample form headline</span>
              <input
                value={draft.sampleForm.headline}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    sampleForm: {
                      ...draft.sampleForm,
                      headline: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Sample form body</span>
              <textarea
                rows={3}
                value={draft.sampleForm.body}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    sampleForm: {
                      ...draft.sampleForm,
                      body: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>Sample success message</span>
              <textarea
                rows={2}
                value={draft.sampleForm.successMessage}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    sampleForm: {
                      ...draft.sampleForm,
                      successMessage: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>General form headline</span>
              <input
                value={draft.generalForm.headline}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    generalForm: {
                      ...draft.generalForm,
                      headline: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="admin-field">
              <span>General form body</span>
              <textarea
                rows={3}
                value={draft.generalForm.body}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    generalForm: {
                      ...draft.generalForm,
                      body: event.target.value,
                    },
                  })
                }
              />
            </label>
          </>
        ) : null}

        {tab === "email" ? (
          <div className="admin-stack">
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={email.enabled}
                onChange={(event) =>
                  setEmail({ ...email, enabled: event.target.checked })
                }
              />
              <span>
                Turn on email sending for Contact Us forms
                {email.enabled ? " (ON)" : " (OFF)"}
              </span>
            </label>

            <label className="admin-field">
              <span>Provider</span>
              <select
                value={email.provider}
                onChange={(event) =>
                  setEmail({
                    ...email,
                    provider: event.target.value as EmailProvider,
                  })
                }
              >
                <option value="smtp">SMTP</option>
                <option value="resend">Resend API</option>
              </select>
            </label>

            <div className="admin-form__grid">
              <label className="admin-field">
                <span>From name</span>
                <input
                  value={email.fromName}
                  onChange={(event) =>
                    setEmail({ ...email, fromName: event.target.value })
                  }
                />
              </label>
              <label className="admin-field">
                <span>From email</span>
                <input
                  type="email"
                  value={email.fromEmail}
                  onChange={(event) =>
                    setEmail({ ...email, fromEmail: event.target.value })
                  }
                />
              </label>
              <label className="admin-field">
                <span>Sample form recipient(s)</span>
                <input
                  value={email.sampleTo}
                  onChange={(event) =>
                    setEmail({ ...email, sampleTo: event.target.value })
                  }
                  placeholder="usa@angelstarch.com"
                />
              </label>
              <label className="admin-field">
                <span>General form recipient(s)</span>
                <input
                  value={email.generalTo}
                  onChange={(event) =>
                    setEmail({ ...email, generalTo: event.target.value })
                  }
                  placeholder="usa@angelstarch.com"
                />
              </label>
              <label className="admin-field">
                <span>CC (optional, comma-separated)</span>
                <input
                  value={email.cc}
                  onChange={(event) =>
                    setEmail({ ...email, cc: event.target.value })
                  }
                />
              </label>
              <label className="admin-field">
                <span>Reply-to fallback</span>
                <input
                  type="email"
                  value={email.replyToFallback}
                  onChange={(event) =>
                    setEmail({ ...email, replyToFallback: event.target.value })
                  }
                />
              </label>
              <label className="admin-field">
                <span>Sample subject prefix</span>
                <input
                  value={email.subjectSamplePrefix}
                  onChange={(event) =>
                    setEmail({
                      ...email,
                      subjectSamplePrefix: event.target.value,
                    })
                  }
                />
              </label>
              <label className="admin-field">
                <span>General subject prefix</span>
                <input
                  value={email.subjectGeneralPrefix}
                  onChange={(event) =>
                    setEmail({
                      ...email,
                      subjectGeneralPrefix: event.target.value,
                    })
                  }
                />
              </label>
            </div>

            {email.provider === "smtp" ? (
              <div className="admin-card-block">
                <p className="admin-help">SMTP settings (Gmail, Outlook, SES, etc.)</p>
                <div className="admin-form__grid">
                  <label className="admin-field">
                    <span>SMTP host</span>
                    <input
                      value={email.smtp.host}
                      onChange={(event) =>
                        setEmail({
                          ...email,
                          smtp: { ...email.smtp, host: event.target.value },
                        })
                      }
                      placeholder="smtp.gmail.com"
                    />
                  </label>
                  <label className="admin-field">
                    <span>Port</span>
                    <input
                      type="number"
                      value={email.smtp.port}
                      onChange={(event) =>
                        setEmail({
                          ...email,
                          smtp: {
                            ...email.smtp,
                            port: Number(event.target.value) || 587,
                          },
                        })
                      }
                    />
                  </label>
                  <label className="admin-field">
                    <span>Username</span>
                    <input
                      value={email.smtp.user}
                      onChange={(event) =>
                        setEmail({
                          ...email,
                          smtp: { ...email.smtp, user: event.target.value },
                        })
                      }
                    />
                  </label>
                  <label className="admin-field">
                    <span>Password / app password</span>
                    <input
                      type="password"
                      value={email.smtp.pass}
                      onChange={(event) =>
                        setEmail({
                          ...email,
                          smtp: { ...email.smtp, pass: event.target.value },
                        })
                      }
                      placeholder="Leave masked value to keep existing"
                    />
                  </label>
                </div>
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={email.smtp.secure}
                    onChange={(event) =>
                      setEmail({
                        ...email,
                        smtp: { ...email.smtp, secure: event.target.checked },
                      })
                    }
                  />
                  <span>Use secure connection (TLS/SSL, usually port 465)</span>
                </label>
              </div>
            ) : (
              <div className="admin-card-block">
                <p className="admin-help">
                  Resend API key from your Resend dashboard. From email must be a
                  verified domain/sender.
                </p>
                <label className="admin-field">
                  <span>Resend API key</span>
                  <input
                    type="password"
                    value={email.resend.apiKey}
                    onChange={(event) =>
                      setEmail({
                        ...email,
                        resend: { apiKey: event.target.value },
                      })
                    }
                    placeholder="Leave masked value to keep existing"
                  />
                </label>
              </div>
            )}
          </div>
        ) : null}
        <div className="admin-form__actions">
          <button
            type="button"
            className="btn btn--primary"
            disabled={saving}
            onClick={() => void save()}
          >
            {saving
              ? "Saving…"
              : tab === "email"
                ? "Save email settings"
                : "Save Contact"}
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
