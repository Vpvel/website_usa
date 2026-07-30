"use client";

import type { ReactNode } from "react";

export function AdminListToolbar({
  filters,
  actions,
  meta,
}: {
  filters: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="admin-list-header">
      <div className="admin-toolbar">
        <div className="admin-toolbar__filters">{filters}</div>
        {actions ? <div className="admin-toolbar__actions">{actions}</div> : null}
      </div>
      {meta ? <div className="admin-toolbar__meta">{meta}</div> : null}
    </div>
  );
}

export function AdminTableEmpty({
  colSpan,
  message,
}: {
  colSpan: number;
  message: string;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="admin-table__empty">
        {message}
      </td>
    </tr>
  );
}

export function AdminTableLoading({
  colSpan,
}: {
  colSpan: number;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="admin-table__empty">
        Loading…
      </td>
    </tr>
  );
}
