"use client";

import { ADMIN_MEDIA_PRESETS } from "@/data/datasources/admin-media.local";

export function ImagePathField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const listId = `admin-media-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <label className="admin-field">
      <span>{label}</span>
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="/images/banner/..."
        list={listId}
      />
      <datalist id={listId}>
        {ADMIN_MEDIA_PRESETS.map((path) => (
          <option key={path} value={path} />
        ))}
      </datalist>
      {value ? (
        <div className="admin-image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" />
          <small>{value}</small>
        </div>
      ) : null}
    </label>
  );
}
